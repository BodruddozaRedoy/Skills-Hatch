"use client"
import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { RiStopCircleFill } from 'react-icons/ri';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ✅ Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow text-sm border border-gray-200">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const isThisMonth = entry.dataKey === "pv"; // 'pv' = This Month, 'uv' = Last Month
          return (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground text-sm">
                {isThisMonth ? "This Month" : "Last Month"}: {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

// ✅ Data
const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },  // ✅ typo fixed from "Mer"
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
  { name: 'Aug', uv: 3490, pv: 4300 },
  { name: 'Sep', uv: 3490, pv: 4300 },
  { name: 'Oct', uv: 3490, pv: 4300 },
  { name: 'Nov', uv: 3490, pv: 4300 },
  { name: 'Dec', uv: 3490, pv: 4300 },
];

// ✅ Component
export default function ScoreActivity() {
  return (
    <div className="bg-background p-4 sm:p-6 lg:p-10 rounded-lg h-[300px] sm:h-[400px] lg:h-[500px] w-full col-span-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between mb-5 text-center sm:text-left">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold">Score Activity</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <RiStopCircleFill className="text-secondary" />
            <p className="text-sm text-muted-foreground">Last Month</p>
          </div>
          <div className="flex items-center gap-2">
            <RiStopCircleFill className="text-primary" />
            <p className="text-sm text-muted-foreground">This Month</p>
          </div>
          <BsThreeDots className="ml-2" />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 65 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis yAxisId="left" orientation="left" stroke="rgb(144, 198, 124)" />
          <YAxis yAxisId="right" orientation="right" stroke="rgb(245, 196, 94)" />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="left" dataKey="pv" fill="rgb(144, 198, 124)" barSize={12} />
          <Bar yAxisId="right" dataKey="uv" fill="rgb(245, 196, 94)" barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
