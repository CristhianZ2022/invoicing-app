import React, { FC } from "react";
import { fetchFilteredInvoices } from "../apis/api";
import { InvoiceTable } from "anjrot-components";
import Image from "next/image";
import { deleteInvoice } from "../apis/action";

interface InvoiceWrapperProps {
  query?: string;
  page?: number;
}

const InvoiceWrapper: FC<InvoiceWrapperProps> = async function InvoiceWrapper({
  query,
  page,
}) {
  const getInvoices = await fetchFilteredInvoices(query || "", page);

  return (
    <InvoiceTable
      invoices={getInvoices}
      ImgComponent={Image}
      deleteAction={deleteInvoice}
      className="bg-slate-700 text-black"
      tableHeader={{ className: "text-white" }}
    />
  );
};

export default InvoiceWrapper;
