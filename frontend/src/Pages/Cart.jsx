import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, selectTotalCartAmount, setCart } from "../features/ecomSlice";
import {  useNavigate } from "react-router-dom";
import "../style.css"
import Model from "../components/Model.jsx"
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
const Cart = () => {
   const user=localStorage.getItem("auth-token")
//   const navigate=useNavigate()
  const cart=useSelector(state=>state.cart)
  const cartTotalPrice=useSelector(selectTotalCartAmount)
  
  const [change, setChange] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [showTick, setShowTick] = useState(false);

// console.log(cartTotalPrice);

  
const handleProceed = () => {
  if (cart.length === 0) {
    toast.error("No item selected")
    return null;
  }
  const answer = confirm("Do you want to proceed and buy?");

  if (!answer) {
    return null;
  }
  setShowModel(true);
};
  const handleConfirm = async() => {
    if (address.trim() === "" || phone.trim() === "" || pincode.trim() === "") {
      toast.error("All fields are required");
      return null;
    }
    await fetch("/api/v1/users/finalsubmit",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>res.json())
    .then((data)=>toast.success(data))
    .catch((err)=>{
      console.log(err);
      toast.error("unsuccessfull submition");
      return
    })
    setShowTick(true);
    dispatch(setCart())
  };
  const dispatch=useDispatch()
  const handleRemove=async(item)=>{
    let productId=item.product._id
    let owner=item.owner
    let createdAt=item.createdAt
    // console.log(productId,owner,createdAt)
    await fetch("/api/v1/users/removecart",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({productId:productId,owner:owner,createdAt:createdAt})
    })
    .catch((err)=>console.error(err))
    await fetch("/api/v1/users/loadcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch(loadCart(data?.data)))
        .catch((err) => console.log(err));
  }
  // console.log(cart);
 
  // function findTotal(){
    
  //   for (const item in cart) {
  //     console.log(cart[item].product.price);

  //   }
  // }
  // findTotal()
  

  useEffect(()=>{
    if (!user) {
    //   navigate("/login")
     }
    //  findTotal()
  
    
  },[change, showTick])
  return (
    <Fragment>
    <div className="w-full pb-10 px-2 md:px-[120px] flex flex-col">
      <div className="flex flex-col justify-center items-center pt-[20px]">
        <div className="flex justify-center items-center text-3xl text-bold ">
          YOUR BAG &nbsp;
          <div className="w-7 h-7 rounded-full bg-[#F01F26] flex justify-center items-center text-base text-white">
            {cart.length}
          </div>
        </div>
        <div className="pt-[20px] pb-[25px]">Find Whats In Your Bag</div>
      </div>

      <div className="body flex flex-col md:flex-row  w-full">
        <div className="cartitems md:w-[808px] flex flex-col">
          <div className="h-[1px] w-full md:w-[756px] bg-[#F01F26] mb-4"></div>
       <div className="w-full h-[500px] overflow-y-scroll scroll-container element-class">
       {
          cart && cart.map((item,index)=>(
            <div
            key={index}
            className="w-full p-2 border border-gray-300 rounded-xl shadow-xl grid grid-cols-3 mb-2"
          >
            <div className="col-span-1 my-4">
              <img
                src={item.product.image}
                alt=""
                className="w-36 h-36 rounded-2xl ml-10"
              />
            </div>
            <div className="col-span-2">
              <div className="w-full h-full flex flex-col justify-center">
                <li>Product: {item.product.name}</li>
                <li>Product Code: {item.product.product}</li>
                <li>Category: {item.product.category}</li>
                <li>Price: {item.product.price}</li>
                <div className="mt-4 w-full justify-start">
                  <button
                    className="px-3 py-[2px] border border-gray-600 rounded-full shadow-xl"
                    onClick={()=>handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))
        }
       </div>
        </div>
        <div className="productsummury md:ml-28 w-full flex flex-col">
          <div className="h-[1px] w-full bg-[#F01F26]"></div>
          <div className="w-fullmd: m-3 border border-gray-300 rounded-xl shadow-xl flex flex-col items-center">
            <div className=" font-lexend text-lg md:text-2xl pt-3">
              Price details({cart.length} products)
            </div>
            <div className="w-full pt-3 pl-10 md:text-lg font-lexend text-gray-800">
              Products
            </div>
            <div className="w-full h-36 pt-2 pl-10 text-gray-600 overflow-y-scroll element-class scroll-container">
              {cart &&
                cart.map((item, index) => (
                  <div key={index} className="flex w-full justify-between pr-8">
                    <div>{item.product.name}</div>
                    <div>₹{item.product.price}</div>
                  </div>
                ))}
            </div>
            <div className="flex w-full justify-between pl-10  pr-8 font-bold">
              <div>Total</div>
              <div>₹{cartTotalPrice}</div>
            </div>
            <button
              className="px-10 md:px-24 mt-3 py-2 bg-[#F01F26] text-white font-lexend font-bold text-xl rounded-lg my-3" onClick={handleProceed}
            >
              Proceed to buy
            </button>
          </div>
        </div>
      </div>
    </div>
    <Model
        isvisible={showModel}
        onClose={() => {
          setShowModel(false);
          setAddress("");
          setPhone("");
          setPincode("");
          setShowTick(false);
        }}
      >
        {!showTick ? (
          <div className="p-6 flex flex-col">
            <div className="text-red-600 font-lexend text-2xl flex justify-center mb-6">
              SET YOUR ADDRESS
            </div>
            <div className="flex flex-row justify-center mb-5">
              <div>Phone :</div>
              <div className="ml-3 w-72 h-10 flex justify-center overflow-hidden border-2 rounded-lg border-anju">
                <input
                  type="text"
                  className="outline-none border-none pl-2 w-full"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mb-5">
              <div>Address :</div>
              <div className="ml-3 w-72 h-32 flex justify-start items-start overflow-hidden border-2 rounded-lg border-anju">
                <input
                  type="text"
                  className="outline-none border-none pl-2 w-full"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center mb-10">
              <div>Pincode :</div>
              <div className="ml-3 w-72 h-10 flex justify-center overflow-hidden border-2 rounded-lg border-anju">
                <input
                  type="text"
                  className="outline-none border-none pl-2 w-full"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-5 py-1 bg-[#F01F26] rounded-lg text-white"
                onClick={handleConfirm}
              >
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[400px] bg-white flex flex-col justify-center items-center">
            <div className="mb-10 text-2xl font-semibold flex">
              <div className=" mr-2">TOKYO</div>
              <div className="text-[#F01F26]">TRAVERSE</div>
            </div>
            <div className="mb-10 w-20 h-20 rounded-full bg-[#F01F26] text-white flex justify-center items-center">
              <FaCheckCircle size={60} />
            </div>
            <div className="flex font-mono text-4xl">
              <div className="text-[#F01F26]">"</div>
              <div>ORDER PLACED</div>
              <div className="text-[#F01F26]">"</div>
            </div>
          </div>
        )}
      </Model>
    </Fragment>
  );
};

export default Cart;
