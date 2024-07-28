"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removereceipe } from '../redux/slice';
import { IMG_CDN_URL } from '../utils/constant';
import { useRouter } from 'next/navigation';
import { addpayment } from "@/app/redux/slice";
import { addpayments } from '../redux/slice';
import Link from 'next/link';
import Image from 'next/image';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [alldata,setdata]=useState([])
  const storedRecipes = useSelector((data) => data.receipes);

  // Initialize quantities and total price for each recipe
  const initialQuantities = storedRecipes.map(() => 1);
  const [quantities, setQuantities] = useState(initialQuantities);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Calculate the total price whenever quantities change
    const calculateTotalPrice = () => {
      let price = 0;
      storedRecipes.forEach((recipe, index) => {
        price += recipe.receipe.info.price
          ? quantities[index] * parseInt((recipe.receipe.info?.price) / 100)
          : quantities[index] * parseInt(recipe.receipe.info.variantsV2.pricingModels[0].price / 100);
      });
      setTotalPrice(price);
    };

    calculateTotalPrice();
  }, [quantities, storedRecipes]);

  const removeitem = (id) => {
    dispatch(removereceipe(id));
    localStorage.setItem('no', JSON.stringify(parseInt(JSON.parse(localStorage.getItem("no"))) - 1));
  };

  const cp = (recipe, quantity) => {
    localStorage.setItem('nanoid', JSON.stringify(recipe.nanoid));
    let price = recipe.receipe.info.price
      ? quantity * parseInt((recipe.receipe.info?.price) / 100)
      : quantity * parseInt(recipe.receipe.info.variantsV2.pricingModels[0].price / 100);
    dispatch(addpayment({ id: recipe.receipe.info.id, price: price, quantity: quantity, hotel: recipe?.receipe?.text, imageid: recipe?.receipe?.info?.imageId, desc: recipe.receipe.info.description }));
  // const multiple=parseInt(JSON.parse(localStorage.getItem('multiple')))
  localStorage.setItem('multiple',JSON.stringify("0"))
 router.push('/cart/payments');
  };

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index, id) => {
    if (quantities[index] > 1) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const bookAllItems = () => {
    localStorage.setItem('multiple',JSON.stringify("1"))
    let all=JSON.parse(localStorage.getItem('receipesdata'))
    // console.log(all)
    all.map((recipe,index)=>{
      let price = recipe.receipe.info.price
      ? quantities[index] * parseInt((recipe.receipe.info?.price) / 100)
      : quantities[index] * parseInt(recipe.receipe.info.variantsV2.pricingModels[0].price / 100);
      setdata(alldata.push({rid:recipe.receipe.info.id,price:price,name:recipe?.receipe?.info?.name,hotel: recipe?.receipe?.text, imageid: recipe?.receipe?.info?.imageId, desc: recipe.receipe.info.description,quantity:quantities[index]}))

    })
    dispatch(addpayments(alldata))
    
    router.push('/cart/payments');
  };

  return (
    <>
  <div className="container mx-auto p-10 pb-[15vh]">
  {storedRecipes.length > 0 ? (
    storedRecipes.length === 1 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {storedRecipes.map((recipe, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center p-4 h-full text-center text-white">
                <h2 className="text-xl font-semibold mb-2">{recipe.receipe.info.name}</h2>
                <p className="text-lg mb-2">{recipe.receipe.text}</p>
                <p className="font-semibold text-yellow-300">
                  &#x20b9;{recipe.receipe.info.price
                    ? quantities[index] * parseInt((recipe.receipe.info?.price) / 100)
                    : quantities[index] * parseInt(recipe.receipe.info.variantsV2.pricingModels[0].price / 100)}
                </p>
                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    onClick={() => cp(recipe, quantities[index])}
                  >
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => removeitem(recipe.nanoid)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <button
                    onClick={() => handleDecrement(index, recipe.nanoid)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="text-white font-bold">{quantities[index]}</span>
                  <button
                    onClick={() => handleIncrement(index)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <img
                className="w-full h-[35vh] sm:h-[35vh] object-cover transition-transform duration-300 transform scale-100 hover:scale-105"
                src={`${IMG_CDN_URL}${recipe.receipe.info.imageId}`}
                alt="Recipe Picture"
              />
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-[3vh]">
          {storedRecipes.map((recipe, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center p-4 h-full text-center text-white">
                <h2 className="text-xl font-semibold mb-2">{recipe.receipe.info.name}</h2>
                <p className="text-lg mb-2">{recipe.receipe.text}</p>
                <p className="font-semibold text-yellow-300">
                  &#x20b9;{recipe.receipe.info.price
                    ? quantities[index] * parseInt((recipe.receipe.info?.price) / 100)
                    : quantities[index] * parseInt(recipe.receipe.info.variantsV2.pricingModels[0].price / 100)}
                </p>
                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                    onClick={() => cp(recipe, quantities[index])}
                  >
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => removeitem(recipe.nanoid)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <button
                    onClick={() => handleDecrement(index, recipe.nanoid)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="text-white font-bold">{quantities[index]}</span>
                  <button
                    onClick={() => handleIncrement(index)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <Image width="2000" height="2000"
                className="w-full h-[35vh] sm:h-[35vh] object-cover transition-transform duration-300 transform scale-100 hover:scale-105"
                src={`${IMG_CDN_URL}${recipe.receipe.info.imageId}`}
                alt="Recipe Picture"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center">
          <button
            className="bg-gray-300 hover:bg-gray-600 text-black hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={bookAllItems}
          >
            Book All Items: &#x20b9;{totalPrice}
          </button>
        </div>
      </>
    )
  ) : (
    <div className="flex items-center justify-center h-[40vh]">
      <div className="bg-white p-6 rounded-lg shadow-lg animate-bounce text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-600 pb-2">Add items to your cart to see them here.</p>
        <Link
          href="/home"
          className="inline-flex items-center justify-center bg-blue-500 text-white font-semibold rounded-lg h-[7vh] w-[15vh] hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Book Item
        </Link>
      </div>
    </div>
  )}
</div>



    </>
  );
};

export default Cart;

