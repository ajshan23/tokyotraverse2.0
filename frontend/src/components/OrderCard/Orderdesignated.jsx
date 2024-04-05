import pic from "../../assets/samples.png";
import { FaStar } from "react-icons/fa";
import { TfiArrowCircleRight } from "react-icons/tfi";
const Orderdesignated = () => {
  return (
    <div className='w-full h-fit px-3 py-3 md:px-10 border md:border-2 md:py-4 border-red-600 flex flex-row justify-between items-center  '>
      <div className="flex flex-row gap-4">
        <div className="w-20 h-20">
            <img src={pic} alt="" />
        </div>
        <div className="flex flex-col justify-evenly">
            <div className="text-xsm3 md:text-xsm5">
                24th november
            </div>
            <div className="flex flex-col gap-0.5">
                <div className="font-lexend text-xsm6 md:text-base">Demon Slayer Designer T-shirt</div>
                <div className="text-xsm4 md:text-xsm5">By ABC Merchandise</div>
            </div>
            <div className="text-red-600 font-lexend text-sm md:text-base">Cancelled</div>
        </div>
      </div>
      <div className="flex w-full h-full "><TfiArrowCircleRight size={16}/></div>
    </div>
  )
}

export default Orderdesignated
