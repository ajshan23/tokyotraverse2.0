import React, { useEffect, useState } from 'react'
import Showcard from '../components/ShowCard/Showcard'
import '../style.css'
import axios from "axios"
const ListSelectedProducts = (props) => {
  const [products, setProducts] = useState();
  
  const getLatest = async () => {
    await axios.post("http://localhost:5000/api/v1/users/getlatestproduct")
      .then((res) => setProducts(res.data.Latest));
  };
  const getFandom=async()=>{
    await axios.post("http://localhost:5000/api/v1/users/getfandom")
      .then((res) => setProducts(res.data.fandom));
  }
  const getFeatured=async()=>{
    await axios.post("http://localhost:5000/api/v1/users/getfeatured")
      .then((res) => setProducts(res.data.featured));
  }
 
  useEffect(()=>{
    if (props.type === "latest") {
      getLatest();
    }
    if (props.type === "related") {
      getRelated();
    }
    if (props.type === "fandom") {
      getFandom();
    }
    if (props.type === "featured") {
      getFeatured();
    }

    window.scrollTo(0, 0);
  },[])
  return (
    <div className='py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14'>
        <div className='text-sm font-semibold md:text-4xl'>{props.heading?props.heading :"FEATURED PRODUCTS"}</div>
        <div className='text-xsm3 md:text-xl'>Find a Variety of Your Favourite Anime Products</div>
        <div className='w-full text-end text-xsm3 md:text-base'>View All</div>

        <div className=' border-y md:border-y-2 w-full py-2 md:py-6 border-red-600 flex gap-2 md:gap-12 overflow-scroll element-class justify-center'>
            {
                products && products.map((product,index)=><div key={index}><Showcard product={product}/> </div>)
            }

        </div>
      
    </div>
  )
}

export default ListSelectedProducts
