import React from 'react'

export default function UpcomingTask() {
  return (
    <div className=''>
        <h1 className='font-extrabold text-2xl'>Upcoming Task</h1>
        <div className='mt-4 space-y-3'>
        <div className=' py-5 px-5 bg-background relative overflow-hidden rounded-lg'>
            <p>2. english grammar lesson 2</p>
            <div className='w-2 h-full bg-primary top-0 left-0 absolute'></div>
        </div>
        <div className=' py-5 px-5 bg-background relative overflow-hidden rounded-lg'>
            <p>2. english grammar lesson 2</p>
            <div className='w-2 h-full bg-secondary top-0 left-0 absolute'></div>
        </div>
        <div className=' py-5 px-5 bg-background relative overflow-hidden rounded-lg'>
            <p>2. english grammar lesson 2</p>
            <div className='w-2 h-full bg-foreground top-0 left-0 absolute'></div>
        </div>
        
        </div>
    </div>
  )
}
