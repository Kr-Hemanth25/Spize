"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { removereceipe } from '@/app/redux/slice';
import { useDispatch } from 'react-redux';

const Page = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const multiple = parseInt(JSON.parse(localStorage.getItem("multiple")));
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (!multiple) {
      dispatch(removereceipe(JSON.parse(localStorage.getItem('nanoid'))));
      const no = JSON.parse(localStorage.getItem('receipesdata'));
      localStorage.setItem('no', JSON.stringify(no.length));
    } else {
      localStorage.setItem('receipesdata', JSON.stringify([]));
      localStorage.setItem('no', JSON.stringify("0"));
    }

    return () => clearInterval(timer);
  }, [dispatch]); // Added dispatch to dependency array

  useEffect(() => {
    if (timeLeft === 0) {
      router.push('/');
    }
  }, [timeLeft, router]); // Added router to dependency array

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen flex items-center justify-center relative bottom-[20vh] pt-[25vh] pb-[20vh] sm:pt-[10vh] sm:pb-0 sm:bottom-[15vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg sm:max-w-md sm:h-[60vh] w-[80vw] capitalize">
        <h2 className="text-3xl font-bold mb-4 text-center">Open your application</h2>
        <p className="text-lg mb-6 capitalize">please accept our financial request in your respective application. Failure to accept within this time frame may result in the transaction being cancelled.</p>
        <div className="text-center text-2xl font-bold mb-4 justify-self-center">
          Time left: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <ul className="text-sm text-gray-500 mt-4 capitalize">
          <li>&gt;verify mail</li>
          <li>&gt;if payment mode is cash on delivery,verify message</li>
          <li>&gt;Ensure sufficient funds are available in your account.</li>
          <li>&gt;Verify recipient details to prevent errors in transfer.</li>
          <li>&gt;Transactions are subject to review for compliance with financial regulations.</li>
          <li>&gt;Transactions initiated outside of business hours may be delayed.</li>
        </ul>
      </div>
    </div>
  );
};

export default Page;

