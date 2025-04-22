"use client"
import { icons } from 'lucide-react'
import Link from 'next/link';
import React, { useContext } from 'react'
import { GrDashboard } from 'react-icons/gr'
import { TbLayout2Filled } from "react-icons/tb";
import { IoBookSharp } from "react-icons/io5";
import { useParams, usePathname } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import { GeneralContext } from '@/context/useContext';



const sidebarLinks = [
    {
        title: "Dashboard",
        icon: TbLayout2Filled,
        link: "/dashboard/student"
    },
    {
        title: "Courses",
        icon: IoBookSharp,
        link: "/courses"
    },

]

export default function LeftSidebar() {
    const pathname = usePathname()
    

    return (
        <div className=' flex flex-col gap-5 relative w-full'>
            <div className='flex flex-col gap-5 relative flex-1'>
            {
                sidebarLinks?.map((link, index) => (
                    <Link key={index} href={link.link}>
                        <div className={`flex items-center gap-4  px-5 py-4 rounded-lg font-semibold text-lg ${pathname === link.link && 'bg-primary text-white'}`}>
                            <link.icon />
                            <p>{link.title}</p>
                        </div>
                    </Link>
                ))
            }
            </div>
            <div className='bg-primary py-3 px-5 w-full text-background rounded-lg font-extrabold'>Upgrade to Pro</div>
        </div>
    )
}
