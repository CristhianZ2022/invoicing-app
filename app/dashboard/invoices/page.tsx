import PaginationWrapper from "@/app/components/PaginationWrapper";
import InvoiceWrapper from "@/app/components/InvoiceWrapper";
import { InvoiceSkeleton } from "@/app/components/Skeleton";
import { fetchInvoicesPages } from "@/app/apis/api";
import { TableButtons } from "anjrot-components";
import { bebas_neue } from "@/app/ui/fonts";
import Search from "@/app/helpers/Search";
import { FC, Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

interface InvoicesProps {
  searchParams?: Promise<{ query?: string, page?: number }>;
}


export function metadata(): Metadata {
  return {
    title: "Invoices"
  };
}

const Invoices: FC<InvoicesProps> = async function Invoices({ searchParams }) {
  const params = await searchParams;
  const totalPages = await fetchInvoicesPages(params?.query || "");

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className={`${bebas_neue.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-6">
        <Search />
        <TableButtons ButtonType={Link} title="Create Invoice" href="/dashboard/invoices/create"/>
      </div>
      <Suspense fallback={<InvoiceSkeleton />}>
        <InvoiceWrapper query={params?.query} page={params?.page} />
      </Suspense>
      <div className="pagination-force">
        <PaginationWrapper totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Invoices;
