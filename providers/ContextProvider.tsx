"use client"
import LeftSidebar from '@/components/layouts/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/layouts/RightSidebar/RightSidebar'
import SidebarButton from '@/components/shared/SidebarButton'
import { GeneralContext, Provider } from '@/context/useContext'
import React, { useContext, useState } from 'react'

export default function ContextProvider({ children }: any) {
  // const {sidebarOpen} = useContext<any>(GeneralContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <Provider>
      <main className="flex relative">
        <aside className='relative mt-[120px]'>
        <div className={`h-full bg-background left-0 p-10 fixed ${sidebarOpen ? 'hidden':'w-[300px]'}`}><LeftSidebar /></div>
        <div onClick={() =>setSidebarOpen(!sidebarOpen)}><SidebarButton sidebarOpen={sidebarOpen}/></div>
        </aside>
        <section className="mx-[300px] p-10 w-full mt-[120px]">{children}</section>
        <aside className="w-[300px] h-screen fixed right-0 mt-[120px]"><RightSidebar /></aside>
      </main>
    </Provider>
  )
}
