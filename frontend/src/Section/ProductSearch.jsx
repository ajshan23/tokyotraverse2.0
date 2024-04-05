import React, { useState } from 'react'
import bg from "../assets/avatarback.png";
import {FaSearch} from "react-icons/fa";
import pic from "../assets/grouppic.png";
const ProductSearch = () => {
    const [searchItem,setSearchItem]=useState("")
    const handleClick=()=>{}
  return (
    <div
        className="aboutavatar w-full h-40 md:h-[260px] "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        <div className=" w-full h-full flex  bg-[#F01F26] bg-opacity-80">
          <div className=" w-full h-full pl-8 pr-2 md:px-[120px] pb-6 flex flex-row font-lexend text-sm md:text-4xl font-bold text-white">
            <div className=" flex flex-col w-96 pt-5  md:w-[50%] justify-center items-start">
              <div className="border-2 border-white font-normal text-base w-[170px] md:w-[370px] h-10 rounded flex flex-row">
                <input
                  type="text"
                  className="pl-2 md:pl-5 w-full outline-none border-none bg-transparent placeholder:text-white placeholder:opacity-75  placeholder:text-xsm5 text-white"
                  placeholder="Search By Anime, Character, Size...."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <button onClick={handleClick} className='px-2'>
                  <FaSearch color="white" className="" />
                </button>
              </div>
              <div className="font-mono pt-1 md:pt-3 font-bold">
                ELEVATE YOUR ANIME OBSESSION WITH PREMIUM MERCHANDISE AND
                COLLECTIBLES!
              </div>
            </div>
            <div className="   w-full md:pl-96">
              <img src={pic} alt="" className=" pt-14  md:pt-0 md:w-[450px] " />
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductSearch
