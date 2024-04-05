import React, { useState } from 'react'
import { FaUser,FaList } from "react-icons/fa"
import { ImCross } from "react-icons/im";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex w-full h-16 lg:h-20 items-center justify-between px-3 lg:px-[120px] font-lexend border-b-2 border-red-600'>
        <div className='text-lg lg:text-2xl font-semibold flex'>
            <div className='text-red-600'>TOKYO</div>
            <div>TRAVERSE</div>
        </div>
        <div className='flex gap-20 items-center'>
            
          <div className='md:hidden'><FaUser/></div>
          <div className='hidden md:flex'><FaUser size={25} /></div>
          
        </div>
        <div className='flex md:hidden' onClick={toggleMenu}>
            {!isOpen?<FaList/>:<ImCross/>}
        </div>
        <div
        className={`absolute  z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } top-0 -left-20  transition-transform duration-300 ease-in-out bg-white w-64 h-full flex flex-col  items-center `}
      >
        <div className='flex flex-col lg:hidden'>
          <div className=" pt-10 w-full ">
            <ul className='list-none flex flex-col gap-5'>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Home</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Products</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Orders</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>About</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Contact</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>ENG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar
