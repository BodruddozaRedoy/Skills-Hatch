import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Home() {
  return redirect("/dashboard/student")
}
