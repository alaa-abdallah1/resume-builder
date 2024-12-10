import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  PersonalDetailsForm,
  AboutForm,
  ResumePreview,
  SkillsForm,
  AboutPreview,
  SkillsPreview,
  PersonalDetailsTopInfoPreview,
  PersonalDetailsPreview,
  CertificatesForm,
  CertificatesPreview,
  EducationForm,
  EducationPreview,
  EmploymentsForm,
  EmploymentsPreview,
} from "@/components";
import {
  ComponentSection,
  FormDataType,
  Mixed,
  SortedComponentSection,
} from "@/types";
import { GripVertical } from "lucide-react";

function App() {
  const savedData = JSON.parse(localStorage.getItem("formData") || "{}");

  const previewRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Mixed>(savedData);
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
      const newData = {
        ...data,
        [key]: formData,
      };
      setData(newData);
      localStorage.setItem("formData", JSON.stringify(newData));
    },
    [data]
  );

  // Load the saved data and sections order from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("sectionsOrder");

    if (savedSections) {
      const sortOrder: SortedComponentSection[] = JSON.parse(savedSections);

      const sortedSections = [...sections].sort((a, b) => {
        const indexA = sortOrder.findIndex(item => item.id === a.id);
        const indexB = sortOrder.findIndex(item => item.id === b.id);
        return indexA - indexB;
      });

      setSections(sortedSections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    const draggedIndex = Number(e.dataTransfer.getData("draggedIndex"));
    const updatedSections = [...sections];
    const draggedSection = updatedSections.splice(draggedIndex, 1)[0];
    updatedSections.splice(dropIndex, 0, draggedSection);
    setSections(updatedSections);

    // Save the updated section order to localStorage
    localStorage.setItem("sectionsOrder", JSON.stringify(updatedSections));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // This is required to allow dropping
  };

  return (
    <div className="h-screen w-full max-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center py-3">
        Resume Builder
      </h1>

      <div className="grid md:grid-cols-2 h-full">
        <div className="p-4 bg-white w-full overflow-y-scroll md:p-8 space-y-8">
          {sections.map((section, index) => {
            const { id, component: FieldComponent, noDrag } = section;
            const isDraggable = !noDrag;
            return (
              <div
                key={id + index}
                className="mb-4"
                draggable={isDraggable}
                onDragStart={e => isDraggable && handleDragStart(e, index)}
                onDrop={e => isDraggable && handleDrop(e, index)}
                onDragOver={e => isDraggable && handleDragOver(e)}
              >
                <div className="flex items-start">
                  {isDraggable && (
                    <GripVertical className="me-2 relative top-2 cursor-pointer" />
                  )}
                  <Suspense fallback={<div>Loading...</div>}>
                    {FieldComponent && (
                      <FieldComponent
                        dataKey={id}
                        onChange={(e: Mixed) => handleSubmit(e, id)}
                      />
                    )}
                  </Suspense>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-100 overflow-y-auto p-8">
          <ResumePreview ref={previewRef} data={data} sections={sections} />
        </div>
      </div>
    </div>
  );
}

export default App;
