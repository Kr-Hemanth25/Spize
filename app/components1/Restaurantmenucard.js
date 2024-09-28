// components/Restaurantmenucard.js

'use client';
import React from 'react';
import { IMG_CDN_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addreceipe } from '../redux/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const Restaurantmenucard = ({ recipe, index }) => {
  const dispatch = useDispatch();

  const usedispatch = (receipe) => {
    toast('Added To Cart', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick:true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // localStorage.setItem('no',JSON.stringify(JSON.parse(localStorage.getItem('receipesdata')).length+1))

    console.log(receipe);
    dispatch(addreceipe(receipe));
    localStorage.setItem('no',JSON.stringify(JSON.parse(localStorage.getItem('receipesdata')).length))

  };

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

  return (
    <>
      <div key={index} className="relative bg-neutral-950 rounded-lg shadow-lg overflow-hidden w-[80vw] m-auto sm:w-80 transform transition-transform duration-300 hover:scale-105">
  <Image width="2000" 
    src={`${IMG_CDN_URL}${recipe.info.imageId}`}
    height="200"
    alt={recipe.info.name}
    priority
    className="absolute inset-0 w-full h-full object-cover opacity-[0.3] transition-opacity duration-300 hover:opacity-50"
  />
  <div className="relative z-[10] p-5">
    <h2 className="text-2xl font-semibold text-white mb-2 transition-colors duration-300 hover:text-yellow-300">{recipe.info.name}</h2>
    <p className="mb-4 text-gray-300 transition-opacity duration-300 hover:opacity-100">{recipe.info.description}</p>
    <p className="text-lg font-bold text-yellow-300 mb-4 transition-colors duration-300 hover:text-yellow-500">&#x20b9;{recipe.info.price ? parseInt((recipe.info?.price) / 100) : parseInt(recipe.info.variantsV2.pricingModels[0].price/100)}</p>
    <div className="text-yellow-500 mb-[5%]">
      {renderStars(recipe.info.ratings.aggregatedRating.rating)}
    </div>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      onClick={() => { usedispatch(recipe) }}
    >
      Add to Cart
    </button>
  </div>
</div>

    </>
  );
};

export default Restaurantmenucard;
