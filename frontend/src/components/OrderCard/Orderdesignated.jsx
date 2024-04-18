import { TfiArrowCircleRight } from "react-icons/tfi";
import moment from "moment";
import { Link } from "react-router-dom";
const Orderdesignated = ({ order }) => {
  const formattedDate = moment(order.updatedAt).format("MM-DD");
  const dateObject = moment(formattedDate, "MM-DD");
  const monthName = dateObject.format("MMMM");
  const day = dateObject.format("DD");
  return (
    <div className="w-full h-fit px-3 py-3 md:px-10 border md:border-2 md:py-4 border-red-600 flex flex-row justify-between items-center  ">
      <div className="flex flex-row gap-4">
        <div className="w-20 h-20">
          <img src={order?.product.image} alt="" />
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="text-xsm3 md:text-xsm5">
            {day}
            {day === 1 ? "st" : day === 2 ? "nd" : "th"} {monthName}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="font-lexend text-xsm6 md:text-base">
              {order.product.name}
            </div>
            <div className="text-xsm4 md:text-xsm5">By ABC Merchandise</div>
          </div>
          <div className={`${order.orderStatus==="cancelled"|| order.orderStatus==="blocked"?"text-red-600":"text-green-600"} font-lexend text-sm md:text-base`}>
            {order.orderStatus}
          </div>
        </div>
      </div>
      <div className="flex w-fit h-fit ">
        <Link  to={`/product/${order.product.productcode}`}>
          <TfiArrowCircleRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Orderdesignated;
