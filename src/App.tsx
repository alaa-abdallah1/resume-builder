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
} from "@/components";
import { getSavedData, getSectionsData, setSavedData } from "@/lib/utils";

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

  const handleSubmit = useCallback(
    (formData: FormDataType, key: string) => {
      const newData = { ...data, [key]: formData };
      setData(newData);
      setSavedData(newData);
    },
    [data]
  );

  useEffect(() => {
    const savedSections = getSectionsData();
    if (savedSections) {
      const sortedSections = [...sections].sort((a, b) => {
        const indexA = savedSections.findIndex(item => item.id === a.id);
        const indexB = savedSections.findIndex(item => item.id === b.id);
        return indexA - indexB;
      });
      setSections(sortedSections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-4xl bg-white font-bold mb-6 text-center py-6">
        Resume Builder
      </h1>
      <div className="h-screen w-full max-w-screen mx-auto">
        <div className="grid 2xl:grid-cols-2 h-full gap-4 screen:p-0 p-6">
          <SectionList
            sections={sections}
            setSections={setSections}
            handleSubmit={handleSubmit}
          />
          <div className="p-6 pt-0">
            <ResumePreview data={data} sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
