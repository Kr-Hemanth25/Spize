"use client"
import { createSlice,current } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { removeItem } from "auth-provider/CookieStore";
// import { data } from "../utils/fetchrestaurant";


const initialState={
    receipes:JSON.parse(localStorage.getItem("receipesdata"))||[],
    payment:{},
    payments:[]
}

const Slice=createSlice({
    name:"addreceipes",
    initialState,
    reducers:{
        addreceipe:(state,action)=>{
            // console.log("action",action)
            const data={
                nanoid:nanoid(),
                receipe:action.payload
            }
            state.receipes.push(data)
            localStorage.setItem("receipesdata",JSON.stringify(current(state.receipes)))
        },
        removereceipe:(state,action)=>{
            // console.log(state.receipes)
            const data=state.receipes.filter((item)=>{
               if(item.nanoid!==action.payload){
                console.log(item)
                return item
               }
            })
            state.receipes=data
            localStorage.setItem("receipesdata",JSON.stringify(state.receipes))
            // console.log(data)

        },
        addpayment:(state,action)=>{
            // console.log("action from addpayment",action)

            state.payment=action.payload

            // console.log("action from payment",state.payment)
         },
         addpayments:(state,action)=>{
            state.payments=action.payload
            console.log('addpayments',state.payments)

         }
    }
})

export const {addreceipe,removereceipe,addpayment,addpayments}=Slice.actions
export default Slice.reducer