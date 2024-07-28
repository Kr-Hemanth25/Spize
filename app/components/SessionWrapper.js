"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";


export default function SessionWrapper({ children }) {
return (
    <>
      {/**  Wrap the children in SessionProvider only on the client-side */}
      <SessionProvider session={null} refetchInterval={0} ssr={false}>
        {children}
      </SessionProvider>
    </>
  )

}