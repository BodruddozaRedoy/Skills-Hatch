import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

export default function Task() {
    return (
        <div className='bg-background p-5 rounded-lg'>
            <div className='flex justify-between items-center'>
                <h1 className='font-extrabold text-2xl'>Task</h1>
                <BsThreeDots />
            </div>
            <div className='w-full mt-4'>
                <div className='relative mb-1'>
                    <div className='bg-muted w-full h-5 rounded-sm'></div>
                    <div className='bg-secondary w-[50%] h-5 rounded-sm absolute top-0 left-0'></div>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold text-muted-foreground'>Web Design</p>
                    <p className='text-sm  text-muted-foreground'>50%</p>
                </div>
            </div>

            <div className='w-full mt-4'>
                <div className='relative mb-1'>
                    <div className='bg-muted w-full h-5 rounded-sm'></div>
                    <div className='bg-primary w-[70%] h-5 rounded-sm absolute top-0 left-0'></div>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold text-muted-foreground'>English Grammar</p>
                    <p className='text-sm  text-muted-foreground'>70%</p>
                </div>
            </div>
        </div>
    )
}
