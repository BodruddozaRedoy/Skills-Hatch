import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import CourseCard from './CourseCard'
import useUser from '@/hooks/useUser'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'


const courses = [
    {
        _id: 1,
        title: "Web Development",
        thumbnail: "./web-development.png",
        ratings: 4.5,
        price: 0,
        contentCount: 10,
        instructorId: 1,
        instructor: "Bodruddoza Redoy",
        category: "web-development",
        level: "beginner",
        language: "English",
        status: "published",
        review: 5.0
    },
    
]

export default async function AllCourses() {
//   const user = useUser()
// const {getUser, getAccessToken} = getKindeServerSession()
// const user = await getUser()
// const token = await getAccessToken()
// console.log(token)
    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-2xl font-extrabold '>Courses</h1>
            <div className='flex items-center gap-2 cursor-pointer select-none'>
                    <p className='text-primary font-semibold text-sm'>View all</p>
                    <IoIosArrowForward className='font-bold text-primary' />
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-5'>
                {
                    courses?.map((course, i) => (
                        <CourseCard key={i} course={course}/>
                    ))
                }
            </div>
        </div>
    )
}
