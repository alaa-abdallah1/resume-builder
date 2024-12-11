import React from "react";
import { ComponentSection, FormDataType, Mixed } from "@/types";
import { GripVertical } from "lucide-react";
import { Suspense } from "react";
import { DragWrapper } from "./DragWrapper";
import { setSectionsData } from "@/lib/utils";

interface SectionListProps {
  sections: ComponentSection[];
  setSections: React.Dispatch<React.SetStateAction<ComponentSection[]>>;
  handleSubmit: (formData: FormDataType, key: string) => void;
  handleDelete: (dataKey: string) => void;
}

export const SectionList: React.FC<SectionListProps> = ({
  sections,
  setSections,
  handleSubmit,
  handleDelete,
}) => {
  const handleReorder = (updatedSections: ComponentSection[]) => {
    setSections(updatedSections);
    setSectionsData(updatedSections);
  };

  return (
    <DragWrapper
      items={sections}
      onReorder={handleReorder}
      children={({
        item: section,
        isDragging,
        isDraggable,
        isOver,
        startDrag,
      }) => {
        const { id, component: FieldComponent, title, description } = section;

        if (!FieldComponent) return null;

        return (
          <div
            className={`mb-4 transition-transform ${
              isDragging
                ? "opacity-50 scale-95 shadow-lg"
                : isOver
                ? "border-blue-500 border-dashed border-2"
                : "shadow-sm"
            }`}
          >
            <div
              className={`flex items-start p-4 rounded-md bg-white border ${
                isDragging
                  ? "border-gray-300"
                  : isOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              {isDraggable && (
                <div onMouseDown={startDrag} className="cursor-grab">
                  <GripVertical className="mr-2 relative top-2 shrink-0 text-gray-500 hover:text-gray-800" />
                </div>
              )}
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex-1">
                  <FieldComponent
                    dataKey={id}
                    title={title}
                    description={description}
                    onChange={(e: Mixed) => handleSubmit(e, id)}
                    onDelete={handleDelete}
                  />
                </div>
              </Suspense>
            </div>
          </div>
        );
      }}
    />
  );
};
