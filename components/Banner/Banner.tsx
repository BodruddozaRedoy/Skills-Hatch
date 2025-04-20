import { BsCalendar2CheckFill } from "react-icons/bs";
import { SiKnowledgebase } from "react-icons/si";
import { FaCircleNodes } from "react-icons/fa6";


export default function Banner() {
    return (
        <div className="w-full h-[160px] lg:h-[280px] lg:mt-10 relative">
            <div className='w-full h-full  flex items-center bg-primary p-5 lg:p-10 rounded-lg text-background relative overflow-hidden'>
                <div className='w-1/2 overflow-hidden'>
                    <h1 className='font-bold  lg:text-4xl'>Join Now and Get Discount Voucher Up to 40%</h1>
                    <p className='text-gray-200 text-xs lg:text-md font-light lg:mt-7 truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, omnis. Lorem ipsum dolor sit amet consectetur</p>
                    <BsCalendar2CheckFill className="text-[#d2e8ca] absolute right-10 top-5 opacity-40 text-8xl hidden lg:flex" />
                    <SiKnowledgebase className="text-[#d2e8ca] absolute right-[450px] bottom-10 opacity-30 text-9xl hidden lg:flex" />
                    <FaCircleNodes className="text-[#d2e8ca] absolute -left-[50px] -bottom-30 opacity-30 text-[300px] hidden lg:flex" />
                </div>
            </div>
            <div className='absolute -right-3 lg:right-20 bottom-0'>
                <img className='w-[200px] lg:w-[350px]' src="/student-illustration.png" alt="" />
            </div>
        </div>
    )
}
