"use client"
import React from 'react'
import { IMG_CDN_URL } from '../utils/constant';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {'⭐'.repeat(fullStars)}
      {halfStar && '⭐️'}
      {'⭐'.repeat(emptyStars)}
    </>
  );
};



const Restaurantcard = ({ restaurant,index }) => {
  const router = useRouter();

  const handleClick = (restaurant) => {
    // console.log(restaurant);
    localStorage.setItem('restaurantData', JSON.stringify(restaurant.info.id))
    router.push(`/restaurant/${restaurant.info.name}`);
  };

  return (
    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:text-white">
     <div className="relative overflow-hidden">
      <Image src={`${IMG_CDN_URL}${restaurant.info.cloudinaryImageId}`} width="2000" height="2000" alt="Restaurant Image" className='w-full h-40 object-cover transition-transform duration-300 transform scale-110 hover:scale-105'/>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 hover:opacity-0"></div>
    </div>
    <div className="p-4 bg-black bg-opacity-70 hover:bg-opacity-90 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-2 capitalize text-white transform transition-transform duration-300 hover:scale-105">{restaurant.info.name}</h2>
      <p className="text-white mb-2">{restaurant.info.locality + "," + restaurant.info.areaName }</p>
      <p className='bold capitalize text-white '>{"delivery time:"+restaurant.info.sla.deliveryTime+" minutes"}</p>
      <div className="flex items-center justify-between">
        <span className="text-yellow-500">
          {renderStars(restaurant.info.avgRating)}
        </span>
        <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 transform hover:scale-105" onClick={() => handleClick(restaurant)}>
          <span className='text-white'>Book Now</span>
          <svg className="w-5 h-5 ml-2 text-white transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  

  
  )
}

export default Restaurantcard
