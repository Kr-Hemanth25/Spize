import React from "react";
import Login from "../components/login";
import { cookies } from "next/headers"; 
import { VerifyToken } from "@/services/providers";
const Page = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;
    // console.log(token,"from login server")
    if (!token) {
      return <Login isUser={false} user={null} />;
    }

    const user = await VerifyToken(token);
    // console.log(user)
    if (user) {
      return <Login isUser={true} user={user} />;
    } else {
      return <Login isUser={false} user={null} />;
    }
  } catch (error) {
    return <Login isUser={false} errorMessage={error.message} />;
  }
};

export default Page;

export const metadata = {
  title: "Spize-Login",
  description: "Created By K.R.Hemanth",
};