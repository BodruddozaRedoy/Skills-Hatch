// app/my-courses/update/[courseId]/UpdateClient.tsx

"use client"
import { Button } from '@/components/ui/button'
import useDbUser from '@/hooks/useDbUser'
import { axiosPublic } from '@/lib/axiosPublic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { RiDraftFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseContent from '../../add-course/components/CourseContent'
import CourseDetails from '../../add-course/components/CourseDetails'
import { MdPublish } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'

export default function UpdateClient({ _id }: { _id: string }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { dbUser } = useDbUser()
    const tab_ = searchParams.get("tab")
    const [tab, setTab] = useState(tab_)

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
        chapters: [],
        progress: [],
        studentsEnrolled: []
    })

    const { data: singleCourse, refetch } = useQuery({
        queryKey: ["my-courses", dbUser?.fullName],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`
            );
            return res.data.data;
        },
        enabled: !!dbUser && !!_id,
    });

    useEffect(() => {
        setCourse(prev => ({ ...prev, instructor: dbUser }))
    }, [dbUser])

    useEffect(() => {
        if (singleCourse) {
            setCourse(singleCourse);
        }
    }, [singleCourse]);

    const handlePublish = async () => {
        try {
            const res = await axiosPublic.post("/api/course", course)
            if (res.data.status === 201) {
                Swal.fire({
                    title: "Do you want to save the changes?",
                    showCancelButton: true,
                    confirmButtonText: "Go to courses",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/my-courses/add-course")
                    }
                });
            }
        } catch (error) {
            console.log("Error at handlePublish", error)
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <Link href={"/my-courses"} className='font-semibold  gap-2 items-center inline-flex'><IoIosArrowBack /> Back</Link>
                <div>
                    <Button onClick={() => { setCourse({ ...course, status: "draft" }); handlePublish(); }} className='bg-secondary gap-2 items-center hover:bg-secondary'><RiDraftFill /> Draft</Button>
                    <Button onClick={() => { setCourse({ ...course, status: "published" }); handlePublish(); }} className='ml-3 bg-primary gap-2 items-center hover:bg-primary'><MdPublish /> Publish</Button>
                </div>
            </div>
            <div className='bg-background p-5 rounded-lg mt-5 flex items-start w-full'>
                <Tabs defaultValue='course-details' className='w-full'>
                    <TabsList>
                        <TabsTrigger onClick={() => setTab("")} value={tab || "course-details"}>Course Details</TabsTrigger>
                        <TabsTrigger onClick={() => setTab("")} value={tab || "course-content"}>Course Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value='course-details'><CourseDetails course={course} setCourse={setCourse} /></TabsContent>
                    <TabsContent value='course-content'><CourseContent course={course} setCourse={setCourse} /></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
