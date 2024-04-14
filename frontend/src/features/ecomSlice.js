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
        },
        // addTocart:(state,action)=>{
        //     state.cart.push(action.payload)
        //     console.log(state.cart);
        //     //hit endpoint
        // },
        // setCart:(state,action)=>{
        //     state.cart=[];
        // },

    }
})

export const {loadCart,addTocart,setCart}=ecomSlice.actions

export const selectTotalCartAmount = (state) => {
    return state.cart.reduce((total, item) => {
      return total + (item.product.price*item.quantity)
    }, 0);
  };

export default ecomSlice.reducer;