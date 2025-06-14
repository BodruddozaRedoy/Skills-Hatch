import { HeadingButton } from '@/components/tiptap-ui/heading-button'
import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

export default function SimpleTextEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: `
          <h1>Write here</h1>
        `,
  })

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="tiptap-button-group" data-orientation="horizontal">
        <HeadingButton level={1}></HeadingButton>
        <HeadingButton level={2}></HeadingButton>
        <HeadingButton level={3}></HeadingButton>
        <HeadingButton level={4}></HeadingButton>
      </div>

      <EditorContent editor={editor} role="presentation" />
    </EditorContext.Provider>
  )
}
