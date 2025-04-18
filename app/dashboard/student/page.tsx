import Banner from '@/components/Banner/Banner'
import Progress from '@/components/Progress/Progress'
import React from 'react'

export default function Student() {
  return (
    <div>
        {/* banner section */}
        <Banner/>

        {/* progress section  */}
        <section className='mt-10'><Progress/></section>
    </div>
  )
}
