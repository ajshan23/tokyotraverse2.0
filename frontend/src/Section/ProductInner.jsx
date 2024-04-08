import React, { useState } from "react";
import tshirt from "../assets/tshirt.png";
import { FaStar } from "react-icons/fa";
const ProductInner = ({product}) => {
    const [quantity,setQuanitiy]=useState(1)
    const handleIncrease=()=>{
        quantity<5 &&setQuanitiy(quantity+1)
    }
    const handleDecrease=()=>{
        quantity>1 &&setQuanitiy(quantity-1)
    }
  return (
    <div className="flex w-full h-full justify-center items-center px-3 md:px-[120px]">
      <div className="flex w-full  flex-col md:flex-row border-red-600 border-b md:border-b-2 py-3 md:py-10 ">
        <div className="w-full md:w-96 h-full flex flex-col md:border-r-2 border-red-600">
          <img src={product?.image} alt="" className="h-full w-full md:w-auto md:h-auto" />
          <div className="w-full h-full flex flex-row justify-center gap-4">
            <img src={product?.image} alt="" className="w-20 h-20 border-x md:border-x-2 border-red-600"/>
            <img src={product?.image} alt="" className="w-20 h-20 border-x md:border-x-2 border-red-600"/>
            <img src={product?.image} alt="" className="w-20 h-20 border-x md:border-x-2 border-red-600"/>
          </div>
        </div>
        <div className="w-full h-full md:pl-10 flex flex-col justify-evenly gap-3 items-start ">
            <div className="font-lexend text-2xl">{product?.name}</div>

            <div className="md:pl-3 text-xsm5 md:text-base">
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, debitis!</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, debitis!</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, debitis!</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, debitis!</li>
            </div>
            <div className="flex flex-row gap-12 ">
                    <div className="flex flex-col gap-3">
                        <div className="font-bold">Product Code</div>
                        <div className="font-semibold">{product?.productcode}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>Quantity</div>
                        <div className="flex flex-row gap-2 items-center text-xl">
                            <button onClick={handleIncrease} className="px-6 py-2 rounded-sm text-red-600 border-2 border-red-600 active:bg-red-600 active:text-white cursor-pointer transition-all ease-in-out">+</button>
                            <div>{quantity}</div>
                            <button onClick={handleDecrease} className="px-6 py-2 rounded-sm text-red-600 border-2 border-red-600 active:bg-red-600 active:text-white cursor-pointer transition-all ease-in-out">-</button>
                        </div>
                    </div>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex items-center justify-center gap-3">
                    <div className="font-lexend font-bold text-3xl"> ${product?.price}</div>
                    <div className="flex items-center justify-center py-1 px-2 rounded-full bg-[#f3d431] text-white gap-2">
                        <FaStar/>
                        <div>4.5</div>
                    </div>
                </div>
                <div className="text-sm text-red-600">Note:Custom printing & sizes available .Call for details.</div>
                <div className="text-sm text-slate-500">Free delivery</div>
            </div>

            <div className="flex justify-start items-center w-full  md:items-start">
                    <div className="text-red-600 px-10 py-4 border-2 border-red-600 rounded-sm active:bg-red-600 active:text-white cursor-pointer transition-all ease-in-out">
                        Add To Bag
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInner;
