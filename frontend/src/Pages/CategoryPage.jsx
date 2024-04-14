import React, { useEffect, useState } from "react";
import Showcard from "../components/ShowCard/Showcard";
import bg from "../assets/avatarback.png";
import { FaSearch } from "react-icons/fa";
import pic from "../assets/naruto.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const CategoryPage = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:5000/api/v1/users/category", {
        category: props.tag,
      })
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div
        className="aboutavatar w-full h-40 md:h-[260px] "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" w-full h-full flex  bg-[#F01F26] bg-opacity-80">
          <div className=" w-full h-full pl-6 pr-2 md:pr-2 md:pl-8 md:px-[120px] pb-6 flex flex-row gap-10 md:gap-0 font-lexend text-sm md:text-4xl font-bold text-white">
            <div className=" bg-yellow- flex justify-center  w-full ">
              <img
                src={props.img}
                alt=""
                className=" w-28 md:w-60 h-auto pt-4  md:pt-0  "
              />
            </div>
            <div className=" flex flex-col pt-5 justify-center">
              <div className="font-mono pt-1 md:pt-3 font-bold uppercase">
                Naruto is a Japanese manga series written and illustrated by
                Masashi Kishimoto. It tells the story of Naruto Uzumaki
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14">
        <div className="text-sm font-semibold md:text-4xl">
          {props.name ? props.name : "FEATURED PRODUCTS"}
        </div>
        <div className="text-xsm3 md:text-xl">
          Find a Variety of Your Favourite Anime Products
        </div>
        <div className="py-2">
          <select className="px-1 md:px-3 py-1 md:py-2 border outline-none md:border-2 rounded-lg border-red-600 text-center text-xsm4 md:text-base text-red-600">
            <option value="">Filter</option>
            <option value="pricelh">
              Price {"("}Low-High{")"}
            </option>
            <option value="pricelh">
              Price {"("}High-Low{")"}
            </option>
            <option value="pricelh">
              Price {"("}Latest{")"}
            </option>
          </select>
        </div>
        <div className="w-full text-end text-xsm3 md:text-base md:px-24 font-serif">
          {products.length} items 
        </div>

        <div className="flex  justify-center">
          {loading ? (
            <ClipLoader size={30} color="red" />
          ) : (
            <div className=" border-y md:border-y-2 w-full py-2  md:py-6 border-red-600 grid grid-cols-3 md:grid-cols-4 place-content-center gap-2 md:gap-12 ">
              {products &&
                products.map((product, i) => (
                  <div key={i}>
                    <Link
                      to={`/product/${product.productcode}`}
                      state={product}
                    >
                      <Showcard product={product} />
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
