import React from 'react'
import Showcard from '../components/ShowCard/Showcard'

const ListAllSection = (props) => {
  return (
    <div className='py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14'>
        <div className='text-sm font-semibold md:text-4xl'>{props.name?props.name :"FEATURED PRODUCTS"}</div>
        <div className='text-xsm3 md:text-xl'>Find a Variety of Your Favourite Anime Products</div>
        <div className='py-2'>
              <select className='px-1 md:px-3 py-1 md:py-2 border outline-none md:border-2 rounded-lg border-red-600 text-center text-xsm4 md:text-base text-red-600' >
                <option value="">Filter</option>
                 <option value="pricelh">Price {"("}Low-High{")"}</option>
                 <option value="pricelh">Price {"("}High-Low{")"}</option>
                 <option value="pricelh">Price {"("}Latest{")"}</option>
              </select>
        </div>
        <div className='w-full text-end text-xsm3 md:text-base md:px-24 font-serif'>25 items of 999</div>

       <div className='flex  justify-center'>
       <div className=' border-y md:border-y-2 w-full py-2  md:py-6 border-red-600 grid grid-cols-3 md:grid-cols-4 place-content-center gap-2 md:gap-12 '>
            {
                Array(1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9).map(()=><div><Showcard/> </div>)
            }
        </div>
       </div>
      
    </div>
  )
}

export default ListAllSection
