"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoginContext from './LoginContext';
import { useContext } from 'react';
import { name } from 'auth-provider/auth-providers/github';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { mlogin, setMlogin } = useContext(LoginContext)
  const router = useRouter()

  useEffect(()=>{
    async function fetchdata(){
    let response=await fetch('/api/rauth')
    let result= await response.json()
    console.log(result)
    if(result.isuser)
    {
      console.log(result.isuser)
      setMlogin(result.user)
    }
    }
    fetchdata()


  },[])

  useEffect(() => {
    // console.log(mlogin)
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width
    setWidth(window.innerWidth);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const recipesData = JSON.parse(localStorage.getItem('receipesdata'));
    if (recipesData) {
      setCartCount(recipesData.length);
    }

    const intervalId = setInterval(() => {
      const count = JSON.parse(localStorage.getItem('no') || '0');
      setCartCount(count);
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setClick(!click);
  };

  const signout = async () => {
    try {
      var response = await fetch('/api/signout');
      // console.log(response)
      var result = await response.json()
      // console.log(result)
      if (result.user) {
        setMlogin({ email: undefined, name: undefined, isuser: false }); // Reset user state
        // console.log("i am the reason")
        router.push('/login')
      } else {
        // console.log('Github User or namm boss');
        if (mlogin.isuser) {
          // console.log("boss")
          setMlogin({ email: undefined, name: undefined, isuser: false });
          router.push('/login');
        } // Reset user state
        // toggleMenu(); 
        else{
          // console.log("github")
          setMlogin({ email: undefined, name: undefined, isuser: false });
        signOut();
      router.push('/login')}
  
      }


        
    } catch (error) {
  console.error('Error during signout:', error);
  // Optionally handle the error in the UI (e.g., display an error message to the user)
}
}



if (session || mlogin.isuser) {

  return (
    <>
      <header>
        <nav className='h-[10vh] w-[100vw] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] fixed z-[100] box-border'>
          <div className='flex flex-row'>
            <div className='w-[45vw] flex flex-row gap-[3vw] pl-[2vh] justify-items-center h-[10vh] items-center sm:pl-[10vh]'>
              <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
              <Link href='/cart' className="relative inline-block">
                <lord-icon className='w-[15vw] h-[7vh]'
                  src="https://cdn.lordicon.com/pbrgppbb.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                >
                </lord-icon>
                <span className="absolute sm:bottom-[2.5vh] sm:left-[1.5vw] left-[5.5vw] bottom-[3vh] bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 sm:h-6 sm:w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>

              <div className='justify-center items-center h-screen hidden sm:flex'>
                <div className='h-[5vh] w-[15vw] flex flex-row items-center justify-center text-center capitalize transition-all duration-300 text-white border-white border-[0.5vh] p-[1vh] hover:text-purple-900 hover:border-purple-900 hover:bg-white hover:border-[0.3vh]'>
                  <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
                  <lord-icon
                    src="https://cdn.lordicon.com/mebvgwrs.json"
                    trigger="loop"
                    delay="1000"
                    state="hover-wave"
                    colors="primary:#ffffff,secondary:#f49cc8,tertiary:#ee66aa,quaternary:#000000,quinary:#ebe6ef">
                  </lord-icon>
                  {session ? session.user.name : mlogin.name}
                </div>
              </div>
            </div>
            <div className='flex-row gap-[3vw] self-end text-[2em] h-[10vh] text-white justify-between items-center sm:flex text-center md:ml-[20vw]'>
              <Link href='/home' className="h-[7vh] w-[7vw] text-center hover:bg-white px-[0.5vw] hover:text-purple-900 hover:rounded-full focus:bg-transparent focus:rounded-[40rem] hidden sm:flex">Home</Link>
              <Link href='/menu' className='h-[7vh] w-[7vw] text-center hover:bg-white px-[0.5vw] hover:text-purple-900 hover:rounded-full focus:bg-transparent focus:rounded-[40rem] hidden sm:flex'>Menu</Link>
              <Link href='/about' className='h-[7vh] w-[7vw] text-center hover:bg-white px-[0.5vw] hover:text-purple-900 hover:rounded-full focus:bg-transparent focus:rounded-[40rem] hidden sm:flex'>About</Link>
              <div className='flex-row justify-center hidden sm:flex sm:place-items-center sm:gap-0'>
                <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
                <lord-icon
                src="https://cdn.lordicon.com/tckirjgy.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#f49cc8,tertiary:#ffffff"
                  style={{ height: '5vh', width: '4vw' }}
                  >
                </lord-icon>
                <Link href='/buymeachai' className='text-white text-[2vh] sm:w-[9vw] capitalize border-white pl-[0.5vw] border-[0.1vh] p-[1vh] hover:text-purple-900 hover:border-purple-900 hover:bg-white hover:border-[0.3vh] font-mono hidden sm:flex'>buy-me-a-chai</Link>
              </div>
              <button onClick={toggleMenu} aria-expanded={click} aria-label="Toggle menu">
                <Image className="text-white h-[5vh] justify-self-end left-[30vw] top-[2vh] sm:left-[0vw] relative sm:top-0" src={click ? '/cancel.svg' : '/hamburger.svg'} alt="Menu toggle" height={1000} width={1000} />
              </button>
            </div>
          </div>
          {click && width > 500 && (
            <div className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] h-[20vh] w-[100vw] sm:w-[30vh] relative left-[85vw]'>
              <ul className='flex flex-col text-white relative top-[15%] text-[1.3rem] text-center items-center gap-[2rem] capitalize'>
                <div className='flex flex-row justify-center'>
                  <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
                  <lord-icon
                    src="https://cdn.lordicon.com/ciqqqyun.json"
                    trigger="hover"
                    colors="primary:#f49cc8,secondary:#ebe6ef,tertiary:#f49cc8">
                  </lord-icon>
                  <Link className='h-[5vh] w-[7vw] hover:bg-white hover:text-purple-900 hover:rounded-[40rem]' href='/history' onClick={toggleMenu}>booked</Link>
                </div>
                <div className='flex flex-row justify-center'>
                  <Image width='2000' height='2000' src='/signout.svg' className='h-[6vh] w-[1.5vw]' alt="Sign out" />
                  <button className='h-[5vh] w-[7vw] hover:bg-white hover:text-purple-900 hover:rounded-[40rem] capitalize' onClick={signout}>signout</button>
                </div>
              </ul>
            </div>
          )}
          {click && width < 500 && (
            <div className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] h-[100vh] w-[70vw] relative left-[30vw]'>
              <ul className='flex flex-col text-white text-[1rem] text-center items-center gap-[2vh] capitalize relative top-[1vh] pt-[3vh]'>
                <div className='h-[5vh] w-[50vw] text-white border-white border-[0.5vh] rounded-full hover:text-purple-900 hover:border-purple-900 hover:bg-white hover:border-[0.3vh] flex flex-row justify-center'>
                  <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
                  <lord-icon
                    src="https://cdn.lordicon.com/mebvgwrs.json"
                    trigger="loop"
                    delay="2000"
                    state="hover-wave"
                    colors="primary:#ffffff,secondary:#f49cc8,tertiary:#ee66aa,quaternary:#000000,quinary:#ebe6ef">
                  </lord-icon>
                  <div className='pt-[1vh] text-[3.1vw] text-center'>{session ? session.user.name : mlogin.name}</div>
                </div>
                <Link className='hover:bg-white hover:text-purple-900 hover:rounded-[40rem] pt-[5vh]' href='/home' onClick={toggleMenu}>Home</Link>
                <Link className='hover:bg-white hover:text-purple-900 hover:rounded-[40rem]' href='/menu' onClick={toggleMenu}>Menu</Link>
                <Link className='hover:bg-white hover:text-purple-900 hover:rounded-[40rem]' href='/about' onClick={toggleMenu}>About</Link>
                <Link className='hover:bg-white hover:text-purple-900 hover:rounded-[40rem]' href='/buymeachai' onClick={toggleMenu}>Buy Me A Chai</Link>
                <Link className='hover:bg-white hover:text-purple-900 hover:rounded-[40rem] pb-[5vh]' href='/history' onClick={toggleMenu}>booked</Link>
                <div className='flex flex-row justify-center'>
                  <Image width='2000' height='2000' src='/signout.svg' className='h-[5vh] w-[10vw]' alt="Sign out" />
                  <button className='h-[5vh] w-[30vw] bg-white text-purple-900 rounded-[6rem]' onClick={signout}>Signout</button>
                </div>
              </ul>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

};

export default Navbar;



