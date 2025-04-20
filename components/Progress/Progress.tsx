import { IoBookmarks } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { FaBarsProgress } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";



export default function Progress() {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-between'>
        <div className='flex flex-col items-center lg:items-start bg-primary p-5 lg:p-8 rounded-lg lg:pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-primary rounded-lg text-4xl mb-8'>
            <TbCopyCheckFilled/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3 text-center lg:text-start'>Completed <br /> Courses</p>
            <TbCopyCheckFilled className='hidden lg:flex text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='flex flex-col items-center lg:items-start bg-secondary p-5 lg:p-8 rounded-lg lg:pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-secondary rounded-lg text-4xl mb-8'>
            <FaBarsProgress/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3 text-center lg:text-start'>In Progress <br /> Courses</p>
            <FaBarsProgress className='hidden lg:flex text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='flex flex-col items-center lg:items-start bg-foreground p-5 lg:p-8 rounded-lg lg:pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-foreground rounded-lg text-4xl mb-8'>
            <IoBookmarks/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3 text-center lg:text-start'>Bookmarked <br /> Courses</p>
            <IoBookmarks className='hidden lg:flex text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='flex flex-col items-center lg:items-start bg-[#007074] p-5 lg:p-8 rounded-lg lg:pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-foreground rounded-lg text-4xl mb-8'>
            <IoIosTimer/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3 text-center lg:text-start'>Upcoming <br /> Courses</p>
            <IoIosTimer className='hidden lg:flex text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
    </div>
  )
}
