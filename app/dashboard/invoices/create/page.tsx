import { fetchCustomers } from "@/app/apis/api";
import FormWrapper from "@/app/components/FormWrapper";
import { bebas_neue } from "@/app/ui/fonts";
import { Breadcrumbs } from "anjrot-components"

const breadcrumbs = [
  { label: "Invoices", href: "/dashboard/invoices" },
  { label: "Create Invoice", href: "/dashboard/invoices/create", active: true },
];

async function CreateInvoice() {
  const getCustomers = await fetchCustomers();

  return (
    <div>
      <Breadcrumbs breadcrumb={breadcrumbs} className={`${bebas_neue.className} bg-transparent`} />
      <FormWrapper customers={getCustomers} />
    </div>
  )
}

export default CreateInvoice
