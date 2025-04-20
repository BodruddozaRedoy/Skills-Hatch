"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaRegCircle } from "react-icons/fa";
import { RiStopCircleFill } from "react-icons/ri";
import { BsThreeDots } from 'react-icons/bs';
// import {CustomTooltip} from '@/components/CustomTooltip';

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
                <span className='text-muted-foreground text-sm'>{isThisWeek ? "This Week" : "Last Week"}: {entry.value}</span>
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
        name: 'Sat',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Sun',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mon',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Tue',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Wed',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Thu',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Fri',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


export default function LearningActivity() {
    return (
        <div className='bg-background rounded-lg p-10 w-full'>
            <div className='flex flex-col gap-5 items-center justify-between mb-5'>
                <h1 className='text-lg lg:text-2xl font-extrabold'>Learning Activity</h1>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <RiStopCircleFill className='text-secondary' />
                        <p className='text-sm text-muted-foreground'>Last Week</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <RiStopCircleFill className='text-primary' />
                        <p className='text-sm text-muted-foreground'>This Week</p>
                    </div>
                    <BsThreeDots className='ml-5' />
                </div>
            </div>
            
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis className='' dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip/>}/>
                    
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="pv" stroke="rgb(144, 198, 124)" activeDot={{ r: 10 }} />
                    <Line type="monotone" dataKey="uv" stroke="rgb(245, 196, 94)" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
