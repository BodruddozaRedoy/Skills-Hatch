"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import CourseDetails from './components/CourseDetails';
import CourseContent from './components/CourseContent';
import useDbUser from '@/hooks/useDbUser';
import { axiosPublic } from '@/lib/axiosPublic';


export default function AddCourse() {
    const { dbUser } = useDbUser()
    const [course, setCourse] = useState({
        title: "",
        price: 0,
        thumbnail: "",
        category: "",
        level: "",
        language: "",
        review: [],
        instructor: dbUser || "",
        ratings: 0,
        status: "draft",
        description: "",
        lessons: [],
    })

    // handle publish 
    const handlePublish = async () => {
        try {
            const res = await axiosPublic.post("/api/course", course)
            console.log(res.data)
        } catch (error) {
            console.log("Error at handlePublish", error)
        }
    }
    return (
        <div>
            <Link href={"/my-courses"} className='font-semibold  gap-2 items-center inline-flex'><IoIosArrowBack /> Back</Link>
            {/* content  */}
            <div className='bg-background p-5 rounded-lg mt-5 flex items-start'>
                <Tabs defaultValue='course-details' className='w-full'>
                    <TabsList>
                        <TabsTrigger value='course-details'>Course Details</TabsTrigger>
                        <TabsTrigger value='course-content'>Course Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value='course-details'><CourseDetails course={course} setCourse={setCourse} /></TabsContent>
                    <TabsContent value='course-content'><CourseContent course={course} setCourse={setCourse} /></TabsContent>
                </Tabs>
                {/* buttons  */}
                <div className='flex gap-3 items-center'>
                    <Button onClick={() => { handlePublish(); setCourse({ ...course, status: "published", instructor: dbUser?._id }) }} className='flex gap-2 items-center'><MdPublish /> Publish</Button>
                    <Button onClick={() => { handlePublish(); setCourse({ ...course, status: "draft" }) }} className='bg-secondary gap-2 items-center hover:bg-secondary'><RiDraftFill /> Draft</Button>
                </div>
            </div>
        </div>
    )
}
