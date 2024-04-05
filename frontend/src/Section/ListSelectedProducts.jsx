import React from 'react'
import Showcard from '../components/ShowCard/Showcard'
import '../style.css'
const ListSelectedProducts = (props) => {
  return (
    <div className='py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14'>
        <div className='text-sm font-semibold md:text-4xl'>{props.name?props.name :"FEATURED PRODUCTS"}</div>
        <div className='text-xsm3 md:text-xl'>Find a Variety of Your Favourite Anime Products</div>
        <div className='w-full text-end text-xsm3 md:text-base'>View All</div>

        <div className=' border-y md:border-y-2 w-full py-2 md:py-6 border-red-600 flex gap-2 md:gap-12 overflow-scroll element-class justify-center'>
            {
                Array(1,2,3,4).map((i)=><div key={i}><Showcard/> </div>)
            }

        </div>
      
    </div>
  )
}

export default ListSelectedProducts
