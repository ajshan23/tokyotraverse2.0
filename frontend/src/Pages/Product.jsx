import ProductInner from "../Section/ProductInner.jsx";
import Description from "../components/Description.jsx";

import { useLocation } from "react-router-dom";

import RelatedProducts from "../Section/RelatedProducts.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState();
  // const path=location?.pathname.split("/").reverse().at(0)
  const path = location?.pathname.split("/").slice(-1)[0];
  const fetchProduct = async () => {
    await axios
      .post(`http://localhost:5000/api/v1/users/getproduct/${path}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProduct();

    window.scrollTo(0, 0);
  }, [path]);
  return (
    <div>
      {product && (
        <div>
          <ProductInner product={product}/>
          <RelatedProducts
            heading="Related Products"
            type="related"
            category={product.category}
            id={product._id}
          />
          <Description />
        </div>
      )}
    </div>
  );
};

export default Product;
