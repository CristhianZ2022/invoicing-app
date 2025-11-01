import { InfoCard } from "anjrot-components";
import { fetchCardData } from "../apis/api";

export default async function CardWrapper() {
  const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <InfoCard
        title="Collected"
        value={totalPaidInvoices}
        type="collected"
        currency={{ locale: "en-US", currency: "USD" }}
      />
      <InfoCard
        title="Pending"
        value={totalPendingInvoices}
        type="pending"
        currency={{ locale: "en-US", currency: "USD" }}
      />
      <InfoCard
        title="Total Invoices"
        value={numberOfInvoices}
        type="invoices"
      />
      <InfoCard
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </div>
  );
}