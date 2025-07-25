"use client"
import { Button } from "@/components/ui/button"

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
import toast from "react-hot-toast"
import Swal from "sweetalert2"




export default function MyCourseCard({ course, refetch }: any) {
    const { thumbnail, status, title, price, category, ratings, chapters, _id, content } = course
    const { dbUser } = useDbUser()
    // console.log(contentCount)

    // console.log("course from card", course)

    const handleDraft = async () => {
        const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { status: "draft" })
        if (res.data.status === 200) {
            refetch()
            // toast.success("Status changed to Draft")
            Swal.fire({
                title: "Status updated to Draft",
                icon: "success"
            })
        }
        // console.log(res.data)
    }

    const handlePublish = async (id: any) => {
        const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { status: "published" })
        if (res.data.status === 200) {
            refetch()
            // toast.success("Status changed to Published")
            Swal.fire({
                title: "Status updated to Published",
                icon: "success"
            })
        }
        // console.log(res.data)
    }
    return (
        <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }} className='rounded-lg  p-5 grid grid-cols-1 lg:grid-cols-7 items-center w-full'>
            {/* 1st flex  */}
            <div className=" col-span-6 flex flex-col lg:flex-row items-center gap-10 lg:border-r">
                {/* image  */}
                <div className='w-full lg:w-80 rounded-lg overflow-hidden'>
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
                        <p>{content?.length} Content</p>
                    </div>
                </div>

                {/* divider  */}
                <hr className="lg:h-full lg:w-2 w-full text-black" />
            </div>

            {/* 2nd flex  */}
            <div className="space-y-3 col-span-1 flex flex-col items-end justify-between w-full pl-5">
                <div className="">
                    {/* status  */}
                    <div className={`${status === "draft" ? 'bg-secondary' : 'bg-primary'} inline-flex rounded-2xl py-1 px-4 text-xs font-semibold text-background items-center mt-5 lg:mt-0`}> {status === "draft" ? "Draft" : "Published"}</div>
                    {/* edit  */}
                </div>
                {/* status change  */}
                <Link href={`/my-courses/update-course/${_id}?tab=course-details`} className="w-full"><Button className="w-full"><FiEdit /> Edit</Button></Link>
                {/* add content  */}
                <Link className="w-full" href={`/my-courses/update-course/${_id}?tab=course-content`}><Button className="w-full"><MdAddCircle /> Add Content</Button></Link>
                <div className="flex lg:flex-col items-center gap-3 w-full">
                    <button onClick={handleDraft} disabled={status === "draft"} className="disabled:bg-muted-foreground bg-secondary py-2 px-3.5 cursor-pointer text-sm rounded-lg text-background  font-semibold flex items-center gap-2 w-full text-center justify-center"><RiDraftFill />Draft</button>
                    <button onClick={handlePublish} disabled={status === "published"} className="bg-primary py-2 px-3.5 cursor-pointer text-sm rounded-lg text-background  font-semibold flex items-center gap-2 w-full text-center justify-center disabled:bg-muted-foreground"><MdPublish /> Publish</button>
                </div>

            </div>

        </div>
    )
}
