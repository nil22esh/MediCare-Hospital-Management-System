import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { adminToken, getDashBoardData, dashboardData, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (adminToken) {
      getDashBoardData();
    }
  }, [adminToken]);

  return (
    dashboardData && (
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <img
              src={assets.doctor_icon}
              alt="doctor_icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData.TotalDoctors}
              </p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <img
              src={assets.appointments_icon}
              alt="appointments_icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData.TotalAppointments}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <img
              src={assets.patients_icon}
              alt="patients_icon"
              className="w-14 h-14"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashboardData.TotalUsers}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-white rounded-2xl shadow-sm w-full flex flex-col max-h-[calc(100vh-250px)]">
          <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 border-b bg-white rounded-t-2xl">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="text-lg font-semibold text-gray-800">
              Latest Appointments
            </p>
          </div>
          <div className="max-h-[60vh] overflow-y-auto divide-y">
            {dashboardData.appointments.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center gap-4 px-6 py-4 hover:bg-gray-50 hover:scale-101 transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.docData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)} • {item.slotTime}
                    </p>
                  </div>
                </div>
                {item.appointmentStatus === "completed" && (
                  <button
                    disabled
                    className="w-full sm:w-auto
                        px-4 py-2
                        text-sm font-medium
                        text-gray-900
                        bg-gray-300
                        border border-gray-700
                        rounded-xl
                        cursor-not-allowed"
                  >
                    Appointment Is completed
                  </button>
                )}
                {item.appointmentStatus !== "completed" &&
                  item.appointmentStatus !== "cancelled" &&
                  item.paymentStatus === "paid" && (
                    <button
                      disabled
                      className="text-sm text-green-600 border border-green-400 bg-green-50 px-6 py-2 rounded-2xl read-only: sm:min-w-54 font-medium cursor-not-allowed transition-all duration-300"
                    >
                      Payment Done
                    </button>
                  )}
                {item.appointmentStatus !== "cancelled" &&
                  item.appointmentStatus !== "completed" &&
                  item.paymentStatus !== "paid" && (
                    <button
                      disabled
                      className="text-sm text-stone-500 text-center rounded-2xl sm:min-w-54 py-2 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-500"
                    >
                      Not Paid
                    </button>
                  )}
                {item.appointmentStatus !== "cancelled" &&
                  item.appointmentStatus !== "completed" && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center rounded-2xl sm:min-w-54 py-2 border cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-500"
                    >
                      Cancel Appointment
                    </button>
                  )}
                {item.appointmentStatus === "cancelled" && (
                  <button
                    disabled
                    className="text-sm text-red-500 text-center rounded-2xl sm:min-w-54 py-2 border
               border-red-400 bg-red-100 cursor-not-allowed"
                  >
                    Appointment Is Cancelled
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
