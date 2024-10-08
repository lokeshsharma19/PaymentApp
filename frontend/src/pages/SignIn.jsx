import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import api from "../../api/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/notify";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signInReq = async () => {
    if (!email || !password) {
      notifyError("Enter all the fields!");
    }
    const userObj = {
      username: email,
      password,
    };
    try {
      const endpoint = "/api/v1/user/signin";
      const response = await api.post(endpoint, userObj);
      if (response.status >= 200 && response.status < 300) {
        notifySuccess("Logged-in successfully");
        const token = response?.data?.token;
        localStorage.setItem("token", JSON.stringify(token));
        navigate(`/dashboard`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="xyz...@gmail.com"
            label={"Email"}
            type="email"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
            type={"password"}
          />
          <div className="pt-4">
            <Button
              onPress={(e) => {
                e.preventDefault();
                signInReq();
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
