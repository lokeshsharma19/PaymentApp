import React, { useEffect } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { checkAuth } from "../utils/checkAuth";
import { redirect } from "react-router-dom";

export const DashboardLoader = () => {
  if (checkAuth()) {
    return null;
  }
  return redirect("/signin");
};

const Dashboard = () => {
  return (
    <div className="">
      <hr className="" />
      <Appbar />
      <div className=" m-4">
        <Balance />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
