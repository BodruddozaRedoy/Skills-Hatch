"use client"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dot } from "lucide-react"
import React from 'react'
import { IoIosBookmarks, IoIosStar } from "react-icons/io"
import { FiEdit } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import { MdPublish } from "react-icons/md";
import { axiosPublic } from "@/lib/axiosPublic"
import useDbUser from "@/hooks/useDbUser"
import Link from "next/link"


// {
//     "_id": "6818720e4657ca13f692218c",
//     "title": "Quisquam doloribus c",
//     "thumbnail": "blob:http://localhost:3000/ec6f6f53-2bd3-42ba-8424-28eeddcfe997",
//     "ratings": 0,
//     "price": 720,
//     "level": "beginner",
//     "language": "Occaecat iure ullamc",
//     "status": "draft",
//     "description": "Accusantium quos max",
//     "instructor": {
//         "_id": "6815d419968eebfa5bd74cc3",
//         "fullName": "Bodruddoza Redoy",
//         "kindeId": "kp_e85b5f2eeae44a37b3a51357d7da94e1",
//         "email": "bodruddozaredoy@gmail.com",
//         "picture": "https://lh3.googleusercontent.com/a/ACg8ocJJAOflmuwpma5Mv2Z0VGKyF1yZEY-jPA2ZOCSvAtU5n6VJFmLF=s96-c",
//         "role": "student",
//         "bio": "I am a full stack web developer. This is my LMS project to showcase my resume.",
//         "socialLinks": [],
//         "points": 3000,
//         "achievements": 0,
//         "badges": [],
//         "completedCourses": [],
//         "currentCourses": [],
//         "comments": [],
//         "progress": [],
//         "quizResults": [],
//         "assignments": [],
//         "notifications": [],
//         "activityLog": [],
//         "createdAt": "2025-05-03T08:30:17.695Z",
//         "updatedAt": "2025-05-03T15:15:15.201Z",
//         "__v": 0
//     },
//     "category": "web-design",
//     "chapters": [],
//     "studentsEnrolled": [],
//     "reviews": [],
//     "progress": [],
//     "createdAt": "2025-05-05T08:08:46.225Z",
//     "updatedAt": "2025-05-05T08:08:46.225Z",
//     "__v": 0
// }

export default function MyCourseCard({ course, refetch }: any) {
    const { thumbnail, status, title, price, category, ratings, chapters, _id } = course
    const { dbUser } = useDbUser()

    const handleDraft = async () => {
        const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { status: "draft" })
        if (res.data.status === 200) {
            refetch()
        }
        console.log(res.data)
    }

    const handlePublish = async (id: any) => {
        const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { status: "published" })
        if (res.data.status === 200) {
            refetch()
        }
        console.log(res.data)
    }
    return (
        <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} className='rounded-lg  p-5 grid grid-cols-7 items-center w-full'>
            {/* 1st flex  */}
            <div className=" col-span-6 flex items-center gap-10 border-r">
                {/* image  */}
                <div className='w-60 rounded-lg overflow-hidden'>
                    <img className='w-full object-contain h-full' src={thumbnail} alt="" />
                </div>
                {/* details  */}
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl text-foreground">{title}</h1>
                    <p className="text-foreground font-black text-lg "><span className="text-primary font-bold">$</span>{price}</p>
                    <p className="text-foreground font-semibold ">{category.replace("-", " ")}</p>
                    <p className="font-semibold text-muted-foreground flex items-center gap-2">{ratings} <IoIosStar className="text-secondary" /></p>
                    <div className='flex gap-2 text-gray-400 font-semibold text-sm items-center'>
                        <IoIosBookmarks />
                        <p>{chapters.length} Content</p>
                    </div>
                </div>

                {/* divider  */}
                <hr className="h-full w-2 text-black" />
            </div>

            {/* 2nd flex  */}
            <div className="space-y-3 col-span-1 flex flex-col items-end justify-between w-full pl-5">
                <div className="">
                    {/* status  */}
                    <div className={`${status === "draft" ? 'bg-secondary' : 'bg-primary'} inline-flex rounded-2xl py-1 px-4 text-sm font-semibold text-background items-center`}> {status === "draft" ? "Draft" : "Published"}</div>
                    {/* edit  */}
                </div>
                {/* status change  */}
                <Link href={`/my-courses/update-course/${_id}?tab=course-details`} className="w-full"><Button className="w-full"><FiEdit /> Edit</Button></Link>
                {/* add content  */}
                <Link className="w-full" href={`/my-courses/update-course/${_id}?tab=course-content`}><Button className="w-full"><MdAddCircle /> Add Content</Button></Link>
                <div className="flex items-center gap-3 w-full">
                    <button onClick={handleDraft} className="bg-secondary py-2 px-3.5 cursor-pointer text-sm rounded-lg text-background  font-semibold flex items-center gap-2"><RiDraftFill />Draft</button>
                    <button onClick={handlePublish} className="bg-primary py-2 px-3.5 cursor-pointer text-sm rounded-lg text-background  font-semibold flex items-center gap-2"><MdPublish /> Publish</button>
                </div>

            </div>

        </div>
    )
}
