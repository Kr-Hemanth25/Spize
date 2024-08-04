'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const Page = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [creset, setCreset] = useState(false);
  const [creset1, setCreset1] = useState(true);
  const [mail, setMail] = useState(null);
  const [error, setError] = useState(null);
  const [pass, setPass] = useState(false);

  const onsubmit = async (data) => {
    const response = await fetch("/api/Forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    if (result.user) {
      reset();
      setCreset(true);
      setCreset1(false);
      setError(null);
      setMail(result.email);
    } else {
      setError(result.mission);
    }
  }

  const onsubmitp = async (data) => {
    const response = await fetch("/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    if (result.user) {
      reset();
      setCreset(false);
      setPass(true);
      setError(null);
      setMail(result.email);
    } else {
      setError(result.mission);
    }
  }

  return (
    <div className="flex flex-col gap-[2vh] min-h-screen pt-[5vh] items-center text-white">
      <div className="flex flex-col gap-6 items-center bg-gray-600 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-0">Reset Password</h1>
        <h1 className='text-center text-gray-200 pb-[0vh]'>Enter Following Details To Reset Password</h1>

        {creset1 && (
          <form onSubmit={handleSubmit(onsubmit)}>
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
                {...register('idolname', { required: { value: true, message: 'Idol name is required' } })}
                className="px-4 py-2 rounded-lg text-center bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500 w-full"
              />
              {errors.idolname && <span className="text-gray-200 capitalize text-sm text-center">{errors.idolname.message}</span>}
              <button type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className='text-center text-gray-200 flex flex-col gap-3 capitalize'>
            <div>{error}</div>
            <div className='text-blue-300'>Try Again</div>
          </div>
        )}

        {creset && (
          <form className='flex flex-col gap-3 ' onSubmit={handleSubmit(onsubmitp)}>
            <input value={mail} type="hidden" {...register('email')} />
            <input
              type="password"
              placeholder="New Password"
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                minLength: { value: 6, message: 'Password length should be more' },
                maxLength: { value: 16, message: 'Password is too long' },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^\s]{8,}$/,
                  message: 'Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                }
              })}
              className="px-4 py-2 rounded-lg bg-gray-800 border text-center border-gray-600 focus:outline-none focus:border-blue-500 w-full text-white"
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
          </form>
        )}
        
        {pass && (
          <div className='text-white bold text-2xl capitalize text-center flex flex-col gap-3'>
            <div>Password successfully reset, check your mail</div>
            <Link href='/login' className='text-blue-300'>Go Back</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
