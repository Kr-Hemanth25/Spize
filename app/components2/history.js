"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IMG_CDN_URL } from "../utils/constant";
import Link from "next/link";
import LoginContext from "../components/LoginContext";
import { useContext } from "react";
import Image from "next/image"

const History = () => {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const {mlogin}=useContext(LoginContext)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session ? session.user.email : mlogin?mlogin.email:"spize.com" }),
        });
        const result = await response.json();
        setHistory(result.history);
      } catch (e) {
        console.log(e);
      }
    };
    fetchHistory();
  }, [session]);

  return (
    <>
      {history.length >= 1 ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pb-[10vh]">
    {history
      .sort((a, b) => new Date(b.bookedDate) - new Date(a.bookedDate))
      .map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <Image width="2000" height="2000"
            src={`${IMG_CDN_URL}${item.imageid}`}
            alt="Hotel Image"
            className="w-40 h-40 rounded-lg object-cover mr-4"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-2">{item.hotel}</h3>
            <p className="text-gray-700 mb-1">{item.name}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="font-medium w-[15vw] sm:w-[5vw]">{item.price}</span>
              <span>Booked: {new Date(item.bookedDate).toLocaleDateString()}</span>
            </div>
            <span className="">x {item.quantity}</span>
          </div>
        </div>
      ))}
  </div>
) : (
<div class="flex items-center justify-center h-[40vh] w-[80vw] m-auto">
  <div class="bg-gray-300 p-8 rounded-lg shadow-lg animate-fade-in text-center">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">No Previous Booking Found</h2>
    <p class="text-gray-800 mb-6">Book items to see them here.</p>
    <a href="/home" class="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Book Item</a>
  </div>
</div>


)}

    </>
    
  );
};

export default History;
