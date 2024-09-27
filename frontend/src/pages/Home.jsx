import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-gray-700 mb-6">
        Welcome to the X Pay
      </div>
      <div className="text-lg text-gray-600 mb-8">
        Register to get started...
      </div>
      <div className="flex space-x-4">
        <div className=" px-2 py-1 flex justify-center items-center">
          New here?
          <span onClick={handleSignUp} className=" mx-1 hover:underline">
            Register
          </span>
        </div>
        <Button onPress={handleSignIn} label={"Sign In"} />
      </div>
    </div>
  );
};

export default Home;
