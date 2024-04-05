import React from "react";
import samples from "../../assets/samples.png";
import { FaStar } from "react-icons/fa";
const Showcard = () => {
  return (
    <div className="w-20 md:w-[236px] h-fit">
      <div className="relative group w-fit h-fit overflow-hidden">
        <img src={samples} alt="" className="w-20 h-24  md:w-[236px] md:h-[276px] flex  " />
        <div className="absolute bottom-0 w-full h-6 md:h-11 text-xsm3 md:text-lg font-medium font-lexend flex justify-center items-center bg-red-600 text-white translate-y-full group-hover:translate-y-0 transition-all ease-in-out duration-300 cursor-pointer">
          Add To Bag
        </div>
      </div>
      <div className="w-fit h-full flex flex-col md:gap-2 py-2 px-4 ">
        <div className="font-semibold text-xsm5 md:text-xl ">Heading</div>
        <div className="w-full md:w-[236px] text-xsm2 md:text-sm flex flex-col gap-1">
            <div className="flex text-yellow-400"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
            <div>$999</div>
        </div>
        
      </div>
    </div>
  );
};

export default Showcard;