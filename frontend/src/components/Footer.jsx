import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-red-500 h-fit font-lexend text-white flex-col justify-center items-center'>
      <div className='py-2 md:py-10'>
      <div className='flex flex-row gap-2 md:gap-20  justify-center'>
        <div className='flex flex-col gap-2 md:gap-10'>
            <div className='text-sm md:text-3xl'>Available Locations</div>
            <ul className='list-none flex flex-col gap-3 text-xsm4 md:text-sm'>
                <li>India</li>
                <li>China</li>
                <li>USA</li>
                <li>Japan</li>
                <li>France</li>
            </ul>
        </div>
   
        <div className='flex flex-col  gap-2 md:gap-10'>
            <div className='text-sm md:text-3xl'>Know about us</div>
            <ul className='list-none flex flex-col gap-3 text-xsm4 md:text-sm'>
                <li>About us</li>
                <li>Reviews</li>
                <li>Notes</li>
                <li>Press Releases</li>
            
            </ul>
        </div>
        <div className='flex flex-col  gap-2 md:gap-10'>
            <div className='text-sm md:text-3xl'>Contact Us</div>
            <ul className='list-none flex flex-col gap-3 text-xsm4 md:text-sm'>
                <li>+91 9876543210</li>
                <li>+91 9876543210</li>
               <li>tokyotraverse@gmail.com</li>
               <li>ajmalshahan23@gmail.com</li>
               <li>gokulpvappu@gmail.com</li>
               <li>Calicut, Kerala-673571</li>
            </ul>
        </div>
      </div>
      <div className='flex pt-1 text-sm md:pt-4 md:text-xl font-semibold justify-center items-center'>
            Connect with us:&nbsp; <FaFacebook/>&nbsp;<FaInstagram/>&nbsp;<FaTwitter/>
        </div>
        <div className='w-full text-sm md:text-base flex justify-center pt-1 md:pt-5'>
            Copywrite @2023 By Ajmal Shahan
        </div>
      </div>
    </div>
  )
}

export default Footer
