"use client"
import { icons } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
import { GrDashboard } from 'react-icons/gr'
import { TbLayout2Filled } from "react-icons/tb";
import { IoBookSharp } from "react-icons/io5";
import { useParams, usePathname } from 'next/navigation';



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

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <div className=' flex flex-col gap-5 '>
            {
                sidebarLinks?.map((link, index) => (
                    <Link key={index} href={link.link}>
                        <div className={`flex items-center gap-4  px-5 py-4 rounded-lg font-bold text-xl ${pathname === link.link && 'bg-primary text-white'}`}>
                            <link.icon />
                            <p>{link.title}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
