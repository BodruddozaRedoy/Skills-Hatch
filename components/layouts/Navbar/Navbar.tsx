"use client"
import Logo from '@/components/shared/Logo'
import { ChartBar, Dot, MessageCircleMore, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TbMessageCircleFilled } from "react-icons/tb";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi2";
import { FaBarsStaggered } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useState } from 'react';
import RightSidebar from '../RightSidebar/RightSidebar';




export default function Navbar() {
  const [menu, setMenu] = useState(false)
  return (
    <div className='flex items-center justify-between px-5 lg:px-10 py-7 bg-background w-full relative'>
      {/* Logo  */}
      <Logo />

      {/* search bar  */}
      <div className='relative hidden lg:flex'>
        <input className='bg-muted py-3 rounded-lg px-5 pl-12 w-[450px]' type="text" name="" id="" placeholder='Search here...' />
        <Search className='text-primary absolute top-1/2 -translate-y-1/2 left-4' />
      </div>
      {/* navbar end  */}
      <div className='flex items-center gap-6 z-40'>
        {/* language bar  */}
        <div className='hidden lg:flex'>
          <Select>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Eng (US)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Eng(US)"><img className='w-8 h-8 object-cover z-30' src="./us.png" alt="" /> Eng(US)</SelectItem>
              <SelectItem value="Bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* icons  */}
        <div className='lg:flex items-center gap-4 hidden'>
          <BiSolidMessageSquareDots className='text-2xl lg:text-4xl text-gray-400' />
          <MdNotificationsActive className='text-2xl lg:text-4xl text-gray-400' />
          <RiSettings5Fill className='text-2xl lg:text-4xl text-gray-400' />
        </div>

        {/* avatar  */}
        <div className='w-12 h-12 lg:w-16 lg:h-16 rounded-full border-3 flex items-center justify-center border-primary'>
          <img src="" alt="" />
          <HiUserCircle className='text-6xl text-gray-400 w-full' />
        </div>

        <div onClick={() => setMenu(!menu)} className='flex lg:hidden'>
          <FaBarsStaggered className='text-gray-400 text-2xl' />
        </div>
      </div>



      {/* mobile menu  */}
      {
        menu && <div className='flex items-center flex-col lg:hidden w-66 h-screen p-5 absolute  top-0 right-0 z-[999] bg-muted overflow-y-auto'>
          <div className='relative w-full'>
            <div className='inline-flex justify-between rounded-lg bg-background fixed top-0 right-0 p-3 mr-3 mt-3'>
              <div>
                {/* icons  */}
                <div className='flex w-full gap-5 lg:hidden'>
                  <BiSolidMessageSquareDots className='text-4xl text-gray-400' />
                  <MdNotificationsActive className='text-4xl text-gray-400' />
                  <RiSettings5Fill className='text-4xl text-gray-400' />
                </div>
              </div>
              <ImCross onClick={() => setMenu(!menu)} className='text-foreground text-2xl' />
            </div>

            <aside className=""><RightSidebar /></aside>
          </div>
        </div>
      }
    </div>
  )
}
