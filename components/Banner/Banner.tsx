import React from 'react'

export default function Banner() {
    return (
        <div className='w-full h-[280px] border flex bg-primary p-10 rounded-lg text-background relative mt-10'>
            <div>
            <h1 className='font-bold text-3xl'>Join Now and Get Discount Voucher Up to 40%</h1>
            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, omnis.</p>
            </div>
            <div className='absolute right-0 bottom-0'>
                <img className='w-[350px]' src="/student-illustration.png" alt="" />
            </div>
        </div>
    )
}
