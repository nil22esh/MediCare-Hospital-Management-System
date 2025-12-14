import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
  );

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/get-user-profile`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log("userdata----", data);
      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in getUserData:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in getUserData");
      }
    }
  };

  const getDoctersData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/get-doctors-list`
      );
      if (data.success) {
        toast.success(data.message);
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in getDoctorsData:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in getDoctorsData");
      }
    }
  };

  useEffect(() => {
    getDoctersData();
  }, []);

  useEffect(() => {
    if (userToken) {
      getUserData();
    } else {
      setUserData(false);
    }
  }, [userToken]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    getDoctersData,
    userToken,
    setUserToken,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
