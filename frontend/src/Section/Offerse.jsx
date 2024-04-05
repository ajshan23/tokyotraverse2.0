import React from "react";
import Card from "../components/Card.jsx";
import tshirt from "../assets/blacktshirt.png";
import about from "../assets/about.png";
const Offeres = () => {
  return (
    <div className="pt-[40px] md:px-[120px] w-full flex flex-col justify-center items-center">
      <div className="flex flex-col w-full justify-center items-center relative">
        <div className="font-semibold text-xl md:text-3xl font-lexend pb-6 md:pb-[27px] ">
          OFFERS
        </div>
        <div className="pb-[14px] text-sm md:text-base">
          Find a variety of your favourite anime products
        </div>
        <div className="w-full text-end pb-[12px] px-3 text-sm md:text-base">View All</div>
      </div>
      <div className="border-t  border-[#F01F26] w-full py-3 md:py-[44px] flex flex-col md:flex-row gap-y-2 justify-around items-center">
        <Card img={tshirt}  imageurl="https://res.cloudinary.com/djmvsz8em/image/upload/v1706952825/apqmu3qra1qmcyhspu82.png"/>
        <Card img={tshirt} imageurl="https://res.cloudinary.com/djmvsz8em/image/upload/v1706952825/qkdmqzki8jlf4gv2sop7.png" />
      </div>
      <div className="border-b  border-[#F01F26] pb-[44px]">
      <div>
     <img src="https://res.cloudinary.com/djmvsz8em/image/upload/v1706952825/snsvhraav6sp8mud7vni.png" alt="" />
    </div>
      </div>
      <div className="border-b border-[#F01F26] pb-[44px]">
        <img src="https://res.cloudinary.com/djmvsz8em/image/upload/v1706952825/de4vgzckdg19wxewhjh0.png" alt="" />
      </div>
      <div className="pb-[44px]">

      </div>
    </div>
  );
};

export default Offeres;
