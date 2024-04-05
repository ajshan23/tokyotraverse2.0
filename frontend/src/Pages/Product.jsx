import ProductInner from "../Section/ProductInner.jsx";
import Description from "../components/Description.jsx";

import { useLocation } from "react-router-dom";
import ListSelectedProducts from "../Section/ListSelectedProducts.jsx";
const Product = () => {

  const location=useLocation()
  const data=location?.state;
  
  return (
    <div>
      <ProductInner product={data}/>
      <ListSelectedProducts />
      {/* heading="Related Products" type="related" category={data.category} id={data._id} */}
      <Description />
    </div>
  );
};

export default Product;
