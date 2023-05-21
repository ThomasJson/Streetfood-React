import React, { createContext, useEffect, useState } from "react";
import { deleteCookie } from "../helpers/cookieHelper";
import doFetch from "../helpers/fetchHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ role: 0, id: "0" }); 
  

  useEffect(() => {
    const check = async () => {
      const { data } = await doFetch("auth/check");

      if (data?.data?.result) { 
        setAuth({ role: +data.data?.role, id: data.data?.id });

      } else {
        setAuth({ role: 0, id: "0" });
        deleteCookie("blog");
      }
    };

    check();
  }, []);

  console.log('auth:', auth)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };