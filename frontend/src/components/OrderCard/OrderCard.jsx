import React from "react";
import pic from "../../assets/samples.png";
import { FaStar } from "react-icons/fa";
import { TfiArrowCircleRight } from "react-icons/tfi";
const OrderCard = ({order}) => {
  return (
    <div className="w-full text-xsm3 md:text-base border-y md:border-y-2 flex flex-row py-1 md:py-4 border-red-600 gap-3 items-center">
      <div className="w-20 h-20 md:w-44 md:h-52 ">
        <img src={pic} alt="" className="w-full h-full" />
      </div>
      <div className="h-20 md:h-52 w-0.5 bg-red-600" />
      <div className="flex w-full bg-red- flex-row gap-8 md:gap-[500px]  items-center">
        <div className="flex flex-col gap-3 md:gap-12 justify-center items-start ">
          <div>
            <div className="font-lexend text-xsm5 md:text-xl">
              Demon Slayer Designer T-shirt
            </div>
            <div>By ABC Merchandise</div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Colour:</div>
                <div>Black</div>
              </div>
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Size:</div>
                <div>5</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Product code:</div>
                <div>12345678</div>
              </div>
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Quality:</div>
                <div>1</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="font-semibold gap-1">Order total:</div>
            <div className="flex gap-1">
              {" "}
              <div>$1,596.34</div>
              <div className="flex bg-yellow-400 px-2 text-white justify-center items-center gap-1 rounded-full">
                <FaStar />
                4.5
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full justify-around gap-5 md:gap-10 ">
        <div>
                <div className="px-5 md:px-10 py-1 md:py-2  border md:border-2 text-green-600 border-green-600 w-fit">Shipped</div>
            </div>
          <div className="flex justify- items-center gap-1">
           
            <div>Order ID:</div>
            <div className="font-semibold">23456789</div>
            <div className="hidden md:flex"><TfiArrowCircleRight size={25} color="red"/></div>
            <div className="md:hidden"><TfiArrowCircleRight size={15} color="red"/></div>
          </div>
          <div className=" border md:border-2 border-red-600 text-red-600 justify-center items-center w-fit">
            <button className="px-4 py-2 w-full h-full">Cancel Order</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
