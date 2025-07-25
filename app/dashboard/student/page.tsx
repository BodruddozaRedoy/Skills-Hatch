
import Banner from '@/components/Banner/Banner'
import LearningActivity from '@/components/LearningActivity'
import Progress from '@/components/Progress/Progress'
import ProgressSection from '@/components/ProgressSection'
import ScoreActivity from '@/components/ScoreActivity'
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Student() {
  return (
    <ProtectedRoute>
      <div className='space-y-10'>
        {/* banner section */}
        <Banner />

        {/* progress section  */}
        <section className='mt-10'><Progress /></section>

        {/* learning activity  */}
        <section className='grid grid-cols-1 lg:grid-cols-6  gap-10 w-full'>
          <div className='lg:col-span-4 w-full'>
            <LearningActivity title={"Learning Activity"} />
          </div>
          <div className='w-full lg:col-span-2 '>
        <ProgressSection />
        </div>
      </section>
      
      {/* score activity */}
      <section>
        <ScoreActivity />
      </section>
    </div>
    </ProtectedRoute>
  )
}
