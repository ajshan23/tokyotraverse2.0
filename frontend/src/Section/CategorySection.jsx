
import React from 'react'
import './style2.css'
import '../style.css'
import naruto from "../assets/naruto.png"
import aot from "../assets/aot.png"
import demonslayer from "../assets/demonslayer.png"
import dragonballz from "../assets/dragonballz.png"
import onepiece from "../assets/onepiece.png"
const CategorySection = () => {
  const data=[
    {
      name:"aot",
      image:aot,
    },{
      name:"demonslayer",
      image:demonslayer,
    },{
      name:"naruto",
      image:naruto,
    },{
      name:"dragonballz",
      image:dragonballz,
    },{
      name:"onepiece",
      image:onepiece,
    }
  ]
  return (
    <div className='py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14'>
        <div className='text-sm font-semibold md:text-4xl'>CATEGORIES</div>
        <div className='text-xsm3 md:text-xl'>Find a Variety of Your Favourite Anime Products</div>
        <div className='w-full text-end text-xsm3 md:text-base'>View All</div>

        <div className=' border-y md:border-y-2 w-full py-2 md:py-6 border-red-600 flex gap-2 md:gap-12 overflow-scroll element-class justify-center'>
            {
                data.map((d,i)=><div key={i} className='border md:border-2 border-red-600 rounded-lg flex justify-center items-center'>
                 
                        <img src={d.image} alt="" className='image w-52 h-auto hover:scale-110 bg-blend-screen '/>
                
                     </div>)
            }

        </div>
      
    </div>
  )
}

export default CategorySection
