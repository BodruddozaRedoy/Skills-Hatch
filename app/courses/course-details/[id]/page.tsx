"use client"
import { useKindeUser } from '@/hooks/useKindeUser'
import { axiosPublic } from '@/lib/axiosPublic'
import { useQuery } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import ProtectedRoute from '@/components/ProtectedRoute'


export default function CourseDetails() {
  const [toggleSection, settoggleSection] = useState("about");
  const params = useParams()
  const {user} = useKindeUser()
  const {data:course} = useQuery({
    queryKey: ['single-course'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/course?kindeId=${user?.id}&courseId=${params?.id}`)
      // console.log(res.data)
      return res.data.data
    },
    enabled: !!user
  })
  // console.log("single course", course)
  const added = false
  return (
    <ProtectedRoute>
      <div>
        <Link href={"/courses"} className='flex items-center gap-3 font-semibold mb-5'><IoIosArrowBack />
        Back</Link>
        <div className='grid grid-cols-1 lg:grid-cols-7 gap-5'>
          {/* text container  */}
            <div className='bg-background col-span-4 rounded-lg p-5'>
              <h1 className='font-bold text-3xl'>{course?.title}</h1>
              <p className='text-muted-foreground font-semibold py-5'>{course?.description}</p>
              <div className='flex gap-1 items-center font-semibold text-muted-foreground'>
                {/* <p>{course?.instructor?.fullName} | </p> */}
                <p>⭐{course?.ratings} | </p>
                <p>Review ({course?.reviews?.length}) | </p>
                <p>{course?.studentsEnrolled?.length} Students</p>
              </div>
              <div className='flex py-5 items-center gap-2 font-semibold'>
                <img className='w-8 rounded-lg' src={course?.instructor?.picture} alt="" />
                <p>{course?.instructor?.fullName}</p>
              </div>
              {/* review and about section  */}
              <div className='pt-5'>
                {/* header  */}
                <div className='flex items-center gap-4 border-b-2 pb-2 pl-1 font-semibold text-muted-foreground relative'>
                  <p onClick={() => settoggleSection("about")} className={`${toggleSection === "about" && 'text-primary'} cursor-pointer select-none`}>About</p>
                  <p onClick={() => settoggleSection("review")} className={`${toggleSection === "review" && 'text-primary'} cursor-pointer select-none`}>Review</p>
                  <div className={`${toggleSection === "about" ? 'left-0' : 'left-16'} w-14 h-0.5 rounded-lg absolute -bottom-0.5  bg-primary`}></div>
                </div>
              </div>
            </div>
            {/* image container  */}
            <div className='bg-background col-span-3 rounded-lg p-5'>
              <div>
                <img src={course?.thumbnail} alt="" className='rounded-lg'/>
              </div>
              <div className='mt-5 flex items-center justify-between'>
                <p className='font-bold text-2xl'>${course?.price}</p>
                {!added ? <div className='flex gap-2 items-center cursor-pointer'>
                  <FaRegHeart className='text-2xl cursor-pointer text-muted-foreground'/>
                  <p className='text-muted-foreground'>Add to whishlist</p>
                </div> : <div className='flex gap-2 items-center cursor-pointer'>
                  <FaHeart className='text-2xl text-red-500 cursor-pointer'/>
                  <p className='font-semibold text-red-500'>Added</p>
                </div>}
              </div>
                {/* learn  */}
                <div className='mt-5'>
                  <h1 className='font-semibold'>What will you learn:</h1>
                </div>

                {/* buttons  */}
                <div>
                  <button className='bg-primary rounded-lg py-3 px-5 text-white font-semibold w-full mt-5 cursor-pointer select-none hover:bg-transparent hover:text-black transition-all border-2 border-primary'>Buy Now</button>
                  <Link href={{pathname: `/courses/course-content/${course?._id}`}}><button className='bg-primary rounded-lg py-3 px-5 text-white font-semibold w-full mt-5 cursor-pointer select-none hover:bg-transparent hover:text-black transition-all border-2 border-primary'>Start</button></Link>
                </div>
            </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
