import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/index";
import { notifyError, notifySuccess } from "../utils/notify";
import { checkAuth } from "../utils/checkAuth";

export const SendLoader = () => {
  if (checkAuth()) {
    return null;
  }
  return redirect("/signin");
};

const Send = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("user");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const sendMoneyReq = async () => {
    if (amount < 1) {
      notifyError("Min amount should be more than ₹1");
      return;
    }
    try {
      const endpoint = "/api/v1/account/transfer";
      const transactionInfo = {
        to: userId,
        amount,
      };
      const response = await api.post(endpoint, transactionInfo);
      if (response.status >= 200 && response.status < 300) {
        notifySuccess(`Amount ${amount} transfered successfully`);
        navigate("/dashboard");
      }
    } catch (error) {
      notifyError("Transfer unsuccessful! Please try again");
      console.log(error);
    }
  };

  return (
    <div class="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col space-y-1.5 p-6">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span class="text-2xl text-white">
                  {userName && userName[0]}
                </span>
              </div>
              <h3 class="text-2xl font-semibold">{userName}</h3>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount">
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={sendMoneyReq}
                class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
