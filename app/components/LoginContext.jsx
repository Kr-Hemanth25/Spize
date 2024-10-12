"use client"
import React, { createContext, useState } from 'react';

const LoginContext = createContext({ mlogin: false, setMlogin: () => {} });

export const LoginProvider = ({ children }) => {
  const [mlogin, setMlogin] = useState({});

  return (
    <LoginContext.Provider value={{ mlogin, setMlogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
