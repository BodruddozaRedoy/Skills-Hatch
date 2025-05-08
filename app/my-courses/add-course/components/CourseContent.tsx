"use client"
import React, { useEffect, useState } from 'react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import "@/components/tiptap-node/list-node/list-node.scss"
import "./style.css"
import { Button } from '@/components/ui/button'
import { RiAddCircleFill } from 'react-icons/ri'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { axiosPublic } from '@/lib/axiosPublic'
import useDbUser from '@/hooks/useDbUser'
import Swal from 'sweetalert2'
import { ImBin2 } from "react-icons/im";
import { PlusCircleIcon } from 'lucide-react'


export default function CourseContent({ course, setCourse, _id, refetch }: any) {
    const { dbUser } = useDbUser()
    const [accordion, setAccordion] = useState()
    const [lessonOpen, setLessonOpen] = useState()
    const [addLessonSection, setAddLessonSection] = useState(false)
    const [lessonType, setLessonType] = useState("")
    const [videoUrl, setVideoUrl] = useState("");
    const [chapter, setChapter] = useState({
        courseId: _id,
        title: "",
        quiz: [],
        lessons: []
    })
    const [lesson, setLesson] = useState({
        courseId: _id,
        chapterId: 0,
        title: "",
        textContent: "",
        videoContent: videoUrl,
        resources: ""
    })

    console.log(course?.chapters)
    useEffect(() => {
        localStorage.setItem("TextEditorContent", JSON.stringify("Write here..."))
    }, [])


    //! add a chapter
    const handleAddChapter = async () => {
        try {
            const res = await axiosPublic.post(`/api/chapter?kindeId=${dbUser?.kindeId}`, chapter)
            console.log(res.data)
            if (res.data.status === 201) {
                refetch()
                Swal.fire({
                    title: "Chapter Added",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    //! delete a chapter 
    const handleDeleteChapter = async (chapterId: any) => {
        const res = await axiosPublic.delete(
            `/api/chapter?kindeId=${dbUser?.kindeId}&courseId=${_id}&chapterId=${chapterId}`
        );
        if (res.data.status === 200) {
            refetch()
            Swal.fire({
                title: "Chapter Deleted",
                icon: "success"
            })
        }
        console.log(res.data);
    }

    //! add a lesson 
    const handleAddLesson = async (id: any) => {
        try {
            const res = await axiosPublic.post(`/api/lesson`, lesson)
            console.log(res.data)
            if (res.data.status === 201) {
                setLessonType("")
                setAddLessonSection(false)
                refetch()
                Swal.fire({
                    title: "Lesson Added",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    //! delete a lesson 
    const handleDeleteLesson = async (lessonId: any) => {
        try {
            const res = await axiosPublic.delete(`/api/lesson?lessonId=${lessonId}`)
            console.log(res.data)
            if (res.data.status === 200) {
                refetch()
                Swal.fire({
                    title: "Lesson Deleted",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    //! handle video upload 
    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        const res = await axiosPublic.post('/api/upload', formData)

        setVideoUrl(res.data.url); // URL of uploaded video
        setLesson({ ...lesson, videoContent: res.data.url })
    };

    return (
        <div className='w-full'>
            {/* if no chapter added  */}
            {!course?.chapters?.length && <p className='font-semibold text-center'>No Chapter Added</p>}
            {/* all chapter section  */}
            {
                course?.chapters?.map((chapter: any, index: number) => (
                    <div key={index} className='bg-muted p-4 rounded-lg font-semibold mb-4 select-none' >
                        <div className='flex justify-between items-center'>
                            <h1 onClick={() => setAccordion(accordion == chapter?._id ? null : chapter?._id)} className='cursor-pointer hover:underline'>{`Chapter ${index + 1}: ${chapter.title}`}</h1>
                            <ImBin2 onClick={() => handleDeleteChapter(chapter?.chapterId)} className='text-red-500 cursor-pointer z-10' />
                        </div>
                        {/* single chapter section  */}
                        {
                            accordion == chapter?._id && (<div className='mt-3 bg-background p-3 rounded-lg select-none'>
                                {/* all lesson section  */}
                                {
                                    chapter?.lessons?.map((lesson: any, i: number) => (
                                        <div key={i} className='bg-muted p-4 rounded-lg font-semibold mb-4 select-none' onClick={() => setLessonOpen(lesson == lesson?.i ? null : lesson?.i)}>
                                            <div className='flex justify-between items-center'>
                                                <h1 className=''>{lesson?.title}</h1>
                                                <ImBin2 onClick={() => { handleDeleteLesson(lesson?._id) }} className='text-red-500 cursor-pointer z-10' />
                                            </div>
                                        </div>
                                    ))
                                }
                                {/* add lesson btn  */}
                                {
                                    addLessonSection ? (<div>
                                        <Button onClick={() => handleAddLesson(chapter?.chapterId)} size={"sm"}>Add</Button>
                                        <Button size={"sm"} onClick={() => { setAddLessonSection(false); setLessonType("") }} className='bg-secondary hover:bg-secondary ml-3'>Cancel</Button>
                                    </div>) : (
                                            <Button onClick={() => { setAddLessonSection(true); setLesson({ ...lesson, chapterId: chapter?.chapterId }) }} size={"sm"} className='mt-3'><PlusCircleIcon /> Add Lesson</Button>

                                    )
                                }
                                {/* add lesson section */}
                                {
                                    addLessonSection && (
                                        <div className='border border-primary p-3 rounded-lg mt-2'>
                                            <h1 className='text-center text-xl font-bold'>Add Lesson</h1>
                                            <hr className='w-full my-2' />
                                            <h3>Lesson type?</h3>
                                            <div className='mt-2'>
                                                <Button variant={"outline"} disabled={lessonType === "video"} onClick={() => setLessonType("text")} size={"sm"} className=' disabled:bg-muted-foreground'>Text</Button>
                                                <Button variant={"outline"} disabled={lessonType === "text"} onClick={() => setLessonType("video")} size={"sm"} className=' ml-3 disabled:bg-muted-foreground'>Video</Button>
                                            </div>
                                            <div className='mt-3'>
                                                {/* lesson title  */}
                                                <div className='my-3 space-y-2'>
                                                    <Label>Lesson Title</Label>
                                                    <Input placeholder='Type here' onChange={(e: any) => setLesson({ ...lesson, title: e.target.value })} />
                                                </div>
                                                {lessonType === "video" && <div>
                                                    <Label className='mb-3'>Choose video file</Label>
                                                    <Input placeholder='Choose video file' type='file' accept='video/*' onChange={handleVideoUpload} />
                                                </div>}
                                                {lessonType === "text" && <div><SimpleEditor lesson={lesson} setLesson={setLesson} /></div>}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>)
                        }
                    </div>
                ))
            }
            {/* add chapter  */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline"><PlusCircleIcon />Add Chapter</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add a chapter</AlertDialogTitle>
                        <AlertDialogDescription className='mt-5'>
                            {/* chapter title  */}
                            <div>
                                <Label>Chapter Title</Label>
                                <Input onChange={(e: any) => setChapter({ ...chapter, title: e.target.value })} placeholder='Type here' className='mt-2' />
                            </div>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddChapter}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* <SimpleEditor /> */}
        </div>
    )
}



// const savedHtml = JSON?.parse(localStorage?.getItem("TextEditorContent") || "")
// console.log(savedHtml)
// const [fixedHtml, setFixedHtml] = useState(savedHtml)

// useEffect(() => {
//     let updatedHtml = savedHtml.replace(
//         /href="(www\.[^"]*)"/g,
//         'href="https://$1"'
//     )
//     setFixedHtml(updatedHtml)

//     const links = document.querySelectorAll(".simple-editor-content a")
//     links.forEach(link => {
//         link.setAttribute("target", "_blank")
//         link.setAttribute("rel", "noopener noreferrer")
//     })
// }, [savedHtml])
