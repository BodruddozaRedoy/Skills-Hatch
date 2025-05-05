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

export default function MyCourseCard({ course }: any) {
    const { thumbnail, status, title, price, category } = course
    return (
        <div className='rounded-lg shadow-md p-5 grid grid-cols-7 items-center w-full'>
            {/* 1st flex  */}
            <div className="border col-span-6 flex items-center gap-3">
                {/* image  */}
                <div className='w-60 h-60 rounded-lg overflow-hidden'>
                    <img className='w-full object-contain h-full' src={thumbnail} alt="" />
                </div>
                {/* details  */}
                <div>
                    <h1 className="font-bold text-2xl text-foreground">{title}</h1>
                    <p className="text-foreground font-black text-lg "><span className="text-primary font-bold">$</span>{price}</p>
                </div>

                {/* divider  */}
                <hr className="h-full w-2 text-black" />
            </div>

            {/* 2nd flex  */}
            <div className="space-y-3 col-span-1">
                {/* status  */}
                <div className={`${status === "draft" ? 'bg-secondary' : 'bg-primary'} inline-flex rounded-2xl py-1 px-4 text-sm font-semibold text-background items-center`}> {status === "draft" ? "Draft" : "Published"}</div>
                {/* status change  */}
                <div>
                    {/* <Label className='mb-2'>Category</Label> */}
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="web-development">Draft</SelectItem>
                                <SelectItem value="web-design">Publish</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    )
}
