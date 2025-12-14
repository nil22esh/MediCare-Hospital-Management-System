import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, userToken, getDoctersData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const naigate = useNavigate();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getUserAppointments = async () => {
    try {
      if (!userToken) {
        toast.error("Please login to view your appointments");
      }
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/appointments-list`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        // console.log("res-----", data.appointments);
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in getUserAppointments:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Not able to fetch appointments, please try again later");
      }
    }
  };

  const cancelAppointment = async (appointmentId) => {
    // console.log(appointmentId);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/user/cancel-appointment/${appointmentId}`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in cancelAppointment:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to cancel appointment, please try again later");
      }
    }
  };

  const initializeRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Medicare Hospital Management System Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.put(
            `${backendUrl}/api/v1/user/verify-payment`,
            { razorpay_order_id: response.razorpay_order_id },
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          if (data.success) {
            toast.success("Payment successfully completed");
            getUserAppointments();
            naigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log("Error in verifyAppointmentPayment:", error);
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Unable to verify payment, please try again later");
          }
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const makeAppointmentPayment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/v1/user/razorpay-payment-appointment/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      if (data.success) {
        initializeRazorpay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in makeAppointmentPayment:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to make payment, please try again later");
      }
    }
  };

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return `${dateArray[2]} ${months[parseInt(dateArray[1])]} ${dateArray[0]}`;
  };

  useEffect(() => {
    if (userToken) {
      getUserAppointments();
    }
  }, [userToken]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments &&
          appointments.map((doc, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={doc.docData.image}
                  alt="doc_img"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {doc.docData.name}
                </p>
                <p>{doc.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1 ">Address:</p>
                <p className="text-xs">{doc.docData.address.line1}</p>
                <p className="text-xs">{doc.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span>Date & Time: </span>
                  {slotDateFormat(doc.slotDate)} || {doc.slotTime}
                </p>
                {doc.notes ? (
                  <>
                    <p className="text-zinc-700 font-medium mt-1 ">Notes:</p>
                    <p className="text-xs">{doc.notes}</p>
                  </>
                ) : null}
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-center">
                {doc.appointmentStatus === "completed" && (
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
                {doc.appointmentStatus !== "completed" &&
                  doc.appointmentStatus !== "cancelled" &&
                  doc.paymentStatus === "paid" && (
                    <button
                      disabled
                      className="text-sm text-green-600 border border-green-400 bg-green-50 px-6 py-2 rounded-2xl read-only: sm:min-w-54 font-medium cursor-not-allowed transition-all duration-300"
                    >
                      Payment Done
                    </button>
                  )}
                {doc.appointmentStatus !== "cancelled" &&
                  doc.appointmentStatus !== "completed" &&
                  doc.paymentStatus !== "paid" && (
                    <button
                      onClick={() => makeAppointmentPayment(doc._id)}
                      className="text-sm text-stone-500 text-center rounded-2xl sm:min-w-54 py-2 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-500"
                    >
                      Pay Online
                    </button>
                  )}
                {doc.appointmentStatus !== "cancelled" &&
                  doc.appointmentStatus !== "completed" && (
                    <button
                      onClick={() => cancelAppointment(doc._id)}
                      className="text-sm text-stone-500 text-center rounded-2xl sm:min-w-54 py-2 border cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-500"
                    >
                      Cancel Appointment
                    </button>
                  )}
                {doc.appointmentStatus === "cancelled" && (
                  <button
                    disabled
                    className="text-sm text-red-500 text-center rounded-2xl sm:min-w-54 py-2 border
               border-red-400 bg-red-100 cursor-not-allowed"
                  >
                    Appointment Is Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
