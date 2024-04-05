import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import pic from "../assets/blacktshirt.png";
const ListProduct = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-start p-10 bg-slate-300 overflow-y-scroll">
      <div className=" p-10 rounded bg-white ">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product IMage
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Code
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-16 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(1, 2, 3, 4, 5, 6, 7, 8, 9).map(() => (
              <tr className="text-center">
                <td className="px-16 py-4 whitespace-nowrap">
                  <img src={pic} alt="" />
                </td>
                <td className="px-16 py-4 whitespace-nowrap">naruto backpag</td>
                <td className="px-16 py-4 whitespace-nowrap">123</td>
                <td className="px-16 py-4 whitespace-nowrap">300$</td>
                <td className="px-16 py-4 whitespace-nowrap">naruto</td>
                <td className="px-16 py-4 whitespace-nowrap cursor-pointer">
                  <Popup trigger={<button> + </button>} modal nested>
                    {(close) => (
                      <div className="border-red-600 border-2 flex justify-between p-4">
                        <div className="flex flex-col justify-center items-center gap-5">
                          <div className="text-3xl text-red-500 font-semibold pb-6">
                            Do you want to delete?{" "}
                          </div>
                          <div className="flex flex-row gap-5">
                            <div>
                              <img src={pic} alt="" className="w-20 h-auto" />
                            </div>

                            <div className="flex flex-col">
                              <h1>Naruto Bagpack</h1>
                              <h1>Category:Naruto</h1>
                              <h1>Price:100$</h1>
                            </div>
                            
                          </div>
                          <div>
                              <button className="px-5 py-2 rounded-lg bg-red-600 text-white active:border-2 active:border-red-600 active:text-red-600 active:bg-white cursor-pointer">Remove it</button>
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
