import { IoBookmarks } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { FaBarsProgress } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";



export default function Progress() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 items-center justify-between'>
        <div className='bg-primary p-8 rounded-lg pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-primary rounded-lg text-4xl mb-8'>
            <TbCopyCheckFilled/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3'>Completed <br /> Courses</p>
            <TbCopyCheckFilled className='text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='bg-secondary p-8 rounded-lg pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-secondary rounded-lg text-4xl mb-8'>
            <FaBarsProgress/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3'>In Progress <br /> Courses</p>
            <FaBarsProgress className='text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='bg-foreground p-8 rounded-lg pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-foreground rounded-lg text-4xl mb-8'>
            <IoBookmarks/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3'>Bookmarked <br /> Courses</p>
            <IoBookmarks className='text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
        <div className='bg-[#007074] p-8 rounded-lg pr-44 relative overflow-hidden'>
            <div className='bg-background inline-flex p-3 text-foreground rounded-lg text-4xl mb-8'>
            <IoIosTimer/>
            </div>
            <p className='font-extrabold text-background text-3xl'>1000</p>
            <p className='text-background mt-3'>Upcoming <br /> Courses</p>
            <IoIosTimer className='text-[200px] absolute text-[#d2e8ca] top-1/2 -translate-1/2 -right-[170px] opacity-40'/>
        </div>
    </div>
  )
}
