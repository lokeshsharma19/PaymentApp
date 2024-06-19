import React from "react";

const Appbar = () => {
  return (
    <div className="flex shadow h-14 justify-between">
      <div className="head flex flex-col justify-center h-full ml-4">
        Payment App
      </div>
      <div className="flex justify-center">
        <div className="profile flex flex-col justify-center h-full mr-4">
          Hello
        </div>
        <div className=" flex mt-1 mr-2 justify-center rounded-full h-12 w-12 bg-slate-200">
          <div className="flex flex-col justify-center text-xl h-full ">U</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
