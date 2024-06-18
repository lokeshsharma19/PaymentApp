import React from "react";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div>
      <span>{label}</span>
      <button className=" underline">{buttonText}</button>
    </div>
  );
};

export default BottomWarning;
