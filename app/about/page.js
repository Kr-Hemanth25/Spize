
import React from 'react';

const Page = () => {

  return (
    <>
      <div className='text-white text-center pb-[5vh] bg-cover bg-center h-[80vh] blur-[3px] opacity-[0.5] object-cover relative b-[5vh]' style={{ backgroundImage: "url('/b-removebg.png')" }}></div>
      <div className='z-10 relative bottom-[80vh] text-white text-center m-[3vh] pb-[15vh] sm:m-[10vh] capitalize'>
        <div className='text-[3vh]'>
          <div className='uppercase text-[4vh] z-10 '>Welcome to Spize - Your Gateway to Exquisite Cuisine!</div><br />
          <div>
            <p>
              Spize is your premier destination for discovering and enjoying a diverse array of mouthwatering dishes from various regions. Our platform is designed to connect food lovers with the best eateries, offering a convenient way to explore, order, and indulge in the rich culinary traditions.
            </p>
            <p>
              Our Mission: At Spize, we&#39;re dedicated to celebrating the unique flavors and culinary heritage of different regions. Our mission is to showcase a wide variety of dishes, providing a platform where food enthusiasts can discover hidden gems and iconic eateries alike.
            </p>
          </div>
          <div><br />
            <p className='text-[4vh] pt-[1vh]'>
              What We Offer:
            </p><br />
            <ul>
              <li>Discover Culinary Delights: Explore a curated selection of restaurants and eateries, each offering their own distinctive take on beloved dishes.</li>
              <li>Order Your Meal: With Spize, you can easily browse through the available options, read reviews, and order your meal in advance, ensuring a hassle-free dining experience.</li>
              <li>Community and Reviews: Join our vibrant community of food enthusiasts, share your experiences, and discover new favorites based on authentic reviews and recommendations.</li>
            </ul>
          </div>
          <div><br />
            <p className='text-[4vh]'><br />
              Why Choose Spize?
            </p><br />
            <ul>
              <li>Comprehensive Selection: We strive to feature a diverse range of eateries, from small local joints to well-known favorites, ensuring there&#39;s something for every taste.</li>
              <li>Convenience: Our platform makes it easy to explore and order meals from the comfort of your own home or while on the go, saving you time and effort.</li>
              <li>Transparency: We believe in transparency and authenticity, providing accurate information and genuine reviews to help you make informed decisions.</li>
            </ul>
          </div>
          <div>
            <p>
              Join Us: Whether you&#39;re a seasoned food aficionado or just discovering new culinary delights, Spize welcomes you to embark on a gastronomic journey like no other. Join us today and uncover the tantalizing flavors of the vibrant food scene!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

export const metadata = {
  title: "Spize-About",
  description: "Created By K.R.Hemanth",
};
