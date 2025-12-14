import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const DoctorsList = () => {
  const { doctorsData, getAllDoctors, adminToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);

  return (
    <div>
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctorsData.map((doctor, index) => (
            <div
              className="border border-indigo-300 rounded-xl max-w-56 overflow-hidden cursor-pointer shadow-lg group"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={doctor.image}
                alt="doc_image"
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                    id="availability"
                  />
                  <p
                    className={`text-sm ${
                      doctor.available ? "text-green-600" : "text-red-600"
                    }`}
                    htmlFor="availability"
                  >
                    {doctor.available ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
