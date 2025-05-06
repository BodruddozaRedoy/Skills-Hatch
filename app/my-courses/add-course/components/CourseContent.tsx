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

export default function CourseContent({ course, setCourse, _id }: any) {
    const { dbUser } = useDbUser()
    const [chapter, setChapter] = useState({
        title: "",
        quiz: [],
        lessons: []
    })
    console.log(chapter)
    useEffect(() => {
        localStorage.setItem("TextEditorContent", JSON.stringify("Write here..."))
    }, [])


    // handleAddChapter
    const handleAddChapter = async () => {
        try {
            const res = await axiosPublic.patch(`/api/course?kindeId=${dbUser?.kindeId}&courseId=${_id}`, { chapter: chapter })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Chapter 1: Js Fundamentals</AccordionTrigger>
                    <AccordionContent className=''>
                        Lesson 1: How to difference == and ===?
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
