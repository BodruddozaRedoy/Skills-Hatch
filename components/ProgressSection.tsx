import React from 'react'
import { Button } from './ui/button'

export default function ProgressSection() {
    const percentage = 50;
    const stroke = 20;
    const radius = 100;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className='bg-background rounded-lg min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] w-full p-6 sm:p-10 flex flex-col items-center'>
            <div className="w-[200px] h-[200px] flex items-center justify-center relative">
                <svg height="100%" width="100%" className="transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        stroke="#e5e7eb"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="100"
                        cy="100"
                    />
                    {/* Progress Circle */}
                    <circle
                        stroke="#2d3748"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx="100"
                        cy="100"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-4xl font-extrabold text-gray-800">
                    {percentage}%
                </div>
            </div>
            <div className='space-y-5 mt-10 text-center'>
                <h1 className='text-foreground text-2xl font-extrabold'>My Progress</h1>
                <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, molestias.</p>
                <Button className='w-full'>More Details</Button>
            </div>
        </div>
    )
}
