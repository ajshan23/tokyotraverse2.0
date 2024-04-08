import React, { useEffect, useState } from 'react'
import ProductSearch from '../Section/ProductSearch'
import ListAllSection from '../Section/ListAllSection'
import axios from "axios"
const Products = () => {
  const [products, setProducts] = useState();
  const [searchItem, setSearchItem] = useState("");



  const fetchinfo = async () => {
    await axios.post("http://localhost:5000/api/v1/users/getallproducts")
      .then((res) => setProducts(res.data.products));
  };
  useEffect(()=>{
    fetchinfo()
  },[])
  return (
    <div className='w-full'>
      <ProductSearch />
      <ListAllSection allproducts={products}/>
    </div>
  )
}

export default Products
