"use client"
import React from 'react'
import Payments from './payments'
import Payments2  from './payments2'
// import LoginContext from '../components/LoginContext'
// import { useContext } from 'react'
// import { useSession } from 'next-auth/react'
import { useEffect,useState } from 'react'
const Mainpayment = () => {
  const [multiple,set]=useState(0)
  useEffect(()=>{
      set(parseInt(JSON.parse(localStorage.getItem('multiple'))))
  },[set])
   

  if(!multiple){
    return(
      <Payments/>

    )

  }
  else
  return(<Payments2/>)

    
}

export default Mainpayment