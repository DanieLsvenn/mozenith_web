"use client";

import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGINATION } from "@/lib/constants";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function Pagination({
  currentPage = 0,
  totalPages = 0,
  totalElements = 0,
  pageSize = PAGINATION.DEFAULT_SIZE,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  // Ensure values are valid numbers
  const safePage = Number.isFinite(currentPage) ? currentPage : 0;
  const safeTotalPages = Number.isFinite(totalPages) ? totalPages : 0;
  const safeTotalElements = Number.isFinite(totalElements) ? totalElements : 0;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0
      ? pageSize
      : PAGINATION.DEFAULT_SIZE;

  const startItem = safeTotalElements > 0 ? safePage * safePageSize + 1 : 0;
  const endItem = Math.min((safePage + 1) * safePageSize, safeTotalElements);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-sm text-[#666666]">
          Showing{" "}
          <span className="font-medium text-[#3D3D3D]">{startItem}</span> to{" "}
          <span className="font-medium text-[#3D3D3D]">{endItem}</span> of{" "}
          <span className="font-medium text-[#3D3D3D]">
            {safeTotalElements}
          </span>{" "}
          results
        </p>
        {onPageSizeChange && (
          <select
            value={safePageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-[#EEEEEE] bg-white px-2 text-sm text-[#3D3D3D]"
          >
            {PAGINATION.PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {safeTotalPages > 0 &&
            Array.from({ length: Math.min(5, safeTotalPages) }, (_, i) => {
              let pageNum: number;
              if (safeTotalPages <= 5) {
                pageNum = i;
              } else if (safePage < 3) {
                pageNum = i;
              } else if (safePage >= safeTotalPages - 3) {
                pageNum = safeTotalPages - 5 + i;
              } else {
                pageNum = safePage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={safePage === pageNum ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-8"
                >
                  {pageNum + 1}
                </Button>
              );
            })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage >= safeTotalPages - 1 || safeTotalPages === 0}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
