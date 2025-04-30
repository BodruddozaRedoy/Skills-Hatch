"use client"
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { IoIosArrowForward } from "react-icons/io";



export default function page() {
  const percentage = 50;
    const stroke = 40;
    const radius = 100;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const {user} = useKindeAuth()
  return (
    <div className='grid grid-cols-5 gap-10'>
        {/* profile section  */}
        <div className='col-span-2 bg-background p-10 rounded-lg flex items-center justify-center flex-col gap-5'>
            <div className='w-60 h-60 rounded-full border-4 overflow-hidden object-cover object-center border-primary'>
                <img className='w-full' src={user?.picture || "https://img.icons8.com/?size=100&id=98957&format=png&color=000000"} alt="" />
            </div>
            <h1 className='text-2xl font-black'>{user?.given_name} {user?.family_name}</h1>
            <p className='text-muted-foreground font-semibold'>Member Since 2025</p>
            <div className='flex gap-5 items-center w-full'>
              <div className='bg-muted rounded-lg p-5 flex flex-col items-center justify-center w-full'>
                <p className='text-2xl font-black'>10</p>
                <p className='text-muted-foreground font-semibold'>Points</p>
              </div>
              <div className='bg-muted rounded-lg p-5 flex flex-col items-center justify-center w-full'>
                <p className='text-2xl font-black'>10</p>
                <p className='text-muted-foreground font-semibold'>Certificates</p>
              </div>
            </div>
            <div className='space-y-5'>
            <h1 className='text-xl font-black'>Achievements</h1>
            <div>
              icons
            </div>
            <h1 className='text-xl font-black'>Achievements</h1>
              <p className='text-muted-foreground'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore dolorem tempore suscipit consectetur fugit culpa vel quisquam provident omnis commodi.</p>
            </div>
        </div>
         {/* statistics section  */}
         <div className='col-span-3'>
          <div className='flex gap-10 w-full'>
            <div className='flex items-center justify-between bg-background rounded-lg p-5 w-full'>
              <div className='flex items-center'>
              <img className='w-24 h-24' src="https://img.icons8.com/?size=100&id=106265&format=png&color=000000" alt="" />
              <div className='ml-5'>
                <h1 className='text-3xl font-black'>100</h1>
                <p className='text-muted-foreground font-semibold'>Courses Completed</p>
              </div>
              </div>
              <IoIosArrowForward className='text-primary text-3xl'/>
            </div>
            <div className='flex items-center justify-between bg-background rounded-lg p-5 w-full'>
              <div className='flex items-center'>
              <img className='w-24 h-24' src="https://img.icons8.com/?size=100&id=106265&format=png&color=000000" alt="" />
              <div className='ml-5'>
                <h1 className='text-3xl font-black'>100</h1>
                <p className='text-muted-foreground font-semibold'>Courses In Progress</p>
              </div>
              </div>
              <IoIosArrowForward className='text-secondary text-3xl'/>
            </div>
          </div>

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
                        // strokeLinecap="round"
                    />
                </svg>
                <div className="absolute shadow-lg w-[115px] h-[115px] flex items-center justify-center rounded-full text-4xl font-extrabold text-gray-800">
                    {percentage}%
                </div>
            </div>
         </div>
    </div>
  )
}
