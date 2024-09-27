import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { checkAuth } from "../utils/checkAuth";

const RootLayout = () => {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    setAuthenticated(null);
    const curAuth = checkAuth();
    if (curAuth) {
      setAuthenticated(curAuth);
    }
  }, []);
  return (
    <div>
      <Toaster />
      {!authenticated && (
        <h3 className=" absolute top-6 left-9 border-4 border-double  p-2 text-white rounded-2xl bg-gray-600 font-bold">
          Payment Made Easy!
        </h3>
      )}
      <Outlet />
    </div>
  );
};

export default RootLayout;
