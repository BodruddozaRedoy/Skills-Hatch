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
import { useQuery } from '@tanstack/react-query'


export default function UpdateCourse({ _id }: { _id: string }) {
    const searchParams = useSearchParams()
    const { dbUser } = useDbUser()
    const tab_ = searchParams.get("tab")
    // const [showTab, setShowTab] = useState('course-details')
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
    // fetching single course 
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

    const handleUpdate = async () => {
        try {
            const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, course)
            if (res.data.status === 200) {
                Swal.fire({
                    title: "Changes Saved!",
                    icon: "success"
                })
                refetch()
            }
            console.log(res.data)
        } catch (error) {
            console.log("Error at handlePublish", error)
        }
    }

    return (
        <div>
            <div className=''>
                <Link href={"/my-courses"} className='font-semibold  gap-2 items-center inline-flex'><IoIosArrowBack /> Back</Link>
                <div className='flex items-center justify-between mt-5'>
                    <div className='flex items-center gap-3'>
                        <div className={`${tab === "course-details" ? 'bg-primary text-white' : 'bg-background'} rounded-lg  py-2 px-5 font-bold border-primary border text-sm cursor-pointer select-none`} onClick={() => setTab("course-details")}> Course Details</div>
                        <div className={`${tab === "course-content" ? 'bg-primary text-white' : 'bg-background'} rounded-lg  py-2 px-5 font-bold border-primary border text-sm cursor-pointer select-none`} onClick={() => setTab("course-content")}> Course Content</div>
                    </div>
                    <Button onClick={() => { handleUpdate() }} className='bg-secondary gap-2 items-center hover:bg-secondary'><RiDraftFill /> Update</Button>
                </div>
            </div>
            <div className='bg-background p-5 rounded-lg mt-5 flex items-start w-full'>
                {
                    tab === 'course-details' ? (
                        <CourseDetails course={course} setCourse={setCourse} />
                    ) : (
                        <CourseContent course={course} setCourse={setCourse} _id={_id} refetch={refetch}/>
                    )
                }
            </div>
        </div>
    )
}
