import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard/OrderCard";
import Orderdesignated from "../components/OrderCard/Orderdesignated";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const isLogined=localStorage.getItem("isLogined");
  const navigate=useNavigate()
  const [selected, setSelected] = useState("all");

  const [orderData, setOrderData] = useState([]);
  const [changed,setChanged]=useState()

  const fetchData = async () => {
    await axios
      .post("http://localhost:5000/api/v1/users/getorderlist")
      .then((response) => {
        let aj=[]
        let sh=[]
       response.data.data.forEach(element => {
        element.orderStatus==="cancelled" || element.orderStatus==="delivered" || element.orderStatus==="blocked" ? aj.push(element):sh.push(element)
       });
       setOrderData([...sh,...aj])
      })
      .catch((err) => toast.error("Error occured, please refresh"));
  };

  useEffect(() => {
    if (isLogined) {
      fetchData()
    } else {
      navigate("/")
    }
   
  }, [changed,selected,isLogined]);
  return (
    <div className="w-full py-10  flex flex-col justify-center items-center px-2 md:px-[120px] gap-10">
      <div className="text-center flex flex-col gap-3">
        <div className="font-lexend text-2xl md:text-5xl">Orders</div>
        <div className="font-mono text-sm md:text-base text-slate-700">
          Find Whats In Your Bag
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center ">
          <div className="flex flex-row gap-2  text-xsm4 md:text-base">
            <div
              className={`px-10 py-.5  border border-red-600 rounded-sm flex  ${
                selected === "all" && "bg-red-600 text-white"
              } justify-center cursor-pointer items-center`}
              onClick={() => setSelected("all")}
            >
              All
            </div>
            <div
              className={`px-6 py-.5  border border-red-600 rounded-sm flex ${
                selected === "processing" && "bg-red-600 text-white"
              } justify-center cursor-pointer items-center`}
              onClick={() => setSelected("processing")}
            >
              Processing
            </div>
            <div
              className={`px-6 py-.5  border border-red-600 rounded-sm flex ${
                selected === "shipped" && "bg-red-600 text-white"
              } justify-center cursor-pointer items-center`}
              onClick={() => setSelected("shipped")}
            >
              Shipped
            </div>
          </div>
          <div className="flex flex-row gap-2 text-xsm4 md:text-base">
            <div
              className={`px-6 py-.5  border border-red-600 rounded-sm flex ${
                selected === "delivered" && "bg-red-600 text-white"
              } justify-center cursor-pointer items-center`}
              onClick={() => setSelected("delivered")}
            >
              Delivered
            </div>
            <div
              className={`px-6 py-.5  border border-red-600 rounded-sm flex ${
                selected === "cancelled" && "bg-red-600 text-white"
              } justify-center cursor-pointer items-center`}
              onClick={() => setSelected("cancelled")}
            >
              Cancelled
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 md:gap-5">
        {orderData &&
          orderData.map((order,index) => {
           return order.orderStatus==="cancelled" || order.orderStatus==="delivered" || order.orderStatus==="blocked" ?<Orderdesignated order={order} key={index}/>:<OrderCard key={index} order={order} setChanged={setChanged}/>
          })}

        
      </div>
    </div>
  );
};

export default Orders;
