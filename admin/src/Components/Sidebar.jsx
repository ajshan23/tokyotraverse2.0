import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='hidden lg:flex  w-1/6  h-screen  border-r-2 border-red-600'>
      <ul className='flex flex-col gap-5 list-none w-full items-center pt-5'>
        <li className='px-10 w-fit py-2 border-2 border-red-600 rounded-xl active:bg-red-600 active:text-white cursor-pointer'><Link to="addproduct">Add Product</Link></li>
        <li className='px-10 w-fit py-2 border-2 border-red-600 rounded-xl active:bg-red-600 active:text-white cursor-pointer'><Link to="listproduct">List Product</Link></li>
        <li className='px-10 w-fit py-2 border-2 border-red-600 rounded-xl active:bg-red-600 active:text-white cursor-pointer'><Link to="listorders">List Orders</Link></li>
      </ul>
    </div>
  
  )
}

export default Sidebar
