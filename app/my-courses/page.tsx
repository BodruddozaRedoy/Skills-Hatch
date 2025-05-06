"use client"
import { Button } from '@/components/ui/button'
import useDbUser from '@/hooks/useDbUser';
import { axiosPublic } from '@/lib/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import MyCourseCard from './components/MyCourseCard';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import MyCourseCardSkeleton from './components/MyCourseCardSkeleton';
import useGetCoursesByInstructor from '@/hooks/useGetCoursesByInstructor';

export default function MyCourses() {
    const [searchedText, setSearchedText] = useState("")
    const { coursesByInstructor, refetch } = useGetCoursesByInstructor()
    console.log(searchedText)

    const filteredCourses = coursesByInstructor?.filter((course: any) =>
        course.title.toLowerCase().includes(searchedText.toLowerCase())
    );
    return (
        <div className=''>
            {/* add course  */}
            <Link href={"/my-courses/add-course"}><Button className=''><IoIosAddCircleOutline /> Add Course</Button></Link>
            <div className='bg-background p-5 rounded-lg mt-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-black'>All Courses</h1>
                    <Input onChange={(e: any) => setSearchedText(e.target.value)} className='w-1/3' placeholder='Search here...' />
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort By</SelectLabel>
                                    <SelectItem value="price">Price</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="enrolled">Enrolled</SelectItem>
                                    <SelectItem value="review">review</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <hr className='w-full my-3' />
                {/* courses cards  */}
                <div className='mt-5 space-y-3 w-full'>
                    {
                        !filteredCourses && !coursesByInstructor && <MyCourseCardSkeleton />
                    }
                    {
                        (filteredCourses || coursesByInstructor)?.map((course: any, i: number) => (
                            <MyCourseCard course={course} key={i} refetch={refetch} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
