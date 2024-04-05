import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import {PacmanLoader} from "react-spinners"
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "naruto",
    price: "",
    product_code: "",
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
      ].some((elem) => elem.trim() === "")
    ) {
      alert("all fields are required");
      return null;
    }
    if (!image) {
      alert("image required");
      return null;
    }
    console.log(product);

    let responseData;
    setAnimate(true);
    let formData = new FormData();
    formData.append("product", image);
    formData.append("productcode", product.product_code);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("name", product.name);

    await fetch("http://localhost:4000/api/v1/admin/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (responseData = data))
      .catch((err) => alert("product code must be unique"));
    setAnimate(false);
    setProduct({
      name: "",
      category: "naruto",
      price: "",
      product_code: "",
    });
    if (!responseData.success) {
      alert("product creation failed,product code must be unique");
      return null;
    }
    alert("product added successfully");
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
