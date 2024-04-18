import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import pic from "../assets/blacktshirt.png";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh]=useState(0)

  const fetchAllProducts = async () => {
    await axios
      .post("http://localhost:5000/api/v1/admin/getallproducts")
      .then((res) => setAllproducts(res.data.products));
  };
  const handleRemove = async (productId) => {
    setLoading(true);

    await axios
      .post(`http://localhost:5000/api/v1/admin/removeproductbyid/${productId}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("product removel is unsuccessfull");
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, [refresh]);
  return (
    <div className=" h-screen w-full flex justify-center items-start px-4 py-10 bg-slate-300 overflow-y-scroll">
      <div className=" p-5 my-10 rounded bg-white ">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Code
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product IMage
              </th>
              <th className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stocks
              </th>
              <th className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allproducts &&
              allproducts.map((product, index) => (
                <tr className="text-center" key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{product?.productcode}</td>
                  <td className="px-16 py-4 whitespace-nowrap">
                    <img src={product?.image} alt="" />
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    {product?.name}
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    {product?.stock}
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    {product?.price}$
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    {product?.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                    <Popup
                      trigger={
                        <button className="text-black active:text-red-600">
                          {" "}
                          <RxCrossCircled />{" "}
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="border-red-600 border-2 flex justify-between p-4">
                          <div className="flex flex-col justify-center items-center gap-5">
                            <div className="text-3xl text-red-500 font-semibold pb-6">
                              Do you want to delete?
                            </div>
                            <div className="flex flex-row gap-5">
                              <div>
                                <img
                                  src={product?.image}
                                  alt=""
                                  className="w-20 h-auto"
                                />
                              </div>

                              <div className="flex flex-col">
                                <h1>{product?.name}</h1>
                                <h1>Category:{product?.category}</h1>
                                <h1>Price:{product?.price}$</h1>
                              </div>
                            </div>
                            <div>
                              <button
                                className="px-5 py-2 rounded-lg bg-red-600 text-white active:border-2 active:border-red-600 active:text-red-600 active:bg-white cursor-pointer"
                                onClick={() => {
                                  handleRemove(product._id).then(()=>close()).then(()=>setRefresh(Math.random()))
                                }}
                              >
                                {loading ? <ClipLoader color="white" /> : "Remove it"}
                              </button>
                            </div>
                          </div>

                          <div>
                            <button
                              onClick={() => close()}
                              className="px-2 py-1 rounded-lg border-red-600 border-2 "
                            >
                              close
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
