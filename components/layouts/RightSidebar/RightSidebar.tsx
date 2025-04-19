import Calendar from '@/components/Calendar/Calendar'
import DigitalClock from '@/components/DigitalClock'
import Task from '@/components/Task'
import UpcomingTask from '@/components/UpcomingTask'
import React from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'

export default function RightSidebar() {
  return (
    <div className='pt-5 pr-5 space-y-5'>
        {/* calender  */}
        {/* <Calendar/> */}
        <DigitalClock/>
        {/* task  */}
        <Task/>

        {/* upcoming task  */}
        <UpcomingTask/>
    </div>
  )
}
