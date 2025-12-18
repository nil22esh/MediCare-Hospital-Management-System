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
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (doctorToken) getMyProfileData();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", profileData.name);
      formData.append("speciality", profileData.speciality);
      formData.append("degree", profileData.degree);
      formData.append("fees", profileData.fees);
      formData.append("experience", profileData.experience);
      formData.append("about", profileData.about);
      formData.append("available", profileData.available);
      formData.append("address", JSON.stringify(profileData.address));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.put(
        `${backendUrl}/api/v1/doctor/update-doctor-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success("Profile updated successfully");

      // Reset edit state and preview
      setIsEdit(false);
      setImageFile(null);
      setPreviewImage("");

      // Refetch the profile data to get the latest information from the server
      await getMyProfileData();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!profileData) return null;

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-48">
            <img
              src={previewImage || profileData.image}
              alt={profileData.name}
              className="w-48 h-60 rounded-xl object-cover bg-indigo-100"
            />

            {isEdit && (
              <>
                <label
                  htmlFor="doctorImage"
                  className="absolute bottom-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-lg cursor-pointer text-sm shadow"
                >
                  Edit
                </label>
                <input
                  type="file"
                  id="doctorImage"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>

          <div className="flex-1 space-y-3">
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

            {isEdit ? (
              <>
                <input
                  name="line1"
                  value={profileData.address.line1}
                  onChange={handleAddressChange}
                  className="input-field"
                  placeholder="Address Line 1"
                />
                <input
                  name="line2"
                  value={profileData.address.line2}
                  onChange={handleAddressChange}
                  className="input-field"
                  placeholder="Address Line 2"
                />
              </>
            ) : (
              <p className="text-sm text-gray-600">
                {profileData.address.line1}
                <br />
                {profileData.address.line2}
              </p>
            )}

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
                disabled={!isEdit}
              />
              Available
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {isEdit ? (
            <>
              <button onClick={handleUpdateProfile} className="btn-primary">
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setPreviewImage("");
                  setImageFile(null);
                  // Refetch to reset any unsaved changes
                  getMyProfileData();
                }}
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
