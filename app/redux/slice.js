"use client";
import { createSlice, current } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  receipes: [], // Start with an empty array, then hydrate from localStorage on the client side
  payment: {},
  payments: [],
};

const Slice = createSlice({
  name: "addreceipes",
  initialState,
  reducers: {
    hydrateReceipesFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        // Check if on client side
        const storedReceipes = JSON.parse(localStorage.getItem("receipesdata")) || [];
        state.receipes = storedReceipes;
      }
    },
    addreceipe: (state, action) => {
      const data = {
        nanoid: nanoid(),
        receipe: action.payload,
      };
      state.receipes.push(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("receipesdata", JSON.stringify(current(state.receipes)));
      }
    },
    removereceipe: (state, action) => {
      const updatedReceipes = state.receipes.filter((item) => item.nanoid !== action.payload);
      state.receipes = updatedReceipes;
      if (typeof window !== "undefined") {
        localStorage.setItem("receipesdata", JSON.stringify(updatedReceipes));
      }
    },
    addpayment: (state, action) => {
      state.payment = action.payload;
    },
    addpayments: (state, action) => {
      state.payments = action.payload;
      console.log("addpayments", state.payments);
    },
  },
});

export const {
  hydrateReceipesFromLocalStorage,
  addreceipe,
  removereceipe,
  addpayment,
  addpayments,
} = Slice.actions;

export default Slice.reducer;
