import React from 'react'
import { Button } from './ui/button'

export default function ProgressSection() {
    const percentage = 50
    const stroke = 20;
    const radius = 100;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
        <div className='bg-background rounded-lg p-10 w-[30%] flex flex-col items-center'>
            <div className="w-[200px] h-[200px] flex items-center justify-center relative">
                <svg height="100%" width="100%" className="transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        stroke="#e5e7eb" // light gray
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="100"
                        cy="100"
                    />
                    {/* Progress Circle */}
                    <circle
                        stroke="#2d3748" // dark stroke
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

                {/* Centered text */}
                <div className="absolute text-4xl font-extrabold text-gray-800">
                    {percentage}%
                </div>
            </div>
            <div className='space-y-5 mt-10'>
                <h1 className='text-foreground text-2xl font-extrabold text-center'>My Progress</h1>
                <p className='text-center text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, molestias.</p>
                <Button className='w-full'>More Details</Button>
            </div>
        </div>
    )
}
