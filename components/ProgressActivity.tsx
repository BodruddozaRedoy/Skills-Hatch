"use client"
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { RiStopCircleFill } from "react-icons/ri";
import { BsThreeDots } from 'react-icons/bs';

// ✅ Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded shadow text-sm border border-gray-200">
                <p className="font-semibold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => {
                    const isThisWeek = entry.dataKey === "pv";
                    return (
                        <div key={index} className="flex items-center gap-2 text-gray-700">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className='text-muted-foreground text-sm'>
                                {isThisWeek ? "This Week" : "Last Week"}: {entry.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

// ✅ Sample Data
const data = [
    { name: 'Sat', uv: 4000, pv: 2400 },
    { name: 'Sun', uv: 3000, pv: 1398 },
    { name: 'Mon', uv: 2000, pv: 9800 },
    { name: 'Tue', uv: 2780, pv: 3908 },
    { name: 'Wed', uv: 1890, pv: 4800 },
    { name: 'Thu', uv: 2390, pv: 3800 },
    { name: 'Fri', uv: 3490, pv: 4300 },
];

// ✅ Component
export default function ProgressActivity({ title }: any) {
    return (
        <div className="bg-background rounded-lg h-[300px] sm:h-[400px] lg:h-[500px] p-4 sm:p-5 lg:p-10 w-full col-span-4">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-between mb-5 text-center sm:text-left">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold">{title}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <RiStopCircleFill className="text-secondary" />
                        <p className="text-sm text-muted-foreground">Last Week</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <RiStopCircleFill className="text-primary" />
                        <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                    <BsThreeDots className="ml-2" />
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
                >
                    {/* Define Gradients */}
                    <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(144, 198, 124)" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="white" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        angle={-20}
                        textAnchor="end"
                        height={40}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />

                    {/* This Week Line with Gradient Fill */}
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="rgb(144, 198, 124)"
                        fill="url(#greenGradient)"
                        fillOpacity={1}
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={false}
                    />

                    {/* Last Week Line */}
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="rgb(245, 196, 94)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}
