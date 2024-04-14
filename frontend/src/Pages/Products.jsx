import React, { useEffect, useState } from "react";
import ProductSearch from "../Section/ProductSearch";
import ListAllSection from "../Section/ListAllSection";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchinfo = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:5000/api/v1/users/getallproducts")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false)
      }).catch((err)=>{
        console.log(err);
        setLoading(false)
      })
  };
  useEffect(() => {
    fetchinfo();
  }, []);
  return (
    <div className="w-full">
      <ProductSearch />
      <ListAllSection allproducts={products} loading={loading} />
    </div>
  );
};

export default Products;
