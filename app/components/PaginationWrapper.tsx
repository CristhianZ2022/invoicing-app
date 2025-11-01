"use client";

import { Pagination } from "@/app/helpers/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

const PaginationWrapper: FC<{ totalPages: number }> = ({ totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || "1");

    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());

      return `${pathname}?${params.toString()}`;
    };

    return (
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        createPageURL={createPageURL}
      />
    );
  };

export default PaginationWrapper;
