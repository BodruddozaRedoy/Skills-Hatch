"use client"
import { Button } from '@/components/ui/button'
import useDbUser from '@/hooks/useDbUser';
import { axiosPublic } from '@/lib/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import MyCourseCard from './components/MyCourseCard';


export default function MyCourses() {
    const { dbUser } = useDbUser()
    const { data: courses } = useQuery({
        queryKey: ["my-courses"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/course?kindeId=${dbUser?.kindeId}`)
            console.log(res.data)
            return res.data.data
        },
        enabled: !!dbUser
    })
    return (
        <div className=''>
            {/* add course  */}
            <Link href={"/my-courses/add-course"}><Button className=''><IoIosAddCircleOutline /> Add Course</Button></Link>
            <div className='bg-background p-5 rounded-lg mt-5'>
                <h1 className='text-xl font-black'>All Courses</h1>
                <hr className='w-full my-3' />
                {/* courses cards  */}
                <div className='mt-5 space-y-3 w-full'>
                    {
                        courses?.map((course: any, i: number) => (
                            <MyCourseCard course={course} key={i} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
