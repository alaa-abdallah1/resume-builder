import { useState } from "react";

export function useDragAndDrop<T>() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setDragging(true);
  };

  const handleDragOver = (index: number) => {
    setDragOverIndex(index);
  };

  const handleDrop = (list: T[], dropIndex: number): T[] => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      reset();
      return list;
    }

    const updatedList = [...list];
    [updatedList[draggedIndex], updatedList[dropIndex]] = [
      updatedList[dropIndex],
      updatedList[draggedIndex],
    ];

    reset();
    return updatedList;
  };

  const reset = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDragging(false);
  };

  return {
    draggedIndex,
    dragOverIndex,
    dragging,
    handleDragStart,
    handleDragOver,
    handleDrop,
    reset,
  };
}
