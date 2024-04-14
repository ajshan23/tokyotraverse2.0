import React, { useState } from "react";
import Showcard from "../components/ShowCard/Showcard";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const ListAllSection = ({ allproducts, loading }) => {
  const [page, setPage] = useState(1);
  const handlePages = (index) => {
    setPage(index + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14">
      <div className="text-sm font-semibold md:text-4xl">All Products</div>
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
       {page*10-10}-{page*10}  items of {allproducts && allproducts.length}
      </div>

      <div className="flex  justify-center">
        {loading ? (
          <ClipLoader size={30} color="red" />
        ) : (
          <div className=" border-y md:border-y-2 w-full py-2  md:py-6 border-red-600 grid grid-cols-3 md:grid-cols-4 place-content-center gap-2 md:gap-12 ">
            {allproducts &&
              allproducts
                .slice(page * 10 - 10, page * 10)
                .map((product, index) => (
                  <div key={index}>
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
      {!loading && (
        <div className="flex w-full justify-center mb-4 gap-1">
          <button
            className="md:p-4 rounded-md  border border-black"
            onClick={() => {
              setPage((prev) => prev - 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === 1}
          >
            ◀️
          </button>
          {allproducts &&
            allproducts
              .slice(
                0,
                Math.ceil(Number(allproducts && allproducts.length / 10))
              )
              .map((si, index) => (
                <div
                  className={` md:p-4 rounded-md border  md:border-2 cursor-pointer ${
                    index + 1 === page
                      ? "bg-red-600 text-white"
                      : "border-black"
                  }`}
                  key={index}
                  onClick={() => handlePages(index)}
                >
                  {index + 1}
                </div>
              ))}
          <button
            className=" md:p-4 rounded-md  border border-black"
            onClick={() => {
              window.scrollTo(0, 0);
              Number(
                allproducts && allproducts.length / 10 !== page
                  ? setPage((prev) => prev + 1)
                  : null
              );
            }}
            disabled={
              page === Math.ceil(Number(allproducts && allproducts.length / 10))
            }
          >
            ▶️
          </button>
        </div>
      )}
    </div>
  );
};

export default ListAllSection;
