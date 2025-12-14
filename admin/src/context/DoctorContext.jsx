import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [profileData, setProfileData] = useState(false);
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : ""
  );

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getMyAppointments = async () => {
    try {
      if (!doctorToken) {
        toast.error("Please login to view your appointments");
        navigate("/login");
      }
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/get-all-my-appointments`,
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      console.log(data.appointments);
      if (!data.success) {
        toast.error(data.message || "Failed to fetch appointments");
        return;
      }
      toast.success(data.message);
      setAppointments(data.appointments);
    } catch (error) {
      console.log("Error in getMyAppointments:", error);
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

  const confirmAppointment = async (id) => {
    try {
      if (!doctorToken) {
        toast.error("please login to perform this action");
        navigate("/login");
        return;
      }
      const { data } = await axios.put(
        `${backendUrl}/api/v1/doctor/confirm-appointment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (!data.success) {
        toast.error(data.message || "Failed to confirm appointment");
        return;
      }
      toast.success(data.message);
      await getMyAppointments();
      await getDashboardData();
    } catch (error) {
      console.log("Error in confirmAppointment:", error);
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

  const cancelAppointment = async (id) => {
    try {
      if (!doctorToken) {
        toast.error("please login to perform this action");
        navigate("/login");
      }
      const { data } = await axios.put(
        `${backendUrl}/api/v1/doctor/cancel-appointment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (!data.success) {
        toast.error(data.message || "Failed to cancel appointment");
        return;
      }
      toast.success(data.message);
      await getMyAppointments();
      await getDashboardData();
    } catch (error) {
      console.log("Error in cancelAppointment:", error);
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

  const getDashboardData = async () => {
    try {
      if (!doctorToken) {
        toast.error("please login to perform this action");
        navigate("/login");
        return;
      }
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/get-doctor-dashboard`,
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (!data.success) {
        toast.error(data.message || "Failed to fetch dashboard data");
        return;
      }
      toast.success(data.message);
      console.log("dashdata------->", data.doctorDashboard);
      setDashboardData(data.doctorDashboard);
    } catch (error) {
      console.log("Error in getDashboardData:", error);
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

  const getMyProfileData = async () => {
    try {
      if (!doctorToken) {
        toast.error("please login to perform this action");
        navigate("/login");
        return;
      }
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/get-doctor-profile`,
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (!data.success) {
        toast.error(data.message || "Failed to fetch doctor profile data");
        return;
      }
      toast.success(data.message);
      // console.log("docData------->", data.doctor);
      setProfileData(data.doctor);
    } catch (error) {
      console.log("Error in getMyProdileData:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again later");
      }
    }
  };

  const value = {
    backendUrl,
    doctorToken,
    setDoctorToken,
    appointments,
    getMyAppointments,
    setAppointments,
    cancelAppointment,
    confirmAppointment,
    getDashboardData,
    dashboardData,
    setDashboardData,
    getMyProfileData,
    profileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
