import React, { useEffect, useRef, useState } from "react";
import { checkAuth } from "../utils/checkAuth";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userDetails = checkAuth();
  const modalRef = useRef(null);
  const initial1 = userDetails.firstName[0].toUpperCase();
  const initial2 = userDetails.lastName[0].toUpperCase();
  const handleModalChange = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="flex shadow h-14 justify-between">
      <div className="head flex text-xl font-bold flex-col justify-center h-full ml-4">
        Payment App
      </div>
      <div className="flex justify-center">
        <div className="profile flex flex-col text-xl justify-center h-full mr-4">
          Hello,
        </div>
        <div
          className={`${
            isModalOpen ? "border-2 border-gray-700" : ""
          } flex mt-1 mr-2 justify-center rounded-full h-12 w-12 bg-slate-200 cursor-pointer relative`}>
          <div
            onClick={handleModalChange}
            className=" flex flex-col justify-center text-xl h-full">
            {initial1} {initial2}
          </div>
          {isModalOpen && (
            <div
              ref={modalRef}
              className=" min-w-48 flex flex-col border-4 border-gray-600 absolute -bottom-32 -left-40 z-10 bg-gray-200 text-gray-700 rounded-xl px-2 py-3">
              <div className=" flex my-2 justify-center font-bold">
                {/* <span className=" mx-4">User :</span> */}
                {`${userDetails?.firstName} ${userDetails.lastName}`}
              </div>
              <Button label={"Sign out"} onPress={handleSignOut} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
