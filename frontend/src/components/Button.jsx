import React from "react";

const Button = ({ label }) => {
  return (
    <div>
      <button className=" text-slate-50 bg-indigo-950 rounded-lg py-1">
        {label}
      </button>
    </div>
  );
};

export default Button;
