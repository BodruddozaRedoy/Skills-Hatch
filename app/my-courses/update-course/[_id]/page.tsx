"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function UpdatePage({ params }: any) {
    const searchParams = useSearchParams()
    const tab = searchParams.get("tab")
    console.log("tab", tab)
    console.log("params", params._id)
    return (
        <div>UpdatePage</div>
    )
}
