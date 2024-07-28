"use client"
import React from 'react'
import Payments from './payments'
import Payments2  from './payments2'
// import LoginContext from '../components/LoginContext'
// import { useContext } from 'react'
// import { useSession } from 'next-auth/react'
const mainpayment = () => {
  const multiple=parseInt(JSON.parse(localStorage.getItem('multiple')))
  // const {mlogin}=useContext(LoginContext)
  // const {data:session}=useSession();

  if(!multiple){
    return(
      <Payments/>

    )

  }
  else
  return(<Payments2/>)

    
}

export default mainpayment