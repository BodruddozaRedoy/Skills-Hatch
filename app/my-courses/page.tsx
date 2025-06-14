"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
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
import MyCourseCardSkeleton from './components/MyCourseCardSkeleton';
import useGetCoursesByInstructor from '@/hooks/useGetCoursesByInstructor';

export default function MyCourses() {
    const [searchedText, setSearchedText] = useState("")
    const [filteredCourses, setFilteredCourses] = useState()
    const { coursesByInstructor, refetch, isLoading, isSuccess } = useGetCoursesByInstructor()
    console.log(searchedText)

    // useEffect(() => {
    //     if (!coursesByInstructor) return;

    //     if (searchedText === "") {
    //         setFilteredCourses(coursesByInstructor);
    //         return;
    //     }

    //     const filtered_Courses = coursesByInstructor.filter((course: any) =>
    //         course.title.toLowerCase().includes(searchedText.toLowerCase())
    //     );
    //     setFilteredCourses(filtered_Courses);
    // }, [searchedText, coursesByInstructor]); // ✅ include coursesByInstructor






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
                        isLoading && <MyCourseCardSkeleton />
                    }
                    {
                        isSuccess && !coursesByInstructor.length && <p className='text-xl font-bold text-center'>No courses added</p>
                    }
                    {/* {!coursesByInstructor.length && !isLoading && <MyCourseCardSkeleton />} */}
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
