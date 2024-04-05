import React from "react";

const Single = (props) => {
  return (
    <div className="relative w-[236px] flex flex-col ">
      <div className=" flex justify-center">
        <div className="w-[102px] h-[120px] overflow-hidden flex">
          <img
            src={props.img}
            alt=""
            className=" w-full h-full group-hover:scale-105"
          />
        </div>
      </div>
      <div className="heading font-semibold text-sm pt-1 flex justify-center">{props.name}</div>
    </div>
  );
};

export default Single;
