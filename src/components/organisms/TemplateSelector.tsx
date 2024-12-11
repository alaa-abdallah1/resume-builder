import { Mixed } from "@/types";
import React from "react";
import { Button } from "../ui/button";

interface TemplateSelectorProps {
  templates: Mixed[];
  selectedTemplate: Mixed;
  onTemplateChange: (templateId: number) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="max-w-5xl overflow-auto">
      <div className="flex space-x-4 mb-6">
        {templates.map(template => (
          <Button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg shadow-md ${
              template.id === selectedTemplate.id
                ? "border-2 border-blue-500"
                : "border border-gray-300"
            }`}
            style={{
              backgroundColor: template.color,
              color: template.textColor,
            }}
          >
            <span className="text-lg font-bold">{template.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
