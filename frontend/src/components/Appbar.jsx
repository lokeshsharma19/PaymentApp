import React from "react";
import { checkAuth } from "../utils/checkAuth";

const Appbar = () => {
  const userDetails = checkAuth();
  const initial1 = userDetails.firstName[0].toUpperCase();
  const initial2 = userDetails.lastName[0].toUpperCase();
  return (
    <div className="flex shadow h-14 justify-between">
      <div className="head flex flex-col justify-center h-full ml-4">
        Payment App
      </div>
      <div className="flex justify-center">
        <div className="profile flex flex-col justify-center h-full mr-4">
          Hello
        </div>
        <div className=" flex mt-1 mr-2 justify-center rounded-full h-12 w-12 bg-slate-200 cursor-pointer">
          <div className="flex flex-col justify-center text-xl h-full">
            {initial1} {initial2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
