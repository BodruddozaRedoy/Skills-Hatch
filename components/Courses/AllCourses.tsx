"use client"
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import CourseCard from './CourseCard'
// import useUser from '@/hooks/useKindeUser'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAllCourses } from '@/hooks/useAllCourses'




export default function AllCourses() {
//   const user = useUser()
// const {getUser, getAccessToken} = getKindeServerSession()
// const user = await getUser()
// const token = await getAccessToken()
// console.log(token)


const {courses} = useAllCourses()
const publishedCourses = courses?.filter((prev:any) => prev.status === "published")
console.log(publishedCourses)
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
                    publishedCourses?.map((course:any, i:number) => (
                        <CourseCard key={i} course={course}/>
                    ))
                }
            </div>
        </div>
    )
}
