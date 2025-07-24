"use client"
import LeftSidebar from '@/components/layouts/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/layouts/RightSidebar/RightSidebar'
import SidebarButton from '@/components/shared/SidebarButton'
import { GeneralContext, Provider } from '@/context/useContext'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layouts/Navbar/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import { useKindeUser } from '@/hooks/useKindeUser'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '@gsap/react';

const queryClient = new QueryClient()

export default function ContextProvider({ children }: any) {
  const router = useRouter()
  const { user, isLoading: kindeUserLoading } = useKindeUser()
  const [pageLoading, setPageLoading] = useState(false)
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebar = useRef(null)
  const rightSidebar = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(sidebar.current, {
      x: "-300px",
      duration: 1,
      ease: "bounce.out"
    })
  }, {scope: sidebar, dependencies: [kindeUserLoading]})

  

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        {
          !kindeUserLoading ? (
            <>
              <nav className="fixed w-full z-[99999]">
                <Navbar />
              </nav>
                {/* <div ref={sidebar} className='w-40 h-40 bg-red-500'></div> */}
              <main className="flex relative">

                <aside ref={sidebar} className='relative mt-[120px]'>
                  {/* for mobile  */}
                  <div className={`h-full bg-background left-0 z-[999] p-10 top-20 lg:hidden fixed ${!sidebarOpen ? 'hidden' : 'w-[300px]'}`}><LeftSidebar /></div>
                  {/* for large device  */}
                  <div  className={`hidden lg:flex h-full bg-background left-0 z-[999] p-10 fixed w-[300px] left-sidebar`}><LeftSidebar /></div>
                  {/* sidebar btn  */}
                  <div className='flex lg:hidden z-[999] sidebar-btn' onClick={() => setSidebarOpen(!sidebarOpen)}><SidebarButton sidebarOpen={sidebarOpen} /></div>
                </aside>
                <section className={`${pathname.includes("/dashboard") ? 'lg:mx-[300px]' : 'lg:ml-[300px]'} p-5 lg:p-10 w-full mt-[120px]`}>{children}</section>
                {pathname.includes("/dashboard") && <aside ref={rightSidebar} className="right-sidebar hidden lg:flex w-[300px] h-screen fixed right-0 mt-[120px]"><RightSidebar /></aside>}
              </main>
              <footer></footer>
              <Toaster />
            </>
          ) : (
            <LoadingScreen />
          )
        }
      </QueryClientProvider>
    </Provider>
  )
}
