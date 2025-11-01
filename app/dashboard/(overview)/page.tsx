import { Suspense } from "react";
import CardWrapper from "../../components/CardWrapper";
import ChartWrapper from "../../components/ChartWrapper";
import LatestInvoicesWrapper from "../../components/LatestInvoicesWrapper";
import { bebas_neue } from "../../ui/fonts";
import { RevenueChartSkeleton } from "@/app/components/Skeleton";

export default function Dashboard() {
  return (
    <main>
      <h1 className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div>
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="w-full md:col-span-4">
          <h2 className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}>
            Recent Revenues
          </h2>
          <Suspense fallback={<RevenueChartSkeleton />}>
            <ChartWrapper />
          </Suspense>
        </div>
        <div className="w-full md:col-span-4">
          <h2 className={`${bebas_neue.className} mb-4 text-xl md:text-2xl`}>
            Latest Invoices
          </h2>
          <LatestInvoicesWrapper />
        </div>
      </div>
    </main>
  );
}
