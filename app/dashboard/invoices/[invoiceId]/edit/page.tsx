import { fetchCustomers, fetchInvoiceById } from "@/app/apis/api";
import FormEditWrapper from "@/app/components/FormEditWrapper";
import { bebas_neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components";
import { notFound } from "next/navigation";
import { FC } from "react";

interface EditInvoiceProps {
  params: Promise<{ invoiceId: string }>;
}

const EditInvoice: FC<EditInvoiceProps> = async ({ params }) => {
  const path = await params;
  const id = path.invoiceId;

  const breadcrumbs = [
    { label: "Invoices", href: "/dashboard/invoices" },
    {
      label: "Edit Invoice",
      href: `/dashboard/invoices/${id}/edit`,
      active: true,
    },
  ];

  const [getCustomers, invoice] = await Promise.all([fetchCustomers(), fetchInvoiceById(id)]);

  if (!invoice) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumb={breadcrumbs}
        className={`${bebas_neue.className}`}
      />
      <FormEditWrapper customers={getCustomers} invoice={invoice} />
    </main>
  );
};

export default EditInvoice;
