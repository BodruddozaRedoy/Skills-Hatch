"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import CourseDetails from './components/CourseDetails';
import CourseContent from './components/CourseContent';
import useDbUser from '@/hooks/useDbUser';
import { axiosPublic } from '@/lib/axiosPublic';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';


export default function AddCourse() {
    const { dbUser } = useDbUser()
    const router = useRouter()
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
    console.log(course)

    useEffect(() => {
        setCourse({ ...course, instructor: dbUser })
    }, [dbUser])

    // handle publish 
    const handleDraft = async () => {
        if (course.title && course.price && course.thumbnail && course.category && course.level && course.language && course.description && course.instructor) {
            try {
                const res = await axiosPublic.post("/api/course", course)
                console.log(res.data)
                if (res.data.status === 201) {
                    Swal.fire({
                        title: "Course Added",
                        icon: "success",
                        // showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Go to courses",
                        denyButtonText: `Don't save`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            router.push("/my-courses")
                        } else if (result.isDenied) {
                            Swal.fire("Add another course");
                        }
                    });
                }
            } catch (error) {
                console.log("Error at handlePublish", error)
            }
        } else {
            Swal.fire({
                title: "Please fill all fields",
                icon: "error"
            })
        }
    }
    return (
        <div>
            <div className='flex items-center justify-between'>
            <Link href={"/my-courses"} className='font-semibold  gap-2 items-center inline-flex'><IoIosArrowBack /> Back</Link>
                <Button onClick={() => { handleDraft(); setCourse({ ...course, status: "draft" }) }} className='bg-secondary gap-2 items-center hover:bg-secondary'><RiDraftFill /> Draft</Button>
            </div>
            {/* content  */}
            <div className='bg-background p-5 rounded-lg mt-5 flex items-start w-full'>
                <CourseDetails course={course} setCourse={setCourse} />
            </div>
        </div>
    )
}
