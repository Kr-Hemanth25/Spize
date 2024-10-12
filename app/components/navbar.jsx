import React from "react";
import Navbar2 from "./navbar2";
import { cookies } from "next/headers"; // Import Next.js cookies utility
import { VerifyToken } from "@/services/providers";

// Page component, which will run on the server
const Page = async () => {
  try {
    // Retrieve token from cookies using Next.js' cookies() function
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;

    // If no token, pass isUser as false
    if (!token) {
      return <Navbar2 isUser={false} user={null} />;
    }

    // Verify the token
    const user = await VerifyToken(token);

    // If the user is valid, pass the user object to the Login component
    if (user) {
      return <Navbar2 isUser={true} user={user} />;
    } else {
      return <Navbar2 isUser={false} user={null} />;
    }
  } catch (error) {
    // Handle any errors that occurred during token verification
    return <Navbar2 isUser={false} errorMessage={error.message} />;
  }
};

export default Page;
