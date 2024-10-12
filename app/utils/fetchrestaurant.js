"use client"
export const fetchrestaurant = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://food-wagon-backend.onrender.com/api/restaurants?lat=${latitude}&lng=${longitude}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants. Please try again later.');
    }
    const data = await response.json();
    const restaurants = data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (!restaurants) {
      throw new Error('No restaurant data found.');
    }
    localStorage.setItem('restaurantdetails', JSON.stringify(restaurants));
    return restaurants;
  } catch (error) {
    throw new Error(`Failed to fetch restaurants: ${error.message}`);
  }
}

export const data = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude.toFixed(3);
        const longitude = position.coords.longitude.toFixed(3);
        const storedLocation = JSON.parse(localStorage.getItem("location"));
        
        // if (storedLocation && storedLocation.latitude.toFixed(3) === latitude && storedLocation.longitude.toFixed(3) === longitude)
          if (storedLocation 
            && typeof storedLocation.latitude === 'number' 
            && typeof storedLocation.longitude === 'number'
            && storedLocation.latitude.toFixed(3) === latitude 
            && storedLocation.longitude.toFixed(3) === longitude)
           {
          const restaurants = JSON.parse(localStorage.getItem("restaurantdetails"));
          if (restaurants) {
            resolve(restaurants);
          } else {
            try {
              const fetchedRestaurants = await fetchrestaurant(latitude, longitude);
              resolve(fetchedRestaurants);
            } catch (error) {
              reject(error);
            }
          }
        } else {
          localStorage.setItem("location", JSON.stringify(position.coords));
          try {
            const fetchedRestaurants = await fetchrestaurant(latitude, longitude);
            resolve(fetchedRestaurants);
          } catch (error) {
            reject(error);
          }
        }
      },
      (error) => {
        reject(new Error(`Failed to retrieve geolocation: ${error.message}`));
      }
    );
  });
}







export const FetchRestaurantMenuDetail = async({recievedData}) => {
  return new Promise(async(resolve,reject)=>{

          try {
          // recievedData=parseInt(recievedData)
          const loc=JSON.parse(localStorage.getItem('location'))
          // console.log(recievedData,"hi",loc)
            const menuListApi = await fetch(`https://food-wagon-backend.onrender.com/api/menu?lat=${loc.latitude}&lng=${loc.longitude}&restaurantId=${recievedData}`);
            const menuListResponse = await menuListApi.json();
            const menuListData = menuListResponse?.data?.data?.cards;
            const data={...menuListData[4].groupedCard.cardGroupMap.REGULAR.cards,...menuListData[0].card}
            resolve(data)
            
          } 
          catch (error) {
            reject(new Error("Failed to fetch restaurants"));
          }
        })
        }


