import React from "react";

const InputBox = ({ label, placeholder, onChange, type }) => {
  return (
    <div>
      <div className="text-left">
        <label className="text-sm font-medium py-2" htmlFor={label}>
          {label}
        </label>
      </div>
      <input
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"
        type={type || "text"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
