import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { setDoctorToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/v1/admin/login", {
          email,
          password,
        });
        if (!data.success) {
          toast.error(data.message || "Admin login failed");
          return;
        }
        navigate("/admin-dashboard");
        toast.success(data.message);
        const token = data.adminToken;
        if (!token) {
          toast.error("No token returned from server");
          return;
        }
        localStorage.setItem("adminToken", token);
        setAdminToken(token);
        return;
      } else {
        const { data } = await axios.post(backendUrl + "/api/v1/doctor/login", {
          email,
          password,
        });
        if (!data.success) {
          toast.error(data.message || "Doctor login failed");
          return;
        }
        navigate("/doctor-dashboard");
        toast.success(data.message);
        const token = data.doctorToken;
        if (!token) {
          toast.error("No token returned from server");
          return;
        }
        localStorage.setItem("doctorToken", token);
        setDoctorToken(token);
        return;
      }
    } catch (error) {
      console.log("Error at login:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p className="texxt-sm">Email:</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="please enter your email"
          />
        </div>
        <div className="w-full">
          <p className="texxt-sm">Password:</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="please enter your password"
          />
        </div>
        <button className="bg-primary text-white w-full rounded-md py-2 mt-1 transition-all duration-300 text-base">
          Login as {state}
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
