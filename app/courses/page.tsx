import AllCategories from '@/components/AllCategories'
import AllCourses from '@/components/Courses/AllCourses'
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Courses() {
  return (
    <ProtectedRoute>
      <div className='space-y-5'>
        <AllCategories />
        <AllCourses />
      </div>
    </ProtectedRoute>
  )
}
