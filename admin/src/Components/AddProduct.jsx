import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { PacmanLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast"
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "naruto",
    price: "",
    product_code: "",
    stock:0,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const addProduct = async () => {
    if (
      [
        product.name,
        product.category,
        product.price,
        product.product_code,
      ].some((field) => field.trim() === "")
    ) {
      alert("all fields are required");
      return null;
    }
    if (!image) {
      alert("image required");
      return null;
    }
    if (image.type !== "image/png") {
      alert("choose png image only");
      return null;
    }
    let responseData;
    setAnimate(true);
    let formData = new FormData();
    formData.append("product", image);
    formData.append("productcode", product.product_code);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("name", product.name);
    formData.append("stock", product.stock);

    await axios
      .post("http://localhost:5000/api/v1/admin/addproduct", formData)
      .then((response) => {
        responseData = response.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error("product allready exists on this product code");
          setAnimate(false);
          setProduct({
            name: "",
            category: "naruto",
            price: "",
            product_code: "",
            stock:0,
          });
          return null;
        }
        if (error.response.status === 401) {
          toast.error("product creation failed");
          setAnimate(false);
          setProduct({
            name: "",
            category: "naruto",
            price: "",
            product_code: "",
            stock:0,
          });
          return null;
        }
      });
    setAnimate(false);
    setProduct({
      name: "",
      category: "naruto",
      price: "",
      product_code: "",
    });
    console.log(responseData);
    if (responseData.success==true) {
      toast.success("product added successfully");
    }
  };
  return (
    <div className=" h-screen w-full flex justify-center items-start p-10 bg-slate-300 overflow-y-scroll">
      <div className=" p-10 rounded bg-white ">
        <div className="box-border w-[800px] max-w-[800px] px-[30px] py-[30px]">
          {animate ? (
            <PacmanLoader />
          ) : (
            <div className="flex flex-col gap-7">
              <div className="itemfield">
                <p>Product Title</p>
                <div className="border-[#7b7b7b] border-2 px-4 w-fit py-1.5 rounded-md  ">
                  <input
                    type="text"
                    name="name"
                    placeholder="Type here"
                    value={product.name}
                    onChange={changeHandler}
                    className="h-full w-full border-none outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="itemfield">
                  <p>Price</p>
                  <div className="border-[#7b7b7b] border-2 px-4 w-fit py-1.5 rounded-md  ">
                    <input
                      type="number"
                      name="price"
                      placeholder="Type here"
                      value={product.price}
                      onChange={changeHandler}
                      className="h-full w-full border-none outline-none"
                    />
                  </div>
                </div>
                <div className="itemfield">
                  <p>Product Code</p>
                  <div className="border-[#7b7b7b] border-2 px-4 w-fit py-1.5 rounded-md  ">
                    <input
                      type="number"
                      name="product_code"
                      placeholder="Type here"
                      value={product.product_code}
                      onChange={changeHandler}
                      className="h-full w-full border-none outline-none"
                    />
                  </div>
                </div>
                <div className="itemfield">
                  <p>Stock Available</p>
                  <div className="border-[#7b7b7b] border-2 px-4 w-fit py-1.5 rounded-md  ">
                    <input
                      type="number"
                      name="stock"
                      placeholder="Type here"
                      value={product.stock}
                      onChange={changeHandler}
                      className="h-full w-full border-none outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Product Category</p>
                <select
                  name="category"
                  className="px-3 h-[50px] text-sm text-[#7b7b7b] border-[#7b7b7b] rounded-md w-fit border-2 outline-none"
                  value={product.category}
                  onChange={changeHandler}
                >
                  <option value="naruto">Naruto</option>
                  <option value="aot">Attack On Titan</option>
                  <option value="demonslayer">Demon Slayer</option>
                  <option value="onepiece">One Piece</option>
                  <option value="dragonballz">DragonBall Z</option>
                </select>
              </div>
              <div className="itemfield">
                <label htmlFor="file-input">
                  <img
                    src={image ? URL.createObjectURL(image) : upload_area}
                    className="h-[120px] w-[120px] rounded-lg"
                    alt=""
                  />
                </label>
                <input
                  onChange={imageHandler}
                  type="file"
                  name="image"
                  id="file-input"
                  hidden
                />
              </div>
              <button
                className="w-[160px] h-[50px] rounded-sm bg-[#6079ff] border-none cursor-pointer text-white text-xl font-semibold"
                onClick={() => addProduct()}
              >
                ADD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
