import { useState, useEffect, useCallback } from "react";
import { ComponentSection, FormDataType, Mixed } from "@/types";
import {
  PersonalDetailsTopInfoPreview,
  PersonalDetailsForm,
  PersonalDetailsPreview,
  AboutForm,
  AboutPreview,
  SkillsForm,
  SkillsPreview,
  EmploymentsForm,
  EmploymentsPreview,
  EducationForm,
  EducationPreview,
  CertificatesForm,
  CertificatesPreview,
  SectionList,
  ResumePreview,
  Card,
} from "@/components";
import {
  getSavedData,
  getSectionsData,
  setSavedData,
  setSectionsData,
} from "@/lib/utils";
import { CUSTOM_SECTIONS } from "./constants";

function App() {
  const [data, setData] = useState<Mixed>(getSavedData());
  const [sections, setSections] = useState<ComponentSection[]>([
    {
      id: "personalDetails",
      preview: PersonalDetailsTopInfoPreview,
      noDrag: true,
    },
    {
      id: "personalDetails",
      component: PersonalDetailsForm,
      preview: PersonalDetailsPreview,
      noDrag: true,
    },
    {
      id: "about",
      component: AboutForm,
      preview: AboutPreview,
      noDrag: true,
    },
    { id: "skills", component: SkillsForm, preview: SkillsPreview },
    {
      id: "employments",
      component: EmploymentsForm,
      preview: EmploymentsPreview,
    },
    { id: "education", component: EducationForm, preview: EducationPreview },
    {
      id: "certificates",
      component: CertificatesForm,
      preview: CertificatesPreview,
    },
  ]);

  const [customSectionId, setCustomSectionId] = useState(0); // Track custom section IDs

  const handleSubmit = useCallback(
    (formData: FormDataType, key: string) => {
      const newData = { ...data, [key]: formData };
      setData(newData);
      setSavedData(newData);
    },
    [data]
  );

  const generateSectionData = ({
    type,
    title,
  }: {
    type: string;
    title?: string;
  }) => {
    let component, preview;
    let newtitle;

    if (type.includes("projects")) {
      component = EmploymentsForm;
      preview = EmploymentsPreview;
      newtitle = title || "Projects";
    } else if (type.includes("languages")) {
      component = SkillsForm;
      preview = SkillsPreview;
      newtitle = title || "Languages";
    } else if (type.includes("courses")) {
      component = EducationForm;
      preview = EducationPreview;
      newtitle = title || "Courses";
    }

    return {
      component,
      preview,
      title: newtitle,
      description: "",
    };
  };

  const handleAddCustomSection = (sectionType: string) => {
    const newSectionId = `${sectionType}-${customSectionId}`;
    setCustomSectionId(customSectionId + 1);

    const { component, preview, title } = generateSectionData({
      type: sectionType,
    });

    const newSections: ComponentSection[] = [
      ...sections,
      {
        id: newSectionId,
        component,
        preview,
        title,
        description: "",
      },
    ];

    setSections(newSections);
    setSectionsData(newSections);
  };

  const handleRemoveSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
    setSectionsData(updatedSections);
  };

  useEffect(() => {
    const savedSections = getSectionsData();
    if (savedSections) {
      const addedSections = savedSections.filter(
        item => !sections.find(section => section.id.includes(item.id))
      );

      const formatAddedSections = addedSections?.map(({ id, title }) => {
        const { component, preview } = generateSectionData({
          title,
          type: id,
        });

        return {
          id,
          component,
          preview,
          title,
        };
      });

      const sortedSections = [...sections, ...formatAddedSections].sort(
        (a, b) => {
          const indexA = savedSections.findIndex(item => item.id === a.id);
          const indexB = savedSections.findIndex(item => item.id === b.id);
          return indexA - indexB;
        }
      );
      setSections(sortedSections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-4xl bg-white w-full min-w-lg font-bold mb-6 text-center py-6">
        Resume Builder
      </h1>

      <div className="h-screen w-full min-w-lg max-w-screen mx-auto">
        <div className="grid 2xl:grid-cols-2 h-full gap-4 screen:p-0 md:p-6 p-3">
          <div className="order-2 lg:order-1">
            <SectionList
              sections={sections}
              setSections={setSections}
              handleSubmit={handleSubmit}
              handleDelete={handleRemoveSection}
            />

            {/* Custom Section Cards */}
            <div className="flex justify-around gap-3 mt-6">
              {Object.entries(CUSTOM_SECTIONS).map(([key, value]) => (
                <Card
                  key={key}
                  title={value}
                  description="Click to add this section"
                  onClick={() => handleAddCustomSection(key)}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ResumePreview data={data} sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
