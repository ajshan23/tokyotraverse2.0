import React, { useEffect, useState } from "react";
import Showcard from "../components/ShowCard/Showcard.jsx";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
const LikedPage = () => {
  const isLogined=localStorage.getItem("accessToken");
  const navigate=useNavigate()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(
        "http://localhost:5000/api/v1/users/getwhishlist",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLogined) {
      fetchData();
    }else{
      navigate("/")
    }
    
  }, []);
  return (
    <div className="py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14">
      <div className="text-sm font-semibold md:text-4xl">Liked Products</div>
      <div className="text-xsm3 md:text-xl">Your Favourite Anime Products</div>
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
        {data ? data.length : "0"} items
      </div>

      <div className="flex  justify-center">
        {loading ? (
          <ClipLoader size={30} color="red" />
        ) : (
          <div className=" border-y md:border-y-2 w-full py-2  md:py-6 border-red-600 grid grid-cols-3 md:grid-cols-4 place-content-center gap-2 md:gap-12 ">
            {data &&
              data.map((product, index) => (
                <div key={index}>
                  <Link to={`/product/${product.productId.productcode}`} state={product.productId}>
                  <Showcard product={product.productId} />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
