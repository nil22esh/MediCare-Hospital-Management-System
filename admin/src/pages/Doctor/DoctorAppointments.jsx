import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "./../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    doctorToken,
    appointments,
    getMyAppointments,
    cancelAppointment,
    confirmAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (doctorToken) {
      getMyAppointments();
    }
  }, [doctorToken]);

  return (
    <div className="w-full max-w-7xl m-5">
      <p className="mb-3 text-lg font-semibold">My Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80	vh] min-h-[50vh] overflow-y-scroll">
        <div className="hidden sm:grid font-bold grid-cols-[0.4fr_2.2fr_1.4fr_0.8fr_2.4fr_1fr_1fr] gap-3 py-3 px-6 border-b text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>
        {appointments.map((item, idx) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.4fr_2.2fr_1.4fr_0.8fr_2.4fr_1fr_1fr] gap-1 items-center transition-all duration-300 text-gray-700 py-3 px-6 border-b hover:bg-gray-100 hover:scale-101"
            key={idx}
          >
            <p className="max-sm:hidden">{idx + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt="user_image"
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p
                className={`w-24 px-5 py-1 text-sm font-semibold rounded-lg border 
    ${
      item.paymentStatus === "paid"
        ? "text-green-600 bg-green-50 border-green-300"
        : "text-yellow-700 bg-yellow-50 border-yellow-300"
    }`}
              >
                {item.paymentStatus === "paid" ? "Paid" : "Not Paid"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} || {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            <div className="flex items-center gap-3">
              {item.appointmentStatus === "pending" && (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer hover:scale-110 transition"
                  src={assets.cancel_icon}
                  alt="cancel_icon"
                  title="Cancel Appointment"
                />
              )}
              {item.appointmentStatus === "pending" && (
                <img
                  onClick={() => confirmAppointment(item._id)}
                  className="w-10 cursor-pointer hover:scale-110 transition"
                  src={assets.tick_icon}
                  alt="confirm_icon"
                  title="Confirm Appointment"
                />
              )}
              {item.appointmentStatus === "cancelled" && (
                <span className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-lg">
                  Cancelled
                </span>
              )}
              {item.appointmentStatus === "confirmed" && (
                <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 border border-green-300 rounded-lg">
                  Confirmed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
