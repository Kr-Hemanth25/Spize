"use client";
import React, { useEffect, useState } from 'react';
import { data } from '../utils/fetchrestaurant';
import Restaurantcard from './Restaurantcard';
import Script from 'next/script';
import { useRouter } from "next/navigation";
// import LoginContext from "../components/LoginContext";

const Restaurant = () => {
  const router = useRouter();
  // const { mlogin } = useContext(LoginContext);

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useState(()=>{
    const rds=localStorage.getItem('receipesdata')
    const rd=rds?JSON.parse(rds):[]
    localStorage.setItem('no', JSON.stringify(rd.length || 0));
    localStorage.setItem('receipesdata', JSON.stringify(JSON.parse(localStorage.getItem('receipesdata')) || []));

  },[])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const startTime = new Date();
        const data1 = await data();
        const endTime = new Date();
        // console.log((endTime - startTime) / 1000);
        setRestaurants(data1);
        setFilteredRestaurants(data1);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = restaurants.filter(restaurant =>
      restaurant.info.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(results);
    // console.log(filteredRestaurants)
  }, [searchTerm, restaurants]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) return <div className='text-white text-center text-[5vh] pt-[30vh] capitalize'>Error: {error}</div>;
  if (isLoading) return <div className='text-white text-center text-[5vh] pt-[30vh] capitalize'>
    <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/anqzffqz.json"
    trigger="loop"
    state="loop-spin"
    colors="primary:#f49cc8,secondary:#ebe6ef,tertiary:#ffffff,quaternary:#e4e4e4"
    >
</lord-icon>Loading restaurants Nearby...</div>;

  return (
    <>
      <div className='bg-white text-center capitalize rounded-full h-[7vh] w-[45vw] mx-auto flex items-center gap-[2vh] sm:w-[15vw]'>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon className="h-[3vh] w-[4vw] justify-self-end pl-[2vw] ml-[1vw]"
    src="https://cdn.lordicon.com/fkdzyfle.json"
    trigger="in"
    delay="1500"
    state="in-search"
    colors="primary:#000000"
    // style="width:250px;height:250px"
    >
</lord-icon>
        <input
          type="text"
          placeholder='Search restaurant'
          className='text-center outline-none text-[3vw] capitalize border-none h-[5vh] w-[25vw] sm:w-[10vw] sm:text-[1vw]'
          onChange={handleSearch} 
        />
      </div>
      <div className='grid grid-cols-1 w-full items-center mt-10 h-auto mb-10 sm:grid-cols-3 mx-auto gap-y-[10vh] pl-[10vh] pr-[10vh] pb-[15vh] justify-items-center'>
        {filteredRestaurants.length>0&&filteredRestaurants.map((restaurant, index) =>
          <Restaurantcard key={restaurant.info.id} restaurant={restaurant} index={index} />
        )}

      </div>
      {filteredRestaurants.length==0&&
     
     <div className="flex items-center justify-center h-[40vh] relative bottom-[20vh] w-[80vw] sm:w-[40vw] mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg animate-bounce text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Oops...searched restaurant is unavailable</h2>
        <p className="text-gray-600 pb-2">Look for other restaurant from spize home</p>
    </div>
   </div>
    
      }
    </>
  );
};

export default Restaurant;


