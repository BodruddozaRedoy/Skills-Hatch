import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import CourseDetails from './components/CourseDetails';
import CourseContent from './components/CourseContent';


export default function AddCourse() {
    return (
        <div>
            <Link href={"/my-courses"} className='font-semibold flex gap-2 items-center'><IoIosArrowBack /> Back</Link>
            {/* content  */}
            <div className='bg-background p-5 rounded-lg mt-5 flex items-start'>
                <Tabs defaultValue='course-details' className='w-full'>
                    <TabsList>
                        <TabsTrigger value='course-details'>Course Details</TabsTrigger>
                        <TabsTrigger value='course-content'>Course Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value='course-details'><CourseDetails /></TabsContent>
                    <TabsContent value='course-content'><CourseContent /></TabsContent>
                </Tabs>
                {/* buttons  */}
                <div className='flex gap-3 items-center'>
                    <Button className='flex gap-2 items-center'><MdPublish /> Publish</Button>
                    <Button className='bg-secondary gap-2 items-center hover:bg-secondary'><RiDraftFill /> Draft</Button>
                </div>
            </div>
        </div>
    )
}
