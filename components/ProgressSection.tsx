import React from 'react'
import { Button } from './ui/button'

export default function ProgressSection() {
    const percentage = 75
    const radius = 45
    const stroke = 10
    const normalizedRadius = radius - stroke / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset =
        circumference - (percentage / 100) * circumference
    return (
        <div className='bg-background rounded-lg p-10 w-[30%] flex flex-col items-center'>
            <div className="w-[120px] h-[120px] flex items-center justify-center relative">
                <svg
                    height="100%"
                    width="100%"
                    className="transform -rotate-90"
                >
                    {/* Background Circle */}
                    <circle
                        stroke="#f0f0f0"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="60"
                        cy="60"
                    />
                    {/* Progress Circle */}
                    <circle
                        stroke="#2d3748" // dark stroke
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        r={normalizedRadius}
                        cx="60"
                        cy="60"
                        strokeLinecap="round"
                    />
                    {/* Small circle at end (the green dot) */}
                    <circle
                        r="5"
                        fill="#38b2ac"
                        cx={60 + normalizedRadius * Math.cos((2 * Math.PI * percentage) / 100 - Math.PI / 2)}
                        cy={60 + normalizedRadius * Math.sin((2 * Math.PI * percentage) / 100 - Math.PI / 2)}
                    />
                </svg>

                {/* Centered text */}
                <div className="absolute text-xl font-bold text-gray-800">
                    {percentage}%
                </div>
            </div>
            <div className='space-y-5'>
                <h1 className='text-foreground text-2xl font-extrabold text-center'>My Progress</h1>
                <p className='text-center text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, molestias.</p>
                <Button className='w-full'>More Details</Button>
            </div>
        </div>
    )
}
