import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    getMyProfileData,
    profileData,
    setProfileData,
    backendUrl,
    doctorToken,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (doctorToken) {
      getMyProfileData();
    }
  }, [doctorToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const updateData = {
        name: profileData.name,
        speciality: profileData.speciality,
        degree: profileData.degree,
        fees: profileData.fees,
        experience: profileData.experience,
        about: profileData.about,
        address: profileData.address,
        available: profileData.available,
      };
      const { data } = await axios.put(
        `${backendUrl}/api/v1/doctor/update-doctor-profile`,
        updateData,
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
      );

      if (!data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success(data.message || "Profile updated successfully");
      setProfileData(data.doctor || profileData);
      setIsEdit(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (!profileData) return null;

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-48 h-60 rounded-xl object-cover bg-indigo-100"
          />

          {/* Info */}
          <div className="flex-1 space-y-3">
            {/* Name */}
            {isEdit ? (
              <input
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
            )}

            {/* Degree & Speciality */}
            {isEdit ? (
              <div className="flex gap-2">
                <input
                  name="degree"
                  value={profileData.degree}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  name="speciality"
                  value={profileData.speciality}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {profileData.degree} - {profileData.speciality}
              </p>
            )}

            {/* Experience */}
            {isEdit ? (
              <input
                type="number"
                name="experience"
                value={profileData.experience}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-500">
                {profileData.experience} Years Experience
              </p>
            )}

            {/* About */}
            <div>
              <h3 className="font-semibold">About</h3>
              {isEdit ? (
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                />
              ) : (
                <p className="text-sm text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Fees */}
            {isEdit ? (
              <input
                type="number"
                name="fees"
                value={profileData.fees}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>
                <b>Fee:</b> {currency} {profileData.fees}
              </p>
            )}

            {/* Address */}
            {isEdit ? (
              <>
                <input
                  name="line1"
                  value={profileData.address.line1}
                  onChange={handleAddressChange}
                  className="input-field"
                />
                <input
                  name="line2"
                  value={profileData.address.line2}
                  onChange={handleAddressChange}
                  className="input-field"
                />
              </>
            ) : (
              <p className="text-sm text-gray-600">
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            )}

            {/* Availability */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  setProfileData((p) => ({
                    ...p,
                    available: !p.available,
                  }))
                }
              />
              Available
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {isEdit ? (
            <>
              <button onClick={handleUpdateProfile} className="btn-primary">
                Save Changes
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEdit(true)} className="btn-primary">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
