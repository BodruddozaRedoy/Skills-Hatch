import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";


export default function MyCourses() {
    return (
        <div className=''>
            {/* add course  */}
            <Link href={"/my-courses/add-course"}><Button className=''><IoIosAddCircleOutline /> Add Course</Button></Link>
            <div className='bg-background p-5 rounded-lg mt-5'>
                <h1 className='text-xl font-black'>All Courses</h1>
                <hr className='w-full my-3' />
                {/* courses cards  */}
                <div>

                </div>
            </div>
        </div>
    )
}
