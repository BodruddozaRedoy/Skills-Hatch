"use client"
import Calendar from '@/components/Calendar/Calendar'
import DigitalClock from '@/components/DigitalClock'
import Task from '@/components/Task'
import UpcomingTask from '@/components/UpcomingTask'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'

export default function RightSidebar() {
  const rightBar = useRef(null)
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(".right-bar", {
      y: 100
    })
  }, {scope:rightBar})
  return (
    <div ref={rightBar} className='pt-5 lg:pr-5 lg:space-y-5 space-y-3 bg-muted lg:bg-transparent p-1 right-bar'>
        {/* calender  */}
        {/* <Calendar/> */}
        <div><DigitalClock/></div>
        {/* task  */}
        <div><Task/></div>

        {/* upcoming task  */}
        <div><UpcomingTask/></div>
    </div>
  )
}
