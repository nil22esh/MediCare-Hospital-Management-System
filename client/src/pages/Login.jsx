import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { userToken, setUserToken, backendUrl } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/${
          state === "Sign Up" ? "register-user" : "login-user"
        }`,
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        localStorage.setItem("userToken", data.userToken);
        setUserToken(data.userToken);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in onSubmitHandler:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error while logging in...");
      }
    }
  };

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </p>
          <p>
            Please {state === "Sign Up" ? "Create Account" : "Log In"} to book
            an appointment!
          </p>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-400 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="fullname"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-400 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              placeholder="Enter your email id"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-400 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Phone</p>
              <input
                className="border border-zinc-400 rounded w-full p-2 mt-1"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="text-base mt-2 text-white w-full py-2 rounded-md bg-primary"
          >
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an Account?{" "}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState("Login")}
              >
                Log In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
