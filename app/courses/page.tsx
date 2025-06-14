import AllCategories from '@/components/AllCategories'
import AllCourses from '@/components/Courses/AllCourses'
import React from 'react'

export default function Courses() {
  return (
    <div className='space-y-5'>
      <AllCategories/>
      <AllCourses/>
    </div>
  )
}
