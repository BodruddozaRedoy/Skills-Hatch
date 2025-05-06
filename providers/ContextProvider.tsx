"use client"
import LeftSidebar from '@/components/layouts/LeftSidebar/LeftSidebar'
import RightSidebar from '@/components/layouts/RightSidebar/RightSidebar'
import SidebarButton from '@/components/shared/SidebarButton'
import { GeneralContext, Provider } from '@/context/useContext'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layouts/Navbar/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import { useKindeUser } from '@/hooks/useKindeUser'


const queryClient = new QueryClient()

export default function ContextProvider({ children }: any) {
  const router = useRouter()
  const { user, isLoading: kindeUserLoading } = useKindeUser()
  const [pageLoading, setPageLoading] = useState(false)
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        {
          !kindeUserLoading ? (
            <>
              <nav className="fixed w-full z-[99999]">
                <Navbar />
              </nav>
              <main className="flex relative">
                <aside className='relative mt-[120px]'>
                  <div className={`h-full bg-background left-0 z-[999] p-10 top-20 lg:hidden fixed ${!sidebarOpen ? 'hidden' : 'w-[300px]'}`}><LeftSidebar /></div>
                  <div className={`hidden lg:flex h-full bg-background left-0 z-[999] p-10 fixed w-[300px]`}><LeftSidebar /></div>
                  <div className='flex lg:hidden z-[999]' onClick={() => setSidebarOpen(!sidebarOpen)}><SidebarButton sidebarOpen={sidebarOpen} /></div>
                </aside>
                <section className={`${pathname.includes("/dashboard") ? 'lg:mx-[300px]' : 'lg:ml-[300px]'} p-5 lg:p-10 w-full mt-[120px]`}>{children}</section>
                {pathname.includes("/dashboard") && <aside className="hidden lg:flex w-[300px] h-screen fixed right-0 mt-[120px]"><RightSidebar /></aside>}
              </main>
              <Toaster />
              <footer></footer>
            </>
          ) : (
            <LoadingScreen />
          )
        }
      </QueryClientProvider>
    </Provider>
  )
}
