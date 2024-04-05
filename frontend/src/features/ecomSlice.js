import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[],
}

export const ecomSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{

        loadCart:(state,action)=>{
            state.cart=action.payload
            // console.log(state.cart);
        },
        addTocart:(state,action)=>{
            state.cart.push(action.payload)
            console.log(state.cart);
            //hit endpoint
        },
        setCart:(state,action)=>{
            state.cart=[];
        },
        // calculateTotal:(state,action)=>{
        //     let total;

        //    for (const item in state.cart) {
          
        //     total+=state.cart[item].product.price
        //    }
        //     state.total=total;
        // }

    }
})

export const {setUser,setAuthtoken,loadProducts,loadCart,addTocart,setCart,calculateTotal}=ecomSlice.actions

export const selectTotalCartAmount = (state) => {
    return state.cart.reduce((total, item) => {
      return total + item.product.price
    }, 0);
  };

export default ecomSlice.reducer;