import React from 'react'
import RichTextEditor from './RichTextEditor'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import SimpleTextEditor from './SimpleTextEditor'

export default function CourseContent({ course, setCourse }: any) {
    return (
        <div>
            {/* <RichTextEditor /> */}
            <SimpleEditor />
            {/* <SimpleTextEditor /> */}
        </div>
    )
}
