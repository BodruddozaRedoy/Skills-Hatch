import Calendar from '@/components/Calendar/Calendar'
import Task from '@/components/Task'
import UpcomingTask from '@/components/UpcomingTask'
import React from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'

export default function RightSidebar() {
  return (
    <div className='pt-10 pr-5 space-y-5'>
        {/* calender  */}
        {/* <Calendar/> */}
        {/* task  */}
        <Task/>

        {/* upcoming task  */}
        <UpcomingTask/>
    </div>
  )
}
