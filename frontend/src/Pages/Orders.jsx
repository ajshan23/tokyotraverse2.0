import React, { useState } from 'react'
import OrderCard from '../components/OrderCard/OrderCard'
import Orderdesignated from '../components/OrderCard/Orderdesignated'

const Orders = () => {
    const [selected,setSelected]=useState("all")
  return (
    <div className='w-full py-10  flex flex-col justify-center items-center px-2 md:px-[120px] gap-10'>
        <div className='text-center flex flex-col gap-3'>
            <div className='font-lexend text-2xl md:text-5xl'>Orders</div>
            <div className='font-mono text-sm md:text-base text-slate-700'>Find Whats In Your Bag</div>
            <div className='flex flex-col md:flex-row gap-2 justify-center items-center '>
                <div className='flex flex-row gap-2  text-xsm4 md:text-base'>
                <div className={`px-10 py-.5  border border-red-600 rounded-sm flex  ${selected==="all" && "bg-red-600 text-white"} justify-center cursor-pointer items-center`}  onClick={()=>setSelected("all")}>All</div>
                <div className={`px-6 py-.5  border border-red-600 rounded-sm flex ${selected==="ordered" && "bg-red-600 text-white"} justify-center cursor-pointer items-center`}  onClick={()=>setSelected("ordered")}>Ordered</div>
                <div className={`px-6 py-.5  border border-red-600 rounded-sm flex ${selected==="shipped" && "bg-red-600 text-white"} justify-center cursor-pointer items-center`}  onClick={()=>setSelected("shipped")}>Shipped</div>
                </div>
                <div className='flex flex-row gap-2 text-xsm4 md:text-base'>
                <div className={`px-6 py-.5  border border-red-600 rounded-sm flex ${selected==="delivered" && "bg-red-600 text-white"} justify-center cursor-pointer items-center`}  onClick={()=>setSelected("delivered")}>Delivered</div>
                <div className={`px-6 py-.5  border border-red-600 rounded-sm flex ${selected==="cancelled" && "bg-red-600 text-white"} justify-center cursor-pointer items-center`}  onClick={()=>setSelected("cancelled")}>Cancelled</div>
                </div>
            </div>
        </div>
        <div className='w-full flex flex-col gap-2 md:gap-5'>
                <OrderCard />
                <Orderdesignated/>
                
            </div>
      
    </div>
  )
}

export default Orders
