import React from "react";

const Card = (props) => {
  return (
    <div className="w-full h-full md:w-[582px] md:h-[346px] scale-75 md:scale-100 hover:scale-90 md:hover:scale-110 transition-all ease-in-out rounded-xl overflow-hidden " style={{ backgroundImage: `url(${props.imageurl})`, backgroundSize: 'cover', backgroundPosition: 'center',}}>
      <div className={`w-full h-full flex flex-row justify-between`}>
        <div className=" md:w-[50%] flex flex-col py-4 px-3  md:pt-[49px] md:pl-[56px]  text-white">
          <div className="pb-3 md:pb-[25px]">
            <div className="px-1 py-1  text-base md:text-lg w-fit font-bold bg-[#F01F26]">
              NEW ARRIVAL
            </div>
          </div>
          <div className="font-semibold text-2xl md:pb-[25px]">Monkey D. RUffy Shirt - Navy / S</div>
          <div className= "mb-2 md:pb-[28px]">only on   $169</div>
          <div className="md:w-[183px] md:h-[50px]">
            <button className=" px-3 py-2 md:px-[36px] md:py-[14px] text-base md:text-xl font-semibold bg-[#F01F26] rounded">
              CHECKOUT
            </button>
          </div>
        </div>
        <div className="w-[60%] flex justify-center items-center">
          <img src={props.img} alt="" className=" md:w-[226px] md:h-[209px]" />
        </div>
      </div>
    </div>
  );
};

export default Card;
