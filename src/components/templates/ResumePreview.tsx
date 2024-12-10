import { forwardRef, memo } from "react";
import { ComponentSection, Mixed } from "@/types";

interface ResumePreviewProps {
  data: Mixed;
  sections: ComponentSection[];
}

export const ResumePreview = memo(
  forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, sections }, ref) => {
    const firstSectionId = sections[0].id;
    const FirstSectionPreview = sections[0].preview;
    // Skip the first section and then filter odd/even sections from the remaining
    const remainingSections = sections.slice(1); // Skip the first section

    const leftSections = remainingSections.filter(
      (_, index) => index % 2 !== 0
    ); // Odd indices go to left
    const rightSections = remainingSections.filter(
      (_, index) => index % 2 === 0
    ); // Even indices go to right

    return (
      <div
        ref={ref}
        className="bg-white shadow-md"
        style={{
          width: "210mm", // A4 width
          minHeight: "297mm", // A4 height
          padding: "15mm", // Padding for a clean layout
          boxSizing: "border-box",
        }}
      >
        <div key={firstSectionId + "header"} className="mb-6">
          {FirstSectionPreview && (
            <FirstSectionPreview data={data[firstSectionId]} />
          )}
        </div>
        <div className="flex gap-x-4">
          <div className="flex-1 space-y-6">
            {leftSections.map((section, index) => {
              const { id, preview: FieldComponent } = section;
              return (
                <div key={id + index} className="mb-4">
                  {FieldComponent && <FieldComponent data={data[id]} />}
                </div>
              );
            })}
          </div>
          <div className="w-1/3 space-y-10">
            {rightSections.map((section, index) => {
              const { id, preview: FieldComponent } = section;
              return (
                <div key={id + index} className="mb-4">
                  {FieldComponent && <FieldComponent data={data[id]} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  })
);

export default ResumePreview;
