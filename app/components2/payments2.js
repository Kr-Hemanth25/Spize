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
//   const [price,setprice]=useState(0)
const {mlogin}=useContext(LoginContext)
  const { data: session } = useSession();
  const [name,setname]=useState("")
  const router=useRouter()
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
  const [price, setPrice] = useState(0);

  let payment = useSelector((data) => data.payments);

  useEffect(() => {
    let total = 0;
    let tname = "";
    payment.forEach((recipe) => {
      total += recipe.price;
      tname += recipe.name + ' from ' + recipe.hotel + ',';
    });
    setPrice(total);
    setname(tname);
  }, [payment]);
  
  

  const submit = async (data) => {
    // console.log(data)
    reset()
    try {
      const r= await fetch('/api/paymentsm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data,payment}),
      });
    

      reset();
      setPaymentMethod(""); 
      if(r.ok)
      {
        console.log('redirecting..')
        router.push('http://localhost:3000/cart/payments/payment')

      }
    }
     catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-[10vh] bg-gradient-to-b">
  <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
    <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Payment Page</h1>

    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="text-2xl font-bold text-gray-800 text-center mb-2">
        {name.substring(0,name.length-1)}
      </div>
      <div className="text-2xl font-bold text-gray-800 text-center mb-4">
        &#x20b9;{price}
      </div>
      <input type="hidden" value={session ? session.user.email : mlogin.isuser ? mlogin.email : "aaa@gmail.com"} {...register("email")}/>
      {/* <input type="hidden" value={JSON.stringify(payment)} {...register("all")}/> */}
    
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Address for Delivery</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows="3"
          placeholder="Enter your address"
          {...register("address", {
            required: { value: true, message: "Address required" },
            minLength: { value: 10, message: "Invalid address" },
            maxLength: { value: 100, message: "Invalid address" }
          })}
        />
        {errors.address && <div className="text-red-600 text-center mt-2">{errors.address.message}</div>}
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter your phone number"
          {...register("phonenumber", {
            required: { value: true, message: "Phone number required" },
            minLength: { value: 10, message: "Invalid phone number" },
            maxLength: { value: 13, message: "Invalid phone number" }
          })}
        />
        {errors.phonenumber && <div className="text-red-600 text-center mt-2">{errors.phonenumber.message}</div>}
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-1">Payment Method</label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              value="cod"
              {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
              className="mr-2 focus:ring-blue-600"
              onChange={() => setPaymentMethod("cod")}
            />
            <label htmlFor="cod" className="text-gray-700">Cash on Delivery</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="upi"
              value="upi"
              {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
              className="mr-2 focus:ring-blue-600"
              onChange={() => setPaymentMethod("upi")}
            />
            <label htmlFor="upi" className="text-gray-700">UPI</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              value="card"
              {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
              className="mr-2 focus:ring-blue-600"
              onChange={() => setPaymentMethod("card")}
            />
            <label htmlFor="card" className="text-gray-700">Debit/Credit Card</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="netbanking"
              value="netbanking"
              {...register("paymentMethod", { required: { value: true, message: "Payment method required" } })}
              className="mr-2 focus:ring-blue-600"
              onChange={() => setPaymentMethod("netbanking")}
            />
            <label htmlFor="netbanking" className="text-gray-700">Net Banking</label>
          </div>
        </div>
        {errors.paymentMethod && <div className="text-red-600 text-center mt-2">{errors.paymentMethod.message}</div>}
      </div>

      {paymentMethod === "upi" && (
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">UPI ID</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your UPI ID"
            {...register("upinumber", {
              required: { value: true, message: "UPI number required" },
              pattern: { value: /^\d{10}@[a-zA-Z]+$/, message: "Invalid UPI" }
            })}
          />
          {errors.upinumber && <div className="text-red-600 text-center mt-2">{errors.upinumber.message}</div>}
        </div>
      )}

      {paymentMethod === "card" && (
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Card Details</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Card Number"
            {...register("cardnumber", {
              required: { value: true, message: "Card number required" },
              minLength: { value: 16, message: "Invalid card number" },
              maxLength: { value: 16, message: "Invalid card number" }
            })}
          />
          {errors.cardnumber && <div className="text-red-600 text-center mt-2">{errors.cardnumber.message}</div>}

          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Expiry Date (mm/yy)"
              {...register("expiryDate", {
                required: { value: true, message: "Expiry date required" },
                pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Invalid expiry date" }
              })}
            />
            <input
              type="text"
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="CVV"
              {...register("cvv", {
                required: { value: true, message: "CVV required" },
                minLength: { value: 3, message: "Invalid CVV" },
                maxLength: { value: 3, message: "Invalid CVV" }
              })}
            />
          </div>
          {(errors.cvv || errors.expiryDate) && <div className="text-red-600 text-center mt-2">Card details mismatching</div>}
        </div>
      )}

      {paymentMethod === "netbanking" && (
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Bank</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("bank", { required: { value: true, message: "Select your bank" } })}
          >
            {indianBanks.sort().map((bank, index) => (
              <option key={index} value={bank}>{bank}</option>
            ))}
          </select>
          {errors.bank && <div className="text-red-600 text-center mt-2">{errors.bank.message}</div>}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
      >
        Book
      </button>
    </form>
  </div>
</div>

  );
};

export default Payments;

