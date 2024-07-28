"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useFetchRestaurantMenuDetail } from '../utils/fetchrestaurant';
import Restaurantmenucard from './Restaurantmenucard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Restaurantmenu = () => {
    let og,data;
    let [rdata,setdata]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rn,sn]=useState(null);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [dataFromStorage, setDataFromStorage] = useState(null);
  1
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        let storedData = await localStorage.getItem('restaurantData')
        storedData=JSON.parse(storedData)
        try {
          data = await useFetchRestaurantMenuDetail({recievedData:storedData});
          let og=data[2]?.card?.card?.itemCards || [];
          await og.map((i,index)=>{og[index]={...i.card,...data.card}})
          sn(data.card.text)
          // console.log(og)
          setdata(og)
          // console.log(og)

         
        } 
        catch (err) {
  setError(err.message);
          
        } 
        finally{
          setIsLoading(false)
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const results = rdata.filter(recipe =>
        recipe.info.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(results);
      // console.log(filteredRestaurants)
    }, [searchTerm, rdata]);

    if (error) return <div className='text-white text-center text-[5vh] pt-[30vh] capitalize'>Error: {error+" menu"}</div>;
    if (isLoading) return <div className='text-white text-center text-[5vh] pt-[30vh] capitalize'>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/anqzffqz.json"
    trigger="loop"
    state="loop-spin"
    colors="primary:#f49cc8,secondary:#ebe6ef,tertiary:#ffffff,quaternary:#e4e4e4"
    // style="width:250px;height:250px"
    >
</lord-icon>
      Loading restaurant Menu...</div>;


    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };


  
    return (
      <>
      <ToastContainer
  position="top-right"
  autoClose={1000}
  closeButton={true}  // Ensure close button is shown
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick={true}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  // transition="Bounce"
/>
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
          placeholder='Search receipe'
          className='text-center outline-none text-[3vw] capitalize border-none h-[5vh] w-[25vw] sm:w-[10vw] sm:text-[1vw]'
          onChange={handleSearch} 
        />
      </div>



      <div className="min-h-screen p-[3vh] pt-[10vh] sm:p-[10vh] sm:pt-[0vh]">
        <h1 className="text-[5vh] font-bold text-white text-center mb-10 relative bottom-[5vh] sm:bottom-[-1vh]">{rn}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-[10vh]">
        {filteredRestaurants.map((recipe, index) => (
                <Restaurantmenucard key={index} recipe={recipe} index={index}/>
    
  ))}
  </div>
  {filteredRestaurants.length==0&&
     
     <div className="flex items-center justify-center h-[40vh] relative bottom-[10vh] w-[80vw] sm:w-[40vw] mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg animate-bounce text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Oops...searched item is unavailable</h2>
        <p className="text-gray-600 pb-2">Look for other item from {rn}</p>
    </div>
   </div>
    
      }
    </div>
    </>
    )
}

export default Restaurantmenu