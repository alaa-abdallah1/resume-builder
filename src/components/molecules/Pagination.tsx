import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const AppPagination: React.FC<AppPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 0) onPageChange(currentPage);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages - 1) onPageChange(currentPage + 2);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className={`${
              currentPage === 0
                ? "cursor-not-allowed text-gray-400"
                : "hover:text-blue-500 text-blue-700"
            }`}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={e => {
                e.preventDefault();
                onPageChange(index + 1);
              }}
              className={`${
                currentPage === index
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-200 text-blue-700"
              } px-4 py-2 rounded-lg`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={`${
              currentPage === totalPages - 1
                ? "cursor-not-allowed text-gray-400"
                : "hover:text-blue-500 text-blue-700"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
