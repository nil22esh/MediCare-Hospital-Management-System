import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { userToken, setUserToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
  };

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-2 border-b border-b-gray-300">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {userToken && userData ? (
          <div className="flex items-center gap-2 curoir-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="profile"
            />
            <img
              className="w-3"
              src={assets.dropdown_icon}
              alt="dropdown_icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z:20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-medium hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          className="w-6 md:hidden"
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt="menu_icon"
        />
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="logo" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="cross_icon"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 rounded inline-block bg-zinc-50 hover:bg-zinc-200 transition-all duration-200 hover:scale-110">
                Home
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 rounded inline-block bg-zinc-50 hover:bg-zinc-200 transition-all duration-200 hover:scale-110">
                All Doctors
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 rounded inline-block bg-zinc-50 hover:bg-zinc-200 transition-all duration-200 hover:scale-110">
                About Us
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 rounded inline-block bg-zinc-50 hover:bg-zinc-200 transition-all duration-200 hover:scale-110">
                Contact Us
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
