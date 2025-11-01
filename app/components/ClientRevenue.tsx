// components/ClientRevenueChart.tsx
"use client";

import { RevenueChart } from "anjrot-components";

interface Revenue {
  _id: string;
  month: string;
  revenue: number;
}

interface ClientRevenueChartProps {
  revenues: Revenue[];
  chartHeight?: number;
}

export default function ClientRevenueChart({ revenues, chartHeight }: ClientRevenueChartProps) {

  return (
    <div className="w-full h-[350px] bg-gray-100">
      <RevenueChart revenues={revenues} chartHeight={chartHeight || 350} />
    </div>
  );
}