import React from "react";
import pic from "../../assets/samples.png";
import { FaStar } from "react-icons/fa";
import { TfiArrowCircleRight } from "react-icons/tfi";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const OrderCard = ({ order, setChanged }) => {
  const handleOrder = async () => {
    let confirmed = confirm(
      `do you want to cancel the order with order id ${order._id}`
    );
    if (!confirmed) {
      return;
    }
    await axios
      .post("http://localhost:5000/api/v1/users/cancelorder", {
        orderId: order?._id,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Order cancellation successfull");
          setChanged(Math.random() * 10);
        } else {
          toast.error("Order cancellation failed");
          console.log("else executed");
        }
      })
      .catch((error) => {
        toast.error("Order cancellation failed");
        console.log("error at catch", error);
      });
  };
  return (
    <div className="w-full text-xsm3 md:text-base border-y md:border-y-2 flex flex-row  py-1 md:py-4 border-red-600 gap-3">
      <div className="w-20 h-20 md:w-44 md:h-52 ">
        <img src={order?.product.image} alt="" className="w-full h-full" />
      </div>
      <div className="h-20 md:h-52 w-0.5 bg-red-600" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3 md:gap-12 justify-center items-start ">
          <div>
            <div className="font-lexend text-xsm5 md:text-xl">
              {order?.product.name}
            </div>
            <div>By ABC Merchandise</div>
          </div>
          <div className="flex flex-row gap-4">
            {/* <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Colour:</div>
                <div>Black</div>
              </div>
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Size:</div>
                <div>5</div>
              </div>
            </div> */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Quantity:</div>
                <div>{order?.quantity}</div>
              </div>
              <div className="flex flex-row gap-1">
                <div className="font-semibold">Product code:</div>
                <div>{order?.product.productcode}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="font-semibold gap-1">Order total:</div>
            <div className="flex gap-1">
              {" "}
              <div>
                ${(order.product.price * order.quantity).toLocaleString()}
              </div>
              <div className="flex bg-yellow-400 w-fit h-fit px-2 text-white justify-center items-center gap-1 rounded-full">
                <FaStar />
                4.5
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  h-full justify-around items-center gap-5 md:gap-10 ">
          <div>
            <div className="px-5 md:px-10 py-1 md:py-2  border md:border-2 text-green-600 border-green-600 w-fit">
              {order?.orderStatus}
            </div>
          </div>
          <div className="flex justify- items-center gap-1">
            <div>Order ID:</div>
            <div className="font-semibold">{order._id}</div>
            <Link
              to={`/product/${order.product.productcode}`}
              state={order.product}
            >
              <div className="hidden md:flex">
                <TfiArrowCircleRight size={25} color="red" />
              </div>
              <div className="md:hidden">
                <TfiArrowCircleRight size={15} color="red" />
              </div>
            </Link>
          </div>
          <div className=" border md:border-2 border-red-600 text-red-600 justify-center items-center w-fit">
            <button
              className="px-4 py-2 w-full h-full active:bg-red-600 active:text-white"
              onClick={handleOrder}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
