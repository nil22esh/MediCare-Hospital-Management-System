import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const { adminToken, backendUrl } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [education, setEducation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [role, setRole] = useState("doctor");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        toast.error("please upload doctor image");
      }
      if (!adminToken) {
        toast.error("Not authenticated");
        return;
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", education);
      formData.append("fees", Number(fees));
      formData.append("experience", Number(experience));
      formData.append("about", about);
      formData.append("role", role);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/add-doctor",
        formData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setSpeciality("General Physician");
        setExperience("1");
        setFees("");
        setEducation("");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setRole("doctor");
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.log("Error in addDoctor:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while adding doctor");
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add New Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-5xl max-h-[88vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-800">
          <label htmlFor="doc_img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doc_img"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc_img"
            hidden
          />
          <p>Upload Doctor Profile</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter doctor name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Enter doctor email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Enter doctor password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                name=""
                id=""
                required
              >
                <option value="">-- Select Doctor Experience --</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7">7 years</option>
                <option value="8">8 years</option>
                <option value="9">9 years</option>
                <option value="10">10 years</option>
                <option value="11">11 years</option>
                <option value="12">12 years</option>
                <option value="13">13 years</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter doctor fees"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
                required
              >
                <option value="">-- Select Doctor Type --</option>
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Dentist">Dentist</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Urologist">Urologist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Nephrologist">Nephrologist</option>
                <option value="Rheumatologist">Rheumatologist</option>
                <option value="Allergist">Allergist</option>
                <option value="Radiologist">Radiologist</option>
                <option value="Surgeon">Surgeon</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Education</p>
              <input
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter doctor education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter doctor address line1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2 mt-4"
                type="text"
                placeholder="Enter doctor address line2"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Select Role</p>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="border rounded px-3 py-2"
                name=""
                id=""
                required
              >
                <option value="">-- Select Doctor Experience --</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2 text-gray-600">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Enter something about docter"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary rounded-full text-white px-12 py-4 mt-4 transition-all duration-300 hover:scale-102"
        >
          Add New Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
