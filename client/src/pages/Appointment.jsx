import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { doctors, currencySymbol, backendUrl, getDoctersData, userToken } =
    useContext(AppContext);
  const [docterInfo, setDocterInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [notes, setNotes] = useState("");
  const { docId } = useParams();
  const navigate = useNavigate();

  const fetchDocterInfo = async () => {
    const docterInfo = doctors.find((doc) => doc._id === docId);
    setDocterInfo(docterInfo);
    console.log(docterInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    // get cuurent date first
    const today = new Date();
    // from today take next 7 days date
    for (let i = 0; i < 33; i++) {
      const currDate = new Date(today);
      currDate.setDate(currDate.getDate() + i);
      // settting end time with date
      const endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(23, 59, 59, 59);
      // setting start time with date
      if (currDate.getDate() === today.getDate()) {
        currDate.setHours(today.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currDate),
          time: formattedTime,
        });
        // increment currtime by 30 min
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    try {
      if (!userToken) {
        toast.warn("Please login to book an appointment");
        return navigate("/login");
      }
      if (!slotTime) {
        toast.warn("Please select a time slot");
        return;
      }
      const selectedDate = docSlots[slotIndex][0].dateTime;
      let day = selectedDate.getDate();
      let month = selectedDate.getMonth() + 1;
      let year = selectedDate.getFullYear();
      const slotDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      // console.log("slotdate------->", slotDate);
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/book-appointment`,
        { docId, slotDate, slotTime, notes },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctersData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in bookAppointment:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Not able to book appointment, please try again later");
      }
    }
  };

  useEffect(() => {
    fetchDocterInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docterInfo]);

  useEffect(() => {
    // console.log(docSlots);
  }, [docSlots]);

  return (
    docterInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docterInfo?.image}
              alt="img"
            />
          </div>
          <div className="flex-1 border border-gray-500 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docterInfo?.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-500">
              <p>
                {docterInfo?.degree} - {docterInfo?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docterInfo?.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="w-4" src={assets.info_icon} alt="about" />
              </p>
              <p className="text-sm text-gray-600 max-w-[900] mt-1">
                {docterInfo?.about}
              </p>
            </div>
            <p className="text-gray-900 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-500">
                {currencySymbol}
                {docterInfo?.fees}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-800">
          <p>Booking Slots</p>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-500 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setSlotIndex(index)}
                >
                  <p>{daysOfWeek[slot[0].dateTime.getDay()]}</p>
                  <p>{slot[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((slot, index) => {
                const d = slot.dateTime;
                const dateStr = `${d.getFullYear()}-${String(
                  d.getMonth() + 1
                ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                const bookedSlots = docterInfo?.slots_booked?.[dateStr] || [];
                const isBooked = bookedSlots.includes(slot.time);
                return (
                  <p
                    key={index}
                    className={`text-sm font-light flex-shrink-0 py-2 px-5 rounded-full transition-all duration-300 
                      ${
                        isBooked
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : slot.time === slotTime
                          ? "bg-primary text-white cursor-pointer"
                          : "border border-gray-500 cursor-pointer hover:bg-primary hover:text-white"
                      }`}
                    onClick={() => !isBooked && setSlotTime(slot.time)}
                  >
                    {slot.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <div className="mt-5">
            <label
              htmlFor="notes"
              className="block mb-1.5 text-sm font-semibold text-gray-700"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Write any symptoms or details for the doctor..."
              className="
      w-full rounded-xl bg-white border border-gray-300
      px-3 py-2 text-sm text-gray-800
      shadow-sm
      focus:border-primary focus:ring-2 focus:ring-primary/30
      transition-all duration-200
      resize-none
      hover:border-gray-400
    "
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-medium px-14 py-3 rounded-full my-6 hover:bg-primary hover:scale-105 transition-all duration-300 "
          >
            Book An Appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docterInfo?.speciality} />
      </div>
    )
  );
};

export default Appointment;
