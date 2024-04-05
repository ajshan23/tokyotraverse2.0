import { configureStore } from "@reduxjs/toolkit";
import ecomReducer from "../features/ecomSlice.js"
export const store=configureStore({
    reducer:ecomReducer
})