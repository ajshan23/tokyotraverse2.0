import React from 'react'
import pic from "../assets/group1.png"
import {FaSearch} from "react-icons/fa"
const MainSearch = () => {
  return (
    <div className='relative bg-red-500 font-lexend text-white w-full h-40 md:h-96 px-10 md:px-[120px] flex items-center '>
        <div className='flex flex-col gap-1 md:gap-5'>
            <div className='w-24 md:w-80 h-5 md:h-8 border md:border-2 md:px-4 border-white rounded-sm flex justify-center items-center'>
                
                <input type="text" className='w-full h-full bg-transparent outline-none border-none text-xsm3 md:text-xl  placeholder:text-xsm2 md:placeholder:text-sm placeholder:text-white placeholder:opacity-65 ' placeholder='Search By Anime,Character,Size...'/>
                <div className='flex md:hidden'><FaSearch size={8}/></div>
                <div className='hidden md:flex'><FaSearch size={20}/></div>
            
            </div>
            <div className='text-xsm4 w-36 md:w-[60%] md:text-5xl '>UNLOCK YOUR OTAKU PASSION WITH EXCLUSIVE MERCHANIDISE </div>
            <div className='text-xsm3 px-2 py-1 bg-white text-red-600 w-fit md:text-xl md:px-4 md:py-2'>EXPLORE</div>
        </div>
        <div className='absolute right-0 md:right-20 bottom-0'><img src={pic} alt="" className='w-60 md:w-[650px]' /></div>
      
    </div>
  )
}

export default MainSearch
