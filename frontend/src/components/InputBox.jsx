import React from "react";

const InputBox = ({ label, placeholder }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default InputBox;
