'use client'
import { GeneralContext } from '@/context/useContext'
import React, { useContext } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function SidebarButton({ sidebarOpen }: any) {
    // const { setSidebarOpen, sidebarOpen } = useContext<any>(GeneralContext)
    return (
        <div className={`w-5 h-20 bg-white fixed ${!sidebarOpen ? 'left-0' : 'left-[300px]'}  top-[380px]  flex items-center justify-center rounded-r-md cursor-pointer select-none z-[999]`}>
            {
                !sidebarOpen ? (
                    <IoIosArrowForward />

                ) : (
                    <IoIosArrowBack />
                )
            }
        </div>
    )
}
