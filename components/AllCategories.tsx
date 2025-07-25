import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const categories = [
    {
        title: "Web Development",
        desc: "Lorem ipsum dolor sit amet.",
        icon: "https://img.icons8.com/?size=100&id=keI1M862UTP2&format=png&color=000000"
    },
    {
        title: "English Grammar",
        desc: "Lorem ipsum dolor sit amet.",
        icon: "https://img.icons8.com/?size=100&id=nVY8CMy2eyV6&format=png&color=000000"
    },
    {
        title: "Graphic Design",
        desc: "Lorem ipsum dolor sit amet.",
        icon: "https://img.icons8.com/?size=100&id=Segceu5oDSqd&format=png&color=000000"
    },
    {
        title: "Math",
        desc: "Lorem ipsum dolor sit amet.",
        icon: "https://img.icons8.com/?size=100&id=cyQQ5i8svboJ&format=png&color=000000"
    },
]

export default function AllCategories() {
    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-2xl font-extrabold'>All Categories</h1>
                <div className='flex items-center gap-2 cursor-pointer select-none'>
                    <p className='text-primary font-semibold text-sm'>View all</p>
                    <IoIosArrowForward className='font-bold text-primary' />
                </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 items-start justify-between gap-5'>
                {
                    categories?.map((cat, i) => (
                        <div key={i} className='flex lg:flex-row flex-col items-center bg-background rounded-lg py-3 px-5 w-full justify-between cursor-pointer select-none'>
                            <div className='flex lg:flex-row flex-col items-center gap-4'>
                            <img className='w-18' src={cat.icon} alt="" />
                            <div>
                                <h1 className='font-bold text-center lg:text-start'>{cat.title}</h1>
                                <p className='text-muted-foreground text-xs text-center lg:text-start'>{cat.desc}</p>
                            </div>
                            </div>
                            <IoIosArrowForward className='font-bold text-primary mt-5 lg:mt-0' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
