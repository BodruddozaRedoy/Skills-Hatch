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


export default function Navbar() {
  return (
    <div className='flex items-center justify-between px-10 py-7 bg-background w-full'>
      {/* Logo  */}
      <Logo />

      {/* search bar  */}
      <div className='relative'>
        <input className='bg-muted py-3 rounded-lg px-5 pl-12 w-[450px]' type="text" name="" id="" placeholder='Search here...' />
        <Search className='text-primary absolute top-1/2 -translate-y-1/2 left-4' />
      </div>
      {/* navbar end  */}
      <div className='flex items-center gap-6 z-40'>
        {/* language bar  */}
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Eng (US)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eng(US)"><img className='w-8 h-8 object-cover z-30' src="./us.png" alt="" /> Eng(US)</SelectItem>
            <SelectItem value="Bengali">Bengali</SelectItem>
          </SelectContent>
        </Select>

        {/* icons  */}
        <div className='flex items-center gap-4'>
          <BiSolidMessageSquareDots className='text-4xl text-gray-400' />
          <MdNotificationsActive className='text-4xl text-gray-400'/>
          <RiSettings5Fill className='text-4xl text-gray-400'/>
        </div>

        {/* avatar  */}
        <div className='w-16 h-16 rounded-full border-3 flex items-center justify-center border-primary'>
          <img src="" alt="" />
          <HiUserCircle className='text-6xl text-gray-400 w-full'/>
        </div>
      </div>

    </div>
  )
}
