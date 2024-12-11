import React, { useState, useRef } from "react";
import { ComponentSection, Mixed } from "@/types";
import { usePrint } from "@/hooks";
import TemplateSelector from "../organisms/TemplateSelector";
import { AppPagination } from "../molecules";
import { Button } from "../ui/button";

const templates = [
  {
    id: 1,
    name: "Classic",
    layout: "single-column",
    color: "#FFFFFF", // White background
    textColor: "#000000", // Black text
  },
  {
    id: 2,
    name: "Modern ",
    layout: "two-column",
    color: "#FFFFFF", // White background
    textColor: "#000000", // Black text
  },
  {
    id: 5,
    name: "Focused",
    layout: "two-column",
    color: "#F5F5F5", // Very light gray background for softer contrast
    textColor: "#1A1A1A", // Dark gray text for high readability
  },
];
interface ResumePreviewProps {
  data: Mixed;
  sections: ComponentSection[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  sections,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const { isLoading, handlePrint } = usePrint(selectedTemplate, previewRef);

  const paginateSections = () => {
    const pages: ComponentSection[][] = [];
    let currentPage: ComponentSection[] = [];
    let currentHeight = 0;
    const maxPageHeight = 1122;

    sections.forEach(section => {
      const estimatedHeight = 250;
      if (currentHeight + estimatedHeight > maxPageHeight) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(section);
      currentHeight += estimatedHeight;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    return pages;
  };

  const pages = paginateSections();

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleTemplateChange = (templateId: number) => {
    const newTemplate = templates.find(t => t.id === templateId);
    if (newTemplate) setSelectedTemplate(newTemplate);
  };
  const renderSectionsByLayout = (layout: string, page: ComponentSection[]) => {
    switch (layout) {
      case "two-column":
        return (
          <div className="flex">
            <div className="w-1/2 pr-4">
              {page
                .slice(0, Math.ceil(page.length / 2))
                .map((section, index) => {
                  const { id, preview: FieldComponent } = section;
                  return (
                    <div key={id + index} className="mb-4">
                      {FieldComponent && <FieldComponent data={data[id]} />}
                    </div>
                  );
                })}
            </div>
            <div className="w-1/2 pl-4">
              {page.slice(Math.ceil(page.length / 2)).map((section, index) => {
                const { id, preview: FieldComponent } = section;
                return (
                  <div key={id + index} className="mb-4">
                    {FieldComponent && <FieldComponent data={data[id]} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "single-column":
        return page.map((section, index) => {
          const { id, preview: FieldComponent } = section;
          return (
            <div key={id + index} className="mb-4">
              {FieldComponent && <FieldComponent data={data[id]} />}
            </div>
          );
        });
      case "header-focused":
        return (
          <div>
            <div className="mb-6">
              <div className="mb-6">
                {page[0] && page[0].preview && (
                  <div className="font-bold text-2xl">
                    {React.createElement(page[0].preview, {
                      data: data[page[0].id],
                    })}
                  </div>
                )}
              </div>
            </div>
            <div>
              {page.slice(1).map((section, index) => {
                const { id, preview: FieldComponent } = section;
                return (
                  <div key={id + index} className="mb-4">
                    {FieldComponent && <FieldComponent data={data[id]} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "centered":
        return (
          <div className="flex flex-col items-center">
            {page.map((section, index) => {
              const { id, preview: FieldComponent } = section;
              return (
                <div key={id + index} className="mb-4 text-center">
                  {FieldComponent && <FieldComponent data={data[id]} />}
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      {/* Template Selection */}
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
      />

      {/* Resume Preview */}
      <div
        ref={previewRef}
        className="shadow-md print:shadow-none rounded-lg mb-4 max-w-a4 md:w-a4 h-a4"
        style={{
          padding: "15mm",
          backgroundColor: selectedTemplate.color,
          color: selectedTemplate.textColor,
        }}
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`page-break ${
              pageIndex === currentPage ? "visible" : "hidden"
            }`}
          >
            {renderSectionsByLayout(selectedTemplate.layout, page)}
          </div>
        ))}
      </div>
      <AppPagination
        totalPages={pages.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Download Button */}
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => handlePrint()}
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? "Preparing PDF..." : "Download PDF"}
      </Button>
    </div>
  );
};

export default ResumePreview;
