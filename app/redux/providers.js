"use client"
import {Provider} from "react-redux"
import { stores } from "./store"
export function Providers({children})
{
    // console.log(stores.getState())
    return <Provider store={stores}>
        {children}
 </Provider>
}