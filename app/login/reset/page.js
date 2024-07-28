"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { flattenedDecrypt } from 'jose'
import Link from 'next/link'
import { set } from 'mongoose'
const page = () => {
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
  const [creset,setreset]=useState(false)
  const [creset1,setreset1]=useState(true)
  const [mail,setmail]=useState(null);
  const [error,seterror]=useState(null)
  const [pass,setpass]=useState(false)

  const onsubmit=async(data)=>{
    const response = await fetch("/api/Forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    let result=await response.json()
    console.log(result)
    if(result.user){
      reset();
      setreset(true)
      setreset1(false)
      seterror(null)
      setmail(result.email)

    }
    else{
      // setreset1(false)
      seterror(result.mission)
    }
    

  }

  const onsubmitp=async(data)=>{
    console.log(data)
    const response = await fetch("/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result=await response.json()
    console.log(result)
    if(result.user){
      reset();
      setreset(false)
      setpass(true)
      seterror(null)
      setmail(result.email)

    }
    else{
      // setreset1(false)
      seterror(result.mission)
    }
    

  }

  return (
    <div className="flex flex-col gap-[2vh] min-h-screen pt-[5vh] items-center text-white">
        <div className="flex flex-col gap-6 items-center bg-gray-600 p-8 rounded-lg shadow-lg w-80">
      <h1 className="text-2xl font-bold mb-0">Reset Password</h1>
        <h1 className='text-center text-gray-200 pb-[0vh]'>Enter Following Details To Reset Password</h1>
      

        {creset1&&<form onSubmit={handleSubmit(onsubmit)}>
          {/* <h1 className='text-center text-gray-200 pb-[5vh]'>Check Mail,Otherwise Comapny Is not responsible For Anything</h1> */}
          <div className='flex flex-col gap-4'>
        <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="px-4 py-2 rounded-lg text-center bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500 w-full"
          />
          {errors.email && <span className="text-gray-200 capitalize text-sm">{errors.email.message}</span>}
        <input
          type="text"
          placeholder="Your Idol Name"
          {...register('idolname', { required: {value:true,message:'Password is required'}})}

          className="px-4 py-2 rounded-lg text-center bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500 w-full"
        />
          {errors.password && <span className="text-gray-200 capitalize text-sm text-center">{errors.password.message}</span>}
          {/* {error&&<span className="text-gray-200 capitalize text-sm text-center">{error}</span>} */}

        <button type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
        >
          Submit
        </button>
        </div>

        </form>}


       {error&&<div className='text-center text-gray-200 flex flex-col gap-3 capitalize'>
        <div>{error}</div>
        <div className='text-blue-300'>Try Again</div>
        </div>}


        {creset&&<form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onsubmitp)}>
          <input value={mail} type="hidden" {...register('email')}/>
          <input
  type="password"
  placeholder="New Password"
  // {...register('password', { required: {value:true,message:'Password is required'},minLength:{value:6,message:'password length to be more'},maxLength:{value:16,message:'too long password'},pattern:{value:'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^\s]{8,}$/',message:'password should contain atleast one small,one capital,one number,one special character in it'} })}
  {...register('password', { 
    required: { value: true, message: 'Password is required' },
    minLength: { value: 6, message: 'Password length should be more' },
    maxLength: { value: 16, message: 'Password is too long' },
    pattern: { 
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^\s]{8,}$/, 
      message: 'Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character' 
    }
  })}
  

  className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white relative"
/>

          {errors.password && <span className="text-gray-200 capitalize text-center text-sm">{errors.password.message}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === watch('password') || 'Passwords do not match'
            })}
            className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white"
          />
          {errors.confirmPassword && <span className="text-gray-200 capitalize text-center text-sm">{errors.confirmPassword.message}</span>}
          <button type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
        >
          Submit
        </button>

          </form>}
          {pass&&<div className='text-white bold text-2xl capitalize text-center flex flex-col gap-3'>
           <div> password successfully reseted,check Mail</div>
           <Link href='/login' className='text-blue-300'>Go Back</Link>
            </div>}
        </div>
        </div>
  )
}

export default page