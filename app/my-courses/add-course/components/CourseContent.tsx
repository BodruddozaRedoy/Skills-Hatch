"use client"
import React, { useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import SimpleTextEditor from './SimpleTextEditor'
import "@/components/tiptap-node/list-node/list-node.scss"
import "./style.css"

export default function CourseContent({ course, setCourse }: any) {
    const savedHtml = JSON.parse(localStorage.getItem("TextEditorContent") || "")
    console.log(savedHtml)
    const [fixedHtml, setFixedHtml] = useState(savedHtml)

    useEffect(() => {
        let updatedHtml = savedHtml.replace(
            /href="(www\.[^"]*)"/g,
            'href="https://$1"'
        )
        setFixedHtml(updatedHtml)

        const links = document.querySelectorAll(".simple-editor-content a")
        links.forEach(link => {
            link.setAttribute("target", "_blank")
            link.setAttribute("rel", "noopener noreferrer")
        })
    }, [savedHtml])
    return (
        <div>
            {/* <RichTextEditor /> */}
            <SimpleEditor />
            {/* <SimpleTextEditor /> */}
            <div className='tiptap-content' dangerouslySetInnerHTML={{ __html: fixedHtml }} />
        </div>
    )
}
