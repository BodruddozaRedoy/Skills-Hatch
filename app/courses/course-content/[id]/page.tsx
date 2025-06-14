"use client"
import { useKindeUser } from '@/hooks/useKindeUser'
import { axiosPublic } from '@/lib/axiosPublic'
import { useQuery } from '@tanstack/react-query'
import { ArrowUp } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlay } from "react-icons/fa";


export default function CourseContent() {
    const [toggleSection, settoggleSection] = useState("resources");
    const [arrowToggle, setArrowToggle] = useState(true)
    // const searchParams = useSearchParams()
    // console.log(searchParams)
    const params = useParams()
    const { user } = useKindeUser()
    const { data: course } = useQuery({
        queryKey: ['single-course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/course?kindeId=${user?.id}&courseId=${params?.id}`)
            // console.log(res.data)
            return res.data.data
        },
        enabled: !!user
    })
    const chapters = course?.chapters
    console.log(chapters)
    return (
        <div className='grid grid-cols-6'>
            {/* 1st grid  */}
            <div className='col-span-4'>
                <div>
                    <h1 className='font-bold text-3xl'>{course?.title}</h1>
                    <div className='flex gap-1 items-center font-semibold text-muted-foreground mt-3'>
                        {/* <p>{course?.instructor?.fullName} | </p> */}
                        <p>⭐{course?.ratings} | </p>
                        <p>Review ({course?.reviews?.length}) | </p>
                        <p>{course?.studentsEnrolled?.length} Students</p>
                    </div>
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBapHLSeMxbTNSyA3L5s1MZyR3jwQW3PBTwg&s" className='w-full h-[550px] object-contain border-2 border-primary p-2 shadow-md my-3 rounded-lg' alt="" />
                {/* resources and discussion section  */}
                <div className='pt-5'>
                    {/* header  */}
                    <div className='flex items-center gap-4 border-b-2 pb-2 pl-1 font-semibold text-muted-foreground relative'>
                        <p onClick={() => settoggleSection("resources")} className={`${toggleSection === "resources" && 'text-primary'} cursor-pointer select-none`}>Resources</p>
                        <p onClick={() => settoggleSection("discussion")} className={`${toggleSection === "discussion" && 'text-primary'} cursor-pointer select-none`}>Discussion</p>
                        <div className={`${toggleSection === "resources" ? 'left-0' : 'left-[90px]'} w-20 h-0.5 rounded-lg absolute -bottom-0.5  bg-primary`}></div>
                    </div>
                    {/* content  */}
                    <div className='mt-5'>
                        {/* resources  */}
                        {
                            toggleSection === 'resources' && <div className='bg-white p-5 rounded-lg'>
                                <p>No resources are given</p>
                            </div>
                        }
                        {/* discussion  */}
                        {
                            toggleSection === 'discussion' && <div className=''>
                                {/* chat section  */}
                                <div className='mb-4'>
                                    <div className='flex items-center gap-3'>
                                        <img className='w-14 h-14 rounded-full object-cover border border-primary p-1' src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740" alt="" />
                                        <div>
                                            <p className='font-semibold'>Redoy</p>
                                            <p className='text-muted-foreground'>10 Min Ago</p>
                                        </div>
                                    </div>
                                    <div className='p-3 bg-white mt-3 rounded-lg border-t-2 border-primary inline-flex'>Hey there...</div>
                                </div>
                                {/* input area  */}
                                <div className='flex items-center gap-3'>
                                    <input type="text" name="text" id="" placeholder='Discuss here...' className='py-3 px-5 rounded-lg bg-white w-full' />
                                    <button className='py-3 px-5 bg-primary rounded-lg text-white font-semibold cursor-pointer select-none'>Send</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* 2nd grid  */}
            <div className='col-span-2 pl-10'>
                {/* progress bar  */}
                <div className=' bg-white rounded-lg p-5'>
                    <h1 className='font-bold text-xl'>Progress</h1>
                    <div className='relative mt-3'>
                        <div className='h-5 w-full bg-muted rounded-lg'></div>
                        <div className='h-5 absolute w-[50%] bg-primary rounded-lg top-0 left-0'></div>
                    </div>
                    <div className='mt-3 font-semibold flex justify-between items-center text-muted-foreground'>
                        <p className=' text-black'>Chapter 1</p>
                        <p>5/10</p>
                    </div>
                </div>
                {/* content  */}
                {
                    chapters?.map((chapter: any, index: number) => (
                        <div className='p-5 rounded-lg bg-white mt-5'>
                            {/* chapter title  */}
                            <div className='flex items-center justify-between'>
                                <p className='font-bold text-xl'>{chapter?.title}</p>
                                <div className='flex items-center gap-2'>
                                    <p className='font-semibold'>(0/{chapter?.lessons?.length})</p>
                                    <div  className='p-1 text-xl bg-primary inline-flex rounded-full text-white cursor-pointer select-none'>
                                        {arrowToggle === chapter?.title ? <IoIosArrowDown onClick={() => setArrowToggle(chapter?.title)} /> : <IoIosArrowUp onClick={() => setArrowToggle("")} />}
                                    </div>
                                </div>
                            </div>
                            {
                                arrowToggle === chapter?.title && <>
                                    {
                                        chapter?.lessons?.map((lesson: any, index: number) => (
                                            <div className='p-3 rounded-lg bg-primary text-white font-semibold mt-4'>
                                                <div className='flex items-center gap-2'>
                                                    <div className='bg-white w-7 h-7 flex items-center justify-center rounded-full'><FaPlay className='text-primary text-sm' /></div>
                                                    <p>{lesson?.title}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
