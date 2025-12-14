import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    doctorToken,
    getDashboardData,
    dashboardData,
    cancelAppointment,
    confirmAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (doctorToken) {
      getDashboardData();
    }
  }, [doctorToken]);

  return (
    dashboardData && (
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <StatCard
            icon={assets.earning_icon}
            label="Total Earnings"
            value={`${currency} ${dashboardData.earnings}`}
          />
          <StatCard
            icon={assets.appointments_icon}
            label="Total Appointments"
            value={dashboardData.appointmentsCount}
          />
          <StatCard
            icon={assets.patients_icon}
            label="Total Patients"
            value={dashboardData.patientsCount}
          />
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-sm w-full flex flex-col max-h-[calc(100vh-250px)]">
          <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 border-b bg-white rounded-t-2xl">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="text-lg font-semibold text-gray-800">
              Latest Appointments
            </p>
          </div>

          <div className="max-h-[60vh] overflow-y-auto divide-y">
            {dashboardData.latestAppointments?.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-[2fr_2fr_2fr_1.2fr_1.5fr]
      gap-4 px-6 py-4 items-center hover:bg-gray-50 transition"
              >
                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData.image}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium text-gray-800">
                    {item.docData.name}
                  </p>
                </div>

                {/* Date & Time */}
                <p className="text-sm text-gray-500">
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                </div>

                {/* Payment */}
                {item.paymentStatus === "paid" ? (
                  <StatusBadge label="Paid" variant="greenPaid" />
                ) : (
                  <StatusBadge label="Not Paid" variant="yellow" />
                )}

                {/* Action */}
                <div className="flex justify-center gap-3">
                  {/* {item.appointmentStatus === "completed" ? (
                    <StatusBadge label="Completed" variant="cyan" />
                  ) : null} */}
                  {item.appointmentStatus === "cancelled" ? (
                    <StatusBadge label="Cancelled" variant="gray" />
                  ) : item.appointmentStatus === "confirmed" ? (
                    <StatusBadge label="Confirmed" variant="blue" />
                  ) : item.paymentStatus === "paid" ||
                    item.paymentStatus === "pending" ||
                    item.appointmentStatus === "pending" ? (
                    <>
                      {/* Confirm */}
                      <button
                        onClick={() => confirmAppointment(item._id)}
                        className="
          px-4 py-2 text-sm font-medium
          text-blue-700 bg-blue-50
          border border-blue-300
          rounded-lg
          hover:bg-blue-100 hover:border-blue-400
          focus:outline-none focus:ring-2 focus:ring-blue-200
          transition-all duration-200
        "
                      >
                        Confirm
                      </button>

                      {/* Cancel */}
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="
          px-4 py-2 text-sm font-medium
          text-red-700 bg-red-50
          border border-red-300
          rounded-lg
          hover:bg-red-100 hover:border-red-400
          focus:outline-none focus:ring-2 focus:ring-red-200
          transition-all duration-200
        "
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
    <img src={icon} alt={label} className="w-14 h-14" />
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const StatusBadge = ({ label, variant }) => {
  const variants = {
    greenPaid:
      "w-24 px-5 py-1 text-sm font-semibold rounded-lg border text-green-600 bg-green-50 border-green-300",
    green: "text-green-600 bg-green-50 border-green-300",
    yellow:
      "w-24 px-5 py-1 text-sm font-semibold rounded-lg border text-yellow-600 bg-yellow-50 border-yellow-300",
    gray: "text-gray-500 bg-gray-100 border-gray-300",
    blue: "text-blue-600 bg-blue-50 border-blue-300",
    cyan: "text-cyan-600 bg-cyan-50 border-cyan-300",
  };

  return (
    <span
      className={`px-4 py-1 text-sm font-medium border rounded-xl ${variants[variant]}`}
    >
      {label}
    </span>
  );
};

export default DoctorDashboard;
