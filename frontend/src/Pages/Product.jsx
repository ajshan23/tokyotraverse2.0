import ProductInner from "../Section/ProductInner.jsx";
import Description from "../components/Description.jsx";

import { useLocation } from "react-router-dom";

import RelatedProducts from "../Section/RelatedProducts.jsx";
import { useEffect } from "react";
const Product = () => {

  const location=useLocation()
  const data=location?.state;
  console.log(data)
  useEffect(()=>{
    window.scrollTo(0,0)
  },[data])
  return (
    <div>
      <ProductInner product={data}/>
      <RelatedProducts heading="Related Products" type="related" category={data.category} id={data._id} />
      <Description />
    </div>
  );
};

export default Product;
