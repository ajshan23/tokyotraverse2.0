import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import pic from "../assets/blacktshirt.png";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
const OrderList = () => {
  const [orderData, setOrderDta] = useState([]);
  const [status, setStatus] = useState("processing");
  console.log(status);
  const fetchData = async () => {
    await axios
      .post("http://localhost:5000/api/v1/admin/getorderlist")
      .then((response) => {
        console.log(response.data.data);
        setOrderDta(response.data.data);
      }).catch((err)=>console.log(err))
      .finally(()=>fetchData())
  };

  const handleBlock = async (order) => {
    await axios
      .post("http://localhost:5000/api/v1/admin/blockorder", {
        orderId: order._id,
      })
      .then((response) =>
        response.data.success
          ? toast.success("blocked the order")
          : toast.error("Blocking order failed")
      ).finally(()=>fetchData())
  };

  const handleUpdate = async (order, close) => {
    await axios
      .post("http://localhost:5000/api/v1/admin/updateorder", {
        updateCategory: status,
        orderId: order._id,
      })
      .then((response) => {
        close();
        if (response.data.success) {
          toast.success("updated successfully");
        } else {
          toast.error("updation unsuccessfull,refresh the page");
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" h-screen w-full flex justify-center items-start p-10 bg-slate-300 overflow-y-scroll">
      <div className="scale-95 p-10 rounded bg-white ">
        <table className="scale-95 table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="">
              <th className=" w-20 px-10  py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product IMage
              </th>
              <th className="w-20  px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username & UserId
              </th>

              <th className="w-20  px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Code
              </th>
              <th className="w-20  px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="w-20  px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className=" py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Status
              </th>
              <th className="w-20  px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Block Order
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderData &&
              orderData.map((order, index) => (
                <tr className="text-center" key={index}>
                  <td className="w-20 px-6 py-4 whitespace-nowrap">
                    <img src={order?.product?.image} alt="" />
                  </td>
                  <td className="w-20  px-10 py-4">
                    {order?.owner?.username} {order?.owner?._id}
                  </td>
                  <td className="w-20  px-10 py-4 ">
                    {order?.product?.productcode}
                  </td>
                  <td className="w-20  px-10 py-4 ">{order?.quantity}</td>
                  <td className="w-20  px-10 py-4 ">{order?._id}</td>
                  <td className="w-20  px-10 py-4 ">
                    {order.orderStatus === "blocked"|| order.orderStatus==="cancelled" ? (
                      <div>{order.orderStatus}</div>
                    ) : (
                      <Popup
                        trigger={<button> {order?.orderStatus} </button>}
                        modal
                        nested
                        onOpen={()=>setStatus(order.orderStatus)}
                        onClose={()=>setStatus("processing")}
                      >
                        {(close) => (
                          <div className="border-red-600 border-2 flex justify-between p-4">
                            <div className="flex flex-col justify-center items-center gap-5">
                              <div className="text-3xl text-red-500 font-semibold pb-6">
                                Update Status
                              </div>
                              <div className="flex flex-row gap-5">
                                <div>
                                  <img
                                    src={order?.product?.image}
                                    alt=""
                                    className="w-20 h-auto"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">place:</div>
                                    <pre>{order?.address}</pre>
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Pincode:</div>
                                    {order?.pincode}
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Phone:</div>
                                    {order?.phoneNumber}
                                  </h1>
                                </div>
                              </div>
                              <div>
                                <select

                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  className="border-red-600 border-2 text-red-600 outline-none px-2 py-1 rounded-md"
                                >
                                  <option type="text" value="processing">
                                    Processing
                                  </option>
                                  <option type="text" value="shipped">
                                    Shipped
                                  </option>
                                  <option type="text" value="delivered">
                                    Delivered
                                  </option>
                                  <option type="text" value="cancelled">
                                    Cancelled
                                  </option>
                                </select>
                              </div>
                              <div>
                                <button
                                  onClick={() => handleUpdate(order, close)}
                                  className="px-2 py-1 rounded-lg bg-red-600 text-white active:bg-white active:text-red-600 "
                                >
                                  Update 
                                </button>
                              </div>
                            </div>

                            <div>
                              <button
                                onClick={() => close()}
                                className="px-2 py-1 rounded-lg border-red-600 border-2 "
                              >
                                close
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    )}
                  </td>
                  <td className="w-20  px-10 py-4  cursor-pointer rotate-45">
                    {order.orderStatus !== "blocked" && (
                      <Popup trigger={<button> + </button>} modal nested>
                        {(close) => (
                          <div className="border-red-600 border-2 flex justify-between p-4">
                            <div className="flex flex-col justify-center items-center gap-5">
                              <div className="text-3xl text-red-500 font-semibold pb-6">
                                Do you want to delete?{" "}
                              </div>
                              <div className="flex flex-row gap-5">
                                <div>
                                  <img
                                    src={pic}
                                    alt=""
                                    className="w-20 h-auto"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Name:</div>
                                    {order?.product?.name}
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Category:</div>
                                    {order?.product?.category}
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Price:</div>
                                    {order?.product?.price}$
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">Quantity:</div>
                                    {order?.quantity}
                                  </h1>
                                  <h1 className="flex gap-1">
                                    <div className="font-bold">
                                      Total Price:
                                    </div>
                                    {order?.quantity * order?.product?.price}
                                  </h1>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="px-5 py-2 rounded-lg bg-red-600 text-white active:border-2 active:border-red-600 active:text-red-600 active:bg-white cursor-pointer"
                                  onClick={() => handleBlock(order)}
                                >
                                  Block Order
                                </button>
                              </div>
                            </div>

                            <div>
                              <button
                                onClick={() => close()}
                                className="px-2 py-1 rounded-lg border-red-600 border-2 "
                              >
                                close
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
