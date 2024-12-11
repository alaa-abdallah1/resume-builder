import React from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { ComponentSection } from "@/types";

interface DragWrapperProps<T> {
  items: ComponentSection[];
  onReorder: (updatedItems: T[]) => void;
  children: (args: {
    item: ComponentSection;
    index: number;
    isDragging: boolean;
    isDraggable: boolean;
    isOver: boolean;
    startDrag: () => void;
  }) => React.ReactNode;
}

export const DragWrapper = <T,>({
  items,
  onReorder,
  children,
}: DragWrapperProps<T>) => {
  const {
    draggedIndex,
    dragOverIndex,
    dragging,
    handleDragStart,
    handleDragOver,
    handleDrop,
    reset,
  } = useDragAndDrop();

  const onDrop = (index: number) => {
    const updatedItems = handleDrop(items, index);
    onReorder(updatedItems as T[]);
  };

  return (
    <div>
      {items.map((item, index) => {
        const isDraggable = !item?.noDrag;

        return (
          <div
            key={index}
            draggable={isDraggable}
            onDragOver={e => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDrop={() => isDraggable && onDrop(index)}
            onDragEnd={reset}
          >
            {children({
              item,
              index,
              isDraggable,
              isDragging: isDraggable && draggedIndex === index && dragging,
              isOver: isDraggable && dragOverIndex === index && dragging,
              startDrag: () => isDraggable && handleDragStart(index),
            })}
          </div>
        );
      })}
    </div>
  );
};
