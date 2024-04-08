import React, { useEffect, useState } from "react";
import Showcard from "../components/ShowCard/Showcard";
import "../style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = (props) => {
  const [products, setProducts] = useState();
  const getRelated = async () => {
    await axios
      .post("http://localhost:5000/api/v1/users/relatedproducts", {
        category: props.category,
        mainproductid: props.id,
      })
      .then((res) => setProducts(res.data.products));
  };

  useEffect(() => {
    getRelated();
  }, [props.id]);
  return (
    <div className="py-5 md:py-14 w-full flex flex-col gap-1 justify-center items-center px-7 md:px-14">
      <div className="text-sm font-semibold md:text-4xl">Related Products</div>
      <div className="text-xsm3 md:text-xl">
        Find a Variety of Your Favourite Anime Products
      </div>
      <div className="w-full text-end text-xsm3 md:text-base">View All</div>

      <div className=" border-y md:border-y-2 w-full py-2 md:py-6 border-red-600 flex gap-2 md:gap-12 overflow-scroll element-class justify-center">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <Link to={`/product/${product.productcode}`} state={product}>
                <Showcard product={product} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
