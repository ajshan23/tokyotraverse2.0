import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  selectTotalCartAmount,
  setCart,
} from "../features/ecomSlice";
import { useNavigate } from "react-router-dom";
import "../style.css";
import Popup from "reactjs-popup";
import { RxCrossCircled } from "react-icons/rx";
import "reactjs-popup/dist/index.css";
import toast from "react-hot-toast";

import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const Cart = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("accessToken");

  const cart = useSelector((state) => state.cart);
  const cartTotalPrice = useSelector(selectTotalCartAmount);

  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState({
    productId: "",
    state: false,
  });
  const [showModel, setShowModel] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [showTick, setShowTick] = useState(false);
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  // console.log(cartTotalPrice);

  const handleProceed = () => {
    if (cart.length === 0) {
      toast.error("No item selected");
      return null;
    }
    const answer = confirm("Do you want to proceed and buy?");

    if (!answer) {
      return null;
    }
    setShowModel(true);
  };
  const handleConfirm = async (e, close) => {
    e.preventDefault();
    if (address.trim() === "" || phone.trim() === "" || pincode.trim() === "") {
      toast.error("All fields are required");
      return null;
    }

    if (pincode.length > 6) {
      toast.error("Enter valid pincode");
      setPincode("");
      return null;
    }

    await axios
      .post("http://localhost:5000/api/v1/users/finalsubmit", {
        address: address,
        phoneNumber: phone,
        pincode: pincode,
      })
      .then((response) => {
        if (response.data.success === true) {
          close();
          fetchCart();
          setAddress("");
          setPhone("");
          setPincode("");
          toast.success("Purchase successfull");
        }
      })
      .catch((err) => {
        console.log(err);
        close();
        toast.error("unsuccessfull submition");
        setAddress("");
        setPhone("");
        setPincode("");
        return;
      });
  };

  const handleRemove = async (item) => {
    console.log(item);
    let productId = item.product._id;

    setLoading({
      productId: productId,
      state: true,
    });
    await axios
      .post("http://localhost:5000/api/v1/users/removecart", {
        productId: productId,
      })
      .then((response) => {
        if (response.data.success === true) {
          fetchCart();
          setLoading({
            productId: "",
            state: false,
          });
        } else {
          setLoading({
            productId: "",
            state: false,
          });

          toast.error("Error occured, please refresh the page");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAdd = async (item) => {
    let productId = item.product._id;
    setLoading({
      productId: productId,
      state: true,
    });
    await axios
      .post("http://localhost:5000/api/v1/users/createcart", {
        productId: productId,
        quantity: 1,
      })
      .then((response) => {
        if (response.data.success === true) {
          fetchCart();
          setLoading({
            productId: "",
            state: false,
          });
        } else {
          toast.error("Error occured, please refresh the page");
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchCart = async () => {
    await axios
      .post("http://localhost:5000/api/v1/users/loadcart")
      .then((response) => {
        dispatch(loadCart(response.data.data));
      })
      .catch((err) => {
        toast.error("Error occured, please refresh the page");
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    fetchCart();
  }, [change, showTick]);
  return (
    <div className="w-full pb-10 px-2 md:px-[120px] flex flex-col">
      <div className="flex flex-col justify-center items-center pt-[20px]">
        <div className="flex justify-center items-center text-3xl text-bold ">
          YOUR BAG &nbsp;
          <div className="w-7 h-7 rounded-full bg-[#F01F26] flex justify-center items-center text-base text-white">
            {cart.length}
          </div>
        </div>
        <div className="pt-[20px] pb-[25px]">Find Whats In Your Bag</div>
      </div>

      <div className="body flex flex-col md:flex-row  w-full">
        <div className="cartitems md:w-[808px] flex flex-col">
          <div className="h-[1px] w-full md:w-[756px] bg-[#F01F26] mb-4"></div>
          <div className="w-full h-[500px] overflow-y-scroll scroll-container element-class">
            {cart &&
              cart.map((item, index) => (
                <div
                  key={index}
                  className="w-full p-2 border border-gray-300 rounded-xl shadow-xl grid grid-cols-3 mb-2"
                >
                  <div className="col-span-1 my-4">
                    <img
                      src={item.product.image}
                      alt=""
                      className="scale-75 md:scale-100 w-36 h-36 rounded-2xl md:ml-10"
                    />
                  </div>
                  <div className="text-sm md:text-base col-span-2">
                    <div className="w-full h-full flex flex-col justify-center">
                      <li>Product: {item.product.name}</li>
                      <li>Product Code: {item.product.productcode}</li>
                      <li>Category: {item.product.category}</li>
                      <li>Price: {item.product.price}</li>
                      <div className="mt-4 w-full flex flex-row gap-1 items-center">
                        <button
                          className=" rounded-full "
                          onClick={() => handleRemove(item)}
                          disabled={loading.state === true}
                        >
                          <CiCircleMinus size={24} />
                        </button>
                        <div>
                          {loading.productId === item.product._id &&
                          loading.state === true ? (
                            <ClipLoader size={10} color="red" />
                          ) : (
                            item?.quantity
                          )}
                        </div>
                        <button
                          className=" rounded-full "
                          onClick={() => handleAdd(item)}
                          disabled={loading.state === true}
                        >
                          <CiCirclePlus size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className=" productsummury  md:ml-28 w-full flex flex-col">
          <div className="h-[1px] w-full bg-[#F01F26]"></div>
          <div className="w-fullmd: m-3 border border-gray-300 rounded-xl shadow-xl flex flex-col items-center">
            <div className=" font-lexend text-lg md:text-2xl pt-3">
              Price details({cart.length} products)
            </div>
            <div className="w-full pt-3 pl-10 md:text-lg font-lexend text-gray-800">
              Products
            </div>
            <div className="text-sm md:text-base w-full h-36 pt-2 pl-10 text-gray-600 overflow-y-scroll element-class scroll-container">
              {cart &&
                cart.map((item, index) => (
                  <div key={index} className="flex w-full justify-between pr-8">
                    <div>{item.product.name}</div>
                    <div>₹{item.product.price}</div>
                  </div>
                ))}
            </div>
            <div className="flex w-full justify-between pl-10  pr-8 font-bold">
              <div>Total</div>
              <div>₹{cartTotalPrice}</div>
            </div>

            {cart.length === 0 ? (
              <button className="px-10 md:px-24 mt-3 py-2 bg-[#F01F26] text-white font-lexend font-bold text-xl rounded-lg my-3" onClick={()=>toast.error("cart is empty")}>
                Proceed to Buy
              </button>
            ) : (
              <Popup
                trigger={
                  <button className="px-10 md:px-24 mt-3 py-2 bg-[#F01F26] text-white font-lexend font-bold text-xl rounded-lg my-3">
                    Proceed to Buy
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="border-red-600 border-2 flex flex-row   p-4 w-full justify-between">
                    <div className=" flex flex-col  gap-8 ">
                      <div className="text-lg md:text-2xl">Add address</div>
                      <form
                        onSubmit={(e) => handleConfirm(e, close)}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3">
                          <div className="font-bold font-mono">Phone:</div>
                          <input
                            name="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3">
                          <div className="font-bold font-mono">
                            Place Address:
                          </div>
                          <textarea
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3">
                          <div className="font-bold font-mono">PinCode:</div>
                          <input
                            name="phone"
                            type="number"
                            value={pincode}
                            maxLength={6}
                            onChange={(e) => {
                              setPincode(e.target.value);
                            }}
                          />
                        </div>
                        <div className="px-5 py-2 w-fit rounded-lg bg-red-600 text-white">
                          <button onClick={(e) => handleConfirm(e, close)}>
                            Confirm order
                          </button>
                        </div>
                      </form>
                    </div>
                    <div onClick={() => close()} className="cursor-pointer">
                      X
                    </div>
                  </div>
                )}
              </Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
