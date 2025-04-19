import React from 'react'
import { IoIosBookmarks } from "react-icons/io";

export default function CourseCard({ course }: any) {
    return (
        <div className='w-full bg-background p-5 rounded-lg '>
            <div className='h-[250px] w-full rounded-lg overflow-hidden mb-5'>
                <img src={course.img} className='w-full h-full object-cover' alt="" />
            </div>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className='text-xl font-extrabold'>{course.title}</h1>
                    <p className='text-gray-400 text-xs'>{course.category}</p>
                </div>
                <p className='font-extrabold text-xl'>{course.price == 0 ? "Free" : <><span className='text-primary'>$</span>{course.price}</>}</p>
            </div>

            <div className='flex items-center justify-between mt-5'>
                <div className='flex gap-2 text-gray-400 font-semibold text-sm items-center'>
                    <IoIosBookmarks />
                    <p>{course.contentCount - 1}+ Content</p>
                </div>
                <p className='text-xs font-semibold text-primary cursor-pointer select-none'>View Details</p>
            </div>

        </div>
    )
}
