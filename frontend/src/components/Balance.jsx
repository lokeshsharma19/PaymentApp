import React, { useEffect, useState } from "react";
import api from "../../api/index";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const endpoint = "/api/v1/account/balance";
        const response = await api.get(endpoint);
        if (response.status >= 200 && response.status < 300) {
          setBalance(response?.data?.balance);
        } 
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="flex text-lg">
      <p className=" font-bold">Your Balance</p>
      <p className=" font-semibold ml-4">{balance}</p>
    </div>
  );
};

export default Balance;
