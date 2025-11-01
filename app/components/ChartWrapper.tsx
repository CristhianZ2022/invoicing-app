"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRecentRevenues } from "../apis/api";
import { useEffect, useState } from 'react';

type RevenueItem = {
  month: string;
  revenue: number;
};

function ChartWrapper() {
  const [revenue, setRevenue] = useState<RevenueItem[]>([]);

  useEffect(() => {
    fetchRecentRevenues()
      .then((data) => {
        // Si la API no devuelve datos, data será undefined o []
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            month: item.month ?? "Sin mes",
            revenue: Number(item.revenue ?? 0),
          }));
          setRevenue(formatted);
          console.log("Formatted Revenue Data:", formatted);
        } else {
          setRevenue([]);
          console.log("No Revenue Data");
        }
      })
      .catch(() => setRevenue([])); // En caso de error, deja vacío
  }, []);

  return (
    <div className="p-4 rounded border-slate-700 border-8">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={revenue}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartWrapper;