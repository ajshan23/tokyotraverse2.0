import React from "react";

const Model = ({ isvisible,onClose,children }) => {
  if (!isvisible) return null;
  const handleClose=(e)=>{
    if (e.target.id==="wrapper") {
        onClose()
    }
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    flex justify-center items-center" onClick={handleClose} id="wrapper"
    >
      <div className="w-full p-1 md:p-0 md:w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={()=>onClose()}>X</button>
        <div className="bg-white border border-gray-600 shadow-xl p-2 rounded-xl">{children}</div>
      </div>
    </div>
  );
};

export default Model;
