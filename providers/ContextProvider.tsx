"use client"
import LeftSidebar from '@/components/layouts/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/layouts/RightSidebar/RightSidebar'
import SidebarButton from '@/components/shared/SidebarButton'
import { GeneralContext, Provider } from '@/context/useContext'
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'

export default function ContextProvider({ children }: any) {
  // const {sidebarOpen} = useContext<any>(GeneralContext)
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <Provider>
      <main className="flex relative">
        <aside className='relative mt-[120px]'>
        <div className={`h-full bg-background left-0 z-[999] p-10 top-20 lg:hidden fixed ${!sidebarOpen ? 'hidden':'w-[300px]'}`}><LeftSidebar /></div>
        <div className={`hidden lg:flex h-full bg-background left-0 z-[999] p-10 fixed ${!sidebarOpen ? 'hidden':'w-[300px]'}`}><LeftSidebar /></div>
        <div className='flex lg:hidden z-[999]' onClick={() =>setSidebarOpen(!sidebarOpen)}><SidebarButton sidebarOpen={sidebarOpen}/></div>
        </aside>
        <section className={`${pathname.includes("/dashboard") ? 'lg:mx-[300px]' : 'lg:ml-[300px]'} p-5 lg:p-10 w-full mt-[120px]`}>{children}</section>
        {pathname.includes("/dashboard") && <aside className="hidden lg:flex w-[300px] h-screen fixed right-0 mt-[120px]"><RightSidebar /></aside>}
      </main>
    </Provider>
  )
}
