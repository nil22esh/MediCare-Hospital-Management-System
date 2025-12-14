import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const [doctorsData, setDoctorsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/admin/all-doctors",
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      // console.log("res---->", data);
      if (data.success) {
        setDoctorsData(data.doctors);
      } else {
        toast.error("Failed to fetch doctors data");
      }
    } catch (error) {
      console.log("Error in fetching doctors data:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in fetching doctors data");
      }
    }
  };

  const changeAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/change-availability",
        { doctorId: doctorId },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (data.success) {
        // console.log("data--->", data);
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error("Failed to change availability");
      }
    } catch (error) {
      console.log("Error in changeAvailability:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in changeAvailability");
      }
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/all-appointments`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      // console.log("data----->>>", data.appointments);
      if (data.success) {
        toast.success(data.message);
        setAppointmentsData(data.appointments);
      } else {
        toast.error("Failed to get all Appointments");
      }
    } catch (error) {
      console.log("Error in getAllAppointments:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Not able to get all appointments");
      }
    }
  };

  const cancelAppointment = async (id) => {
    try {
      if (!adminToken) {
        toast.error("please login to cancel an appointment");
        navigate("/login");
      }
      const { data } = await axios.put(
        `${backendUrl}/api/v1/admin/cancel-appointment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllAppointments();
        await getDashBoardData();
      } else {
        toast.error("Failed to cancel an Appointment");
      }
    } catch (error) {
      console.log("Error in cancelAppointment:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Not able to cancel appointment");
      }
    }
  };

  const getDashBoardData = async () => {
    try {
      if (!adminToken) {
        toast.error("please login to cancel an appointment");
        navigate("/login");
      }
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/get-admin-dashboard`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      // console.log("data", data.dashBoardData);
      if (data.success) {
        toast.success(data.message);
        setDashboardData(data.dashBoardData);
      } else {
        toast.error("Failed to cancel an Appointment");
      }
    } catch (error) {
      console.log("Error in getDashBoardData:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Not able to get dashboard data, please try again later");
      }
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctorsData,
    getDashBoardData,
    dashboardData,
    cancelAppointment,
    appointmentsData,
    getAllAppointments,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
