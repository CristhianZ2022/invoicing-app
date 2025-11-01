import Link from "next/link";
import { FC } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  createPageURL: (page: number) => string;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  createPageURL,
}) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.max(
    1,
    Math.min(safeTotalPages, Number(currentPage) || 1)
  );
  if (safeTotalPages <= 1) return null;

  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 2;

    pages.push(1);

    if (safeTotalPages <= 7) {
      for (let i = 2; i < safeTotalPages; i++) pages.push(i);
    } else {
      const left = Math.max(2, safeCurrentPage - delta);
      const right = Math.min(safeTotalPages - 1, safeCurrentPage + delta);

      if (left > 2) pages.push("ellipsis");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < safeTotalPages - 1) pages.push("ellipsis");
    }

    if (safeTotalPages > 1) pages.push(safeTotalPages);
    return pages;
  };

  const pages = generatePageNumbers();
  const prevDisabled = safeCurrentPage <= 1;
  const nextDisabled = safeCurrentPage >= safeTotalPages;

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-1 mt-8 flex-wrap"
    >
      <Link
        href={createPageURL(safeCurrentPage - 1)}
        aria-disabled={prevDisabled}
        aria-label="Página anterior"
        className={`px-3 py-2 rounded-md transition-colors ${
          prevDisabled
            ? "cursor-not-allowed text-gray-400 bg-gray-100"
            : "text-blue-600 hover:bg-blue-50"
        }`}
        onClick={(e) => prevDisabled && e.preventDefault()}
      >
        ← Anterior
      </Link>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-3 py-2 text-gray-500 select-none"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Link
            key={page}
            href={createPageURL(page)}
            aria-label={`Página ${page}`}
            aria-current={page === safeCurrentPage ? "page" : undefined}
            className={`px-3 py-2 rounded-md transition-colors ${
              page === safeCurrentPage
                ? "bg-blue-600 text-white font-medium"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={createPageURL(safeCurrentPage + 1)}
        aria-disabled={nextDisabled}
        aria-label="Página siguiente"
        className={`px-3 py-2 rounded-md transition-colors ${
          nextDisabled
            ? "cursor-not-allowed text-gray-400 bg-gray-100"
            : "text-blue-600 hover:bg-blue-50"
        }`}
        onClick={(e) => nextDisabled && e.preventDefault()}
      >
        Siguiente →
      </Link>
    </nav>
  );
};