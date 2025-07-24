import React from 'react'
import { IoIosBookmarks } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import Link from 'next/link';


export default function CourseCard({ course }: any) {
    const num = 10
    
    return (
        <div className='w-full bg-background p-5 rounded-lg '>
            <div className='h-[250px] w-full rounded-lg overflow-hidden mb-5'>
                <img src={course.thumbnail} className='w-full h-full object-cover' alt="" />
            </div>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className='text-xl font-extrabold'>{course.title}</h1>
                    <div className='flex text-gray-400 text-xs items-center'>
                    <p className='mr-1 font-semibold'>{course.instructor?.fullName}</p>
                    <p className='flex items-center font-semibold'><LuDot className='text-xl mr-1'/> {(course.review)?.toFixed(1)}<IoIosStar className='text-orange-300'/></p>
                    </div>
                </div>
                <p className='font-extrabold text-xl'>{course.price == 0 ? "Free" : <><span className='text-primary'>$</span>{course.price}</>}</p>
            </div>

            <div className='flex items-center justify-between mt-5'>
                <div className='flex gap-2 text-gray-400 font-semibold text-sm items-center'>
                    <IoIosBookmarks />
                    <p>{course.chapters?.length}+ Content</p>
                </div>
                <Link href={`/courses/course-details/${course._id}`}><p className='text-xs font-semibold text-primary cursor-pointer select-none'>View Details</p></Link>
            </div>

        </div>
    )
}
