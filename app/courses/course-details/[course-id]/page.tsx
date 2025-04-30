"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function CourseDetails() {
  return (
    <div>
        <Link href={"/courses"} className='flex items-center gap-3 font-semibold'><IoIosArrowBack />
        Back</Link>
        <div className='grid grid-cols-7 gap-5'>
            <div className='bg-background col-span-4 rounded-lg'>
              <h1></h1>
            </div>
            <div className='bg-background col-span-3 rounded-lg'>.</div>
        </div>
    </div>
  )
}
