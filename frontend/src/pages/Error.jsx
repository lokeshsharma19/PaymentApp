import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Error = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-3xl font-bold text-gray-700 mb-4">
        Something went wrong
      </div>
      <div className="text-lg text-gray-700 mb-8">
        Please try again or return to the dashboard.
      </div>
      <Button onPress={handleReturnToDashboard} label={"Return to Dashboard"} />
    </div>
  );
};

export default Error;
