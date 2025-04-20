import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import CourseCard from './CourseCard'


const courses = [
    {
        title: "Web Development",
        img: "./web-development.png",
        ratings: 4.5,
        price: 0,
        contentCount: 10,
        instructor: "Bodruddoza Redoy",
        category: "web-development"
    },
    {
        title: "English Grammar",
        img: "./web-development.png",
        ratings: 4.5,
        price: 0,
        contentCount: 10,
        instructor: "Bodruddoza Redoy",
        category: "web-development"
    },
    {
        title: "Graphic Design",
        img: "./web-development.png",
        ratings: 4.5,
        price: 10,
        contentCount: 10,
        instructor: "Bodruddoza Redoy",
        category: "web-development"
    },
    {
        title: "Graphic Design",
        img: "./web-development.png",
        ratings: 4.5,
        price: 10,
        contentCount: 10,
        instructor: "Bodruddoza Redoy",
        category: "web-development"
    },
]

export default function AllCourses() {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-extrabold mb-5'>Courses</h1>
            <div className='flex items-center gap-2 cursor-pointer select-none'>
                    <p className='text-primary font-semibold text-sm'>View all</p>
                    <IoIosArrowForward className='font-bold text-primary' />
                </div>
            </div>

            <div className='grid grid-cols-3 justify-between gap-5'>
                {
                    courses?.map((course, i) => (
                        <CourseCard key={i} course={course}/>
                    ))
                }
            </div>
        </div>
    )
}
