import { LatestInvoices } from "anjrot-components";
import { fetchLatestInvoices } from "../apis/api";

async function LatestInvoicesWrapper() {
  const fetchInvoices = await fetchLatestInvoices();

  return (
    <div className="bg-slate-700 p-4 rounded">
      <LatestInvoices latestInvoices={fetchInvoices} />
    </div>
  );
}

export default LatestInvoicesWrapper;
