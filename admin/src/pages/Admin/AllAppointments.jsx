import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "./../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const {
    appointmentsData,
    getAllAppointments,
    adminToken,
    cancelAppointment,
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.3fr_3fr_1fr_3fr_3fr_0.9fr_1.3fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Cancel Appointment</p>
        </div>
        {appointmentsData &&
          appointmentsData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.3fr_3fr_1fr_3fr_3fr_0.9fr_1.3fr] items-center text-gray-500 py-3 px-6 transition-all duration-300 border-b hover:bg-gray-100 hover:scale-101"
            >
              <p className="max-sm:hidden">{idx + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={item.userData.image}
                  alt="user_profile"
                />{" "}
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full bg-gray-300"
                  src={item.docData.image}
                  alt="doctor_profile"
                />{" "}
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.appointmentStatus !== "cancelled" ? (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-6 py-2 text-sm font-medium 
               text-red-600 bg-red-50 
               border border-red-300 
               rounded-xl 
               hover:bg-red-100 
               transition-all duration-300"
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="px-6 py-2 text-sm font-medium 
               text-gray-500 bg-gray-100 
               border border-gray-300 
               rounded-xl 
               cursor-not-allowed 
               transition-all duration-300"
                >
                  Cancelled
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAppointments;
