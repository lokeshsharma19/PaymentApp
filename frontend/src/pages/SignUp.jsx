import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [resMsg, setResMsg] = useState("Sign up to get started");

  const navigate = useNavigate();
  const signUpReq = async () => {
    const newUser = {
      firstName,
      lastName,
      username: email,
      password,
    };
    const endpoint = "/api/v1/user/signup";

    try {
      const response = await api.post(endpoint, newUser);
      if (response.status >= 200 && response.status < 300) {
        setResMsg(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setResMsg(error);
    }
  };

  return (
    <div className="wrapper bg-slate-300 flex justify-center h-screen">
      <div className=" flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onPress={(e) => {
                e.preventDefault();
                signUpReq();
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
