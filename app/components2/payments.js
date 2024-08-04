"use client";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import LoginContext from "../components/LoginContext";



const Payments = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { data: session } = useSession();
  const router=useRouter()
const { mlogin } = useContext(LoginContext)
  let payment
  const indianBanks = [
    "State Bank of India",
    "HDFC Bank",
    "Karnataka Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Kotak Mahindra Bank",
    "IndusInd Bank",
    "Canara Bank",
    "Union Bank of India",
    "IDBI Bank",
    "Bank of India",
    "Central Bank of India",
    "Indian Bank",
    "Yes Bank"
  ];
  const test=()=>{
   payment=useSelector((data) => data.payment);
    // console.log("session payment",payment)
  }
  test();

  const receipes=useSelector((data)=>data.receipes)
  // console.log(receipes)
  // console.log("session details",session,session?.user?.email)

  let freceipes=receipes.filter((item)=>{
    if(item.receipe.info.id===payment.id){
    //  console.log(item)
     return item
    }}
  )
  // console.log(freceipes)

  const submit = async (data) => {
    // console.log("data going for debugger",data)
    try {
      const r= await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // console.log(r)
    

      reset();
      setPaymentMethod(""); 
      if(r.ok)
      {
        console.log('redirecting..')
        router.push('/cart/payments/payment')

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-[10vh]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center capitalize">Payment Page</h1>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div className="text-xl font-bold text-gray-700 capitalize">
        {freceipes[0]?.receipe.info.name+" from "+freceipes[0]?.receipe.text}
      </div>
        <div className="text-xl font-bold text-gray-700">
        &#x20b9;{payment.price}
      </div>
      {/* Hidden input to register the price */}
      <input type="hidden" value={payment.price} {...register("price")} />
      <input type="hidden" value={freceipes[0]?.receipe.info.name} {...register("name")}/>
      <input type="hidden" value={session?(session.user.email):mlogin?(mlogin.email):"aaa@gmail.com"} {...register("email")}/>
      <input type="hidden" value={payment.quantity} {...register("quantity")}/>
      <input type="hidden" value={payment.hotel} {...register("hotel")}/>
      <input type="hidden" value={payment.desc} {...register("desc")}/>
      <input type="hidden" value={payment.imageid} {...register("imageid")}/>





      <input type="hidden" value={freceipes[0]?.receipe.info.id} {...register("rid")}/>
          <div>
            <label className="block text-gray-700">Address for Delivery</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows="3"
              placeholder="Enter your address"
              {...register("address", {
                required: { value: true, message: "Address required" },
                minLength: { value: 10, message: "Invalid address" },
                maxLength: { value: 100, message: "Invalid address" }
              })}
            />
            {errors.address && <div className="text-red-700 capitalize text-center p-2">{errors.address.message}</div>}
          </div>

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your phone number"
              {...register("phonenumber", {
                required: { value: true, message: "Phone number required" },
                minLength: { value: 10, message: "Invalid phone number" },
                maxLength: { value: 13, message: "Invalid phone number" }
              })}
            />
            {errors.phonenumber && <div className="text-red-700 capitalize text-center p-2">{errors.phonenumber.message}</div>}
          </div>

          <div>
            <label className="block text-gray-700">Payment Method</label>
            <div className="mt-2 space-y-2">
              <div>
                <input
                  type="radio"
                  id="cod"
                  value="cod"
                  {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
                  className="mr-2"
                  onChange={() => setPaymentMethod("cod")}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="upi"
                  value="upi"
                  {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
                  className="mr-2"
                  onChange={() => setPaymentMethod("upi")}
                />
                <label htmlFor="upi">UPI</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="card"
                  value="card"
                  {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
                  className="mr-2"
                  onChange={() => setPaymentMethod("card")}
                />
                <label htmlFor="card">Debit/Credit Card</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="netbanking"
                  value="netbanking"
                  {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
                  className="mr-2"
                  onChange={() => setPaymentMethod("netbanking")}
                />
                <label htmlFor="netbanking">Net Banking</label>
              </div>
            </div>
            {errors.paymentMethod && <div className="text-red-700 capitalize text-center p-2">{errors.paymentMethod.message}</div>}
          </div>

          {paymentMethod === "upi" && (
            <div>
              <label className="block text-gray-700">UPI ID</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your UPI ID"
                {...register("upinumber", {
                  required: { value: true, message: "UPI number required" },
                  pattern: { value: /^\d{10}@[a-zA-Z]+$/, message: "Invalid UPI" }
                })}
              />
              {errors.upinumber && <div className="text-red-700 capitalize text-center p-2">{errors.upinumber.message}</div>}
            </div>
          )}

          {paymentMethod === "card" && (
            <div>
              <label className="block text-gray-700">Card Details</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Card Number"
                {...register("cardnumber", {
                  required: { value: true, message: "Card number required" },
                  minLength: { value: 16, message: "Invalid card number" },
                  maxLength: { value: 16, message: "Invalid card number" }
                })}
              />
              {errors.cardnumber && <div className="text-red-700 capitalize text-center p-2">{errors.cardnumber.message}</div>}

              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Expiry Date (mm/yy)"
                  {...register("expiryDate", {
                    required: { value: true, message: "Expiry date required" },
                    pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Invalid expiry date" }
                  })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="CVV"
                  {...register("cvv", {
                    required: { value: true, message: "CVV required" },
                    minLength: { value: 3, message: "Invalid CVV" },
                    maxLength: { value: 3, message: "Invalid CVV" }
                  })}
                />
              </div>
              {(errors.cvv || errors.expiryDate) && <div className="text-red-700 capitalize text-center p-2">Card details mismatching</div>}
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div>
              <label className="block text-gray-700">Bank</label>
              <select
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                {...register("bank", { required: { value: true, message: "Select your bank" } })}
              >
                {indianBanks.sort().map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
              {errors.bank && <div className="text-red-700 capitalize text-center p-2">{errors.bank.message}</div>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;

