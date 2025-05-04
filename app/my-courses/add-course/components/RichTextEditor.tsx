// components/RichTextEditor.tsx
'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-100 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        Numbered List
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-3 py-1 rounded ${editor.isActive('paragraph') ? 'bg-primary text-white' : 'bg-white text-gray-700 border'}`}
      >
        Paragraph
      </button>
    </div>
  )
}

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write your course content here...</p>',
  })

  return (
    <div className="w-full mx-auto p-4 bg-white shadow rounded-lg mt-5">
      <MenuBar editor={editor} />
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <EditorContent editor={editor} className="min-h-[300px] border border-gray-300 rounded-md p-4" />
      </div>
    </div>
  )
}

export default RichTextEditor
