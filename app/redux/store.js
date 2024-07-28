import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice"
export const stores=configureStore({
    reducer
})