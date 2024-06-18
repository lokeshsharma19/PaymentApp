import React from "react";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div>
      <h3 className=" font-bold">Payment Made Easy!</h3>
      {/* <button className=" bg-red-600  m-5  px-2 py-1">SignIn</button>
      <button>SignUP</button> */}
      <Outlet />
    </div>
  );
};

export default RootLayout;
