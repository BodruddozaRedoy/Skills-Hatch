"use client"
import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { RiStopCircleFill } from 'react-icons/ri';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow text-sm border border-gray-200">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry:any, index:any) => {
            const isThisWeek = entry.dataKey === "pv"; // 'pv' = This Week, 'uv' = Last Week
            return (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className='text-muted-foreground text-sm'>{isThisWeek ? "This Month" : "Last Month"}: {entry.value}</span>
              </div>
            );
          })}
        </div>
      );
    }
  
    return null;
  };

const data = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mer',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


export default function ScoreActivity() {
    return (
        <div className='h-[500px] bg-background p-10 rounded-lg'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-2xl font-extrabold'>Score Activity</h1>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <RiStopCircleFill className='text-secondary' />
                        <p className='text-sm text-muted-foreground'>Last Month</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RiStopCircleFill className='text-primary' />
                        <p className='text-sm text-muted-foreground'>This Month</p>
                    </div>
                    <BsThreeDots className='ml-5' />
                </div>
            </div>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                    width={500}
                    height={500}
                    data={data}
                    
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="rgb(144, 198, 124)" />
                    <YAxis yAxisId="right" orientation="right" stroke="rgb(245, 196, 94)" />
                    <Tooltip content={<CustomTooltip/>}/>
                    {/* <Legend /> */}
                    <Bar  yAxisId="left" dataKey="pv" fill="rgb(144, 198, 124)" barSize={15}/>
                    <Bar yAxisId="right" dataKey="uv" fill="rgb(245, 196, 94)" barSize={15}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
