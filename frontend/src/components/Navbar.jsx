import React, { useEffect, useState } from 'react'
import { FaHeart, FaList, FaShoppingBag } from "react-icons/fa"
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';
import {useDispatch, useSelector} from "react-redux"
import { loadCart } from '../features/ecomSlice';
import axios from "axios"
const Navbar = () => {

  axios.defaults.withCredentials=true;
    const [isOpen, setIsOpen] = useState(false);
    const cardData=useSelector(state=>state.cart)
    const isLogined =localStorage.getItem("accessToken")
    const dispatch=useDispatch()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchCart = async () => {
    await axios
      .post("http://localhost:5000/api/v1/users/loadcart")
      .then((response) => {
        dispatch(loadCart(response.data.data));
        
      })
      .catch((err) => {
        toast.error("Error occured, please refresh the page");
        console.log(err);
      });
  };
  useEffect(()=>{
    
    if (isLogined) {
      fetchCart()
    }
   
  },[])
  return (
    <div className='flex w-full h-16 lg:h-20 items-center justify-between px-3 lg:px-[120px] font-lexend '>
        <div className='text-lg lg:text-2xl font-semibold flex'>
            <div className='text-red-600'>TOKYO</div>
            <div>TRAVERSE</div>
        </div>
        <div className='flex gap-20 items-center'>
            <ul className='list-none hidden lg:flex gap-5'>
              
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'><Link to="/">Home</Link></li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'><Link to="/allproducts">Products</Link></li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'><Link to="/orders">Orders</Link></li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'><Link to="/about">About</Link></li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'><HLink to="#contact" smooth>Contact</HLink></li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>ENG</li>
            </ul>
            <div className='flex justify-center items-center gap-1 lg:gap-5'>
                <div><Link to="/whishlist"><FaHeart/></Link></div>
                <div className='flex relative'><Link to="/cart"><FaShoppingBag/><div className='absolute px-0.5 -top-2 -right-1 text-xs rounded-full text-white bg-red-600'>{cardData? cardData.length :"0"}</div></Link></div>
                <div className='px-2 py-1 lg:px-7 lg:py-2 border-red-600 border-2 rounded-full'><button><Link to="/login">{isLogined?"Logout":"Login"}</Link></button></div>
            </div>
        </div>
        <div className='flex md:hidden' onClick={toggleMenu}>
            {!isOpen?<FaList/>:<ImCross/>}
        </div>
        <div
        className={`absolute  z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } top-0 -left-20  transition-transform duration-300 ease-in-out bg-white w-64 h-full flex flex-col  items-center `}
      >
        <div className='flex flex-col lg:hidden'>
          <div className=" pt-10 w-full ">
            <ul className='list-none flex flex-col gap-5'>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Home</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Products</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Orders</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>About</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>Contact</li>
                <li className='hover:text-red-600 active:text-red-600 cursor-pointer'>ENG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
