import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci"
import toast from "react-hot-toast";
import axios from "axios"
import {loadCart} from "../features/ecomSlice.js"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
const ProductInner = ({product}) => {

    const [quantity,setQuanitiy]=useState(1)
    const [liked,setLiked]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    axios.defaults.withCredentials=true;
    const handleIncrease=()=>{
        quantity<5 &&setQuanitiy(quantity+1)
    }
    const handleDecrease=()=>{
        quantity>1 &&setQuanitiy(quantity-1)
    }

    const handleSubmit=async()=>{
      
      if (!localStorage.getItem("accessToken")) {
        navigate("/login")
        return
      }
      await axios.post("http://localhost:5000/api/v1/users/createcart",{
        
        productId:product._id,
        quantity:quantity
       }).catch((err)=>console.log(err))
       await axios.post("http://localhost:5000/api/v1/users/loadcart")
        .then((response) => dispatch(loadCart(response.data.data)))
        .catch((err) => console.log(err));
      toast.success("added to cart")
      setQuanitiy(1)
    }

    const handleLike=async()=>{
      if (liked) {
        await axios.post("http://localhost:5000/api/v1/users/removefromwhishlist",{
          productId:product._id
        },{withCredentials:true}).then((response)=>{
          if (response.data.success===true) {
            setLiked(false)
          }else{
            console.log("conceptual error at removing like");
          }
        })
      } else {
        await axios.post("http://localhost:5000/api/v1/users/addtowhishlist",{
          productId:product._id
        },{withCredentials:true}
      ).then((response)=>{
          if (response.data.success===true) {
            setLiked(true)
          }else{
            console.log("conceptual error at adding like");
          }
        })
      }
    }
    const likedOrNot=async()=>{{
      await axios.post("http://localhost:5000/api/v1/users/checkinwhishlist",{
        productId:product._id
      },{withCredentials:true}).then((response)=>{
        if (response.data.success===true) {
          setLiked(true)
        }
      })
    }}
    useEffect(()=>{
      likedOrNot()
      setLiked(false)
      
    },[product._id])

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
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5">
                    <div className="text-red-600 px-10 py-4 border-2 border-red-600 rounded-sm active:bg-red-600 active:text-white cursor-pointer transition-all ease-in-out" onClick={handleSubmit}>
                        Add To Bag
                    </div>
                    <div className="cursor-pointer" onClick={handleLike}> 
                      {liked? <FcLike size={30}/>:<CiHeart size={30} color="red"/>}
                    </div>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInner;
