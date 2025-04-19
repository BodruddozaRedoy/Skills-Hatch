
import Banner from '@/components/Banner/Banner'
import LearningActivity from '@/components/LearningActivity'
import Progress from '@/components/Progress/Progress'
import ProgressSection from '@/components/ProgressSection'
import ScoreActivity from '@/components/ScoreActivity'
import React from 'react'

export default function Student() {
  return (
    <div className='space-y-10'>
      {/* banner section */}
      <Banner />

      {/* progress section  */}
      <section className='mt-10'><Progress /></section>

      {/* learning activity  */}
      <section className='flex h-[500px] gap-10'>
        <LearningActivity />
        <ProgressSection />
      </section>
      
      {/* score activity */}
      <section>
        <ScoreActivity />
      </section>
    </div>
  )
}
