import React, { useContext } from "react";
import { assets } from "./../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (adminToken) {
      adminToken && setAdminToken("");
      adminToken && localStorage.removeItem("adminToken");
    } else {
      doctorToken && setDoctorToken("");
      doctorToken && localStorage.removeItem("doctorToken");
    }
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-sm">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="admin_logo"
        />
        <p className="border-2 px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
