"use client"
import React, { useEffect, useState } from 'react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import "@/components/tiptap-node/list-node/list-node.scss"
import "./style.css"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
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

export default function CourseContent({ course, setCourse, _id, refetch }: any) {
    const { dbUser } = useDbUser()
    const [chapter, setChapter] = useState({
        chapterId: 0,
        title: "",
        quiz: [],
        lessons: []
    })
    const [accordion, setAccordion] = useState(false)
    console.log(chapter)
    useEffect(() => {
        localStorage.setItem("TextEditorContent", JSON.stringify("Write here..."))
    }, [])
    // console.log("Chapter length", course?.chapters?.length + 1)
    useEffect(() => {
        setChapter({ ...chapter, chapterId: course?.chapters?.length + 1 })
    }, [course])

    // handleAddChapter
    const handleAddChapter = async () => {
        try {
            const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { chapter: chapter })
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

    return (
        <div className='w-full'>
            {/* {
                course?.chapters?.map((chapter: any, i: number) => (
                    <Accordion key={i} type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className='flex flex-col items-start mb-3 border p-3 rounded-lg shadow-md'>
                            <AccordionTrigger>{chapter?.title}</AccordionTrigger>
                            {!chapter?.lessons?.length && "No Lesson Added"}
                            {
                                chapter?.lessons?.map((lesson: any, i: number) => (
                                    <AccordionContent itemID={`item-${i + 1}`} key={i} className=''>
                                        Lesson 1: How to difference == and ===?
                                    </AccordionContent>
                                ))
                            }
                            <Button size={"sm"} className='mt-2'>Add Lesson</Button>
                        </AccordionItem>
                    </Accordion>
                ))
            } */}
            {!course?.chapters?.length && <p className='font-semibold text-center'>No Chapter Added</p>}
            {
                course?.chapters?.map((chapter: any, i: number) => (
                    <div key={i} className='bg-muted p-4 rounded-lg font-semibold mb-4 select-none' onClick={() => setAccordion(!accordion)}>
                        <h1 className=''>{`Chapter ${chapter.chapterId}: ${chapter.title}`}</h1>
                        {
                            accordion && (<div className='mt-3 bg-background p-3 rounded-lg select-none'>
                                <h1>Lesson</h1>
                            </div>)
                        }
                    </div>
                ))
            }
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Add Chapter</Button>
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
