"use client"
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = () => {
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
  const [exist,setexist]=useState(null)
  const router=useRouter();
  const onSubmit = async(data) => {
    console.log(data)
    try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        if(result.exist)
          setexist(result.message)
        if(result.created){
          console.log("redirecting....")
          router.push('/login')}

      } catch (e) {
        console.log(e);
      }
      reset()


  };



  return (
    <div className="flex flex-col gap-[2vh] min-h-screen pt-[8vh] items-center">
      <div className="flex flex-col gap-6 items-center bg-gray-700 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-white">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 text-center">
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white"
          />
          {errors.email && <span className="text-gray-200 capitalize text-sm">{errors.email.message}</span>}
          {exist&&<div className='text-gray-100 capitalize'>{exist}</div>}
          <input
            type="text"
            placeholder="User Name"
            {...register('name', { required: 'Name is required' })}
            className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white"
          />
          {errors.email && <span className="text-gray-200 capitalize text-sm">{errors.email.message}</span>}
          <input
            type="text"
            placeholder="Your Idol Name"
            {...register('idolname', { required: 'Idol Name is required' })}
            className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white"
          />
          {errors.idolname && <span className="text-gray-200 capitalize text-sm">{errors.idolname.message}</span>}


          <input
  type="password"
  placeholder="Password"
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
          {errors.confirmPassword && <span className="text-gray-200 capitalize text-sm">{errors.confirmPassword.message}</span>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default page;
