
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper"
import Navbar from "./components/navbar.js"
import Footer from "./components/footer.js"
// import Wrapper from "./components/Wrapper";
import { Providers } from "./redux/providers";
import { LoginProvider } from "./components/LoginContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spize-Recieve It",
  description: "Created By K.R.Hemanth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link href="../public/ham,svg"></link> */}
      <body className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]' >
        <Providers>
        <SessionWrapper>
          <LoginProvider>
          {/* <Wrapper> */}
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
<Navbar/>
        <div className='w-[100vw] h-[90vh] p-[0vh] pt-[10vh] pb-[10vh] sm:p-[10vh]'>
        {children}
        </div>
         <Footer/>
         </div> 

         {/* </Wrapper> */}
         </LoginProvider>
         </SessionWrapper>
        </Providers>
        </body>
    </html>
  );
}
