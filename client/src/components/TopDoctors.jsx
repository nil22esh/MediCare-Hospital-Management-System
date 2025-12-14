import React, { useContext } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">
        Top And Best Doctors To Book Appointment
      </h1>
      <p className="sm:w-1/3 text-sm text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doc, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-100" src={doc.image} alt={doc.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center">
                <p
                  className={`w-2 h-2 rounded-full ${
                    doc.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></p>{" "}
                <p
                  className={`${
                    doc.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {doc.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
              <p className="text-gray-600 text-xs font-medium">
                {doc.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className=" bg-blue-500 px-12 py-3 rounded-full text-white text-sm font-medium mt-10 hover:scale-105 transition-all duration-300"
      >
        View All Doctors...
      </button>
    </div>
  );
};

export default TopDoctors;
