import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaUserPlus,
} from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    licenseID: "",
    phone_number: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const licensePattern = /^(B\d{7}|\d{9}[VX])$/;
    if (!licensePattern.test(formData.licenseID)) {
      alert("Invalid License ID!");
      return;
    }

    const phonePattern = /^07\d{8}$/;
    if (!phonePattern.test(formData.phone_number)) {
      alert("Invalid phone number!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
        alert("Successfully Login");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-20 animate-gradient-x relative overflow-hidden">
      <Navbar />
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative">
        <h1 className="text-5xl font-bold text-center mt-10 mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x drop-shadow-sm flex items-center justify-center gap-4">
          <FaUserPlus className="text-blue-600" />
          Create Your Account
        </h1>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 rounded-2xl blur-3xl opacity-20 transform -rotate-6 animate-pulse"></div>
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:border-blue-200"
          >
            <div className="flex gap-x-6 mb-6">
              <div className="w-full relative group">
                <label className="absolute left-5 -top-3 bg-white px-2 text-sm font-medium text-blue-700 transition-all duration-300 flex items-center gap-2">
                  <FaUser className="text-blue-500" /> First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full h-12 px-5 py-3 bg-white leading-7 text-base font-normal text-gray-800 border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="w-full relative group">
                <label className="absolute left-5 -top-3 bg-white px-2 text-sm font-medium text-blue-700 transition-all duration-300 flex items-center gap-2">
                  <FaUser className="text-blue-500" /> Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full h-12 px-5 py-3 bg-white leading-7 text-base font-normal text-gray-800 border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="relative mb-6">
              <label className="absolute left-5 -top-3 bg-white px-2 text-sm font-medium text-blue-700 transition-all duration-300 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-12 px-5 py-3 bg-white leading-7 text-base font-normal text-gray-800 border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="relative mb-6">
              <label className="absolute left-5 -top-3 bg-white px-2 text-sm font-medium text-blue-700 transition-all duration-300 flex items-center gap-2">
                <FaIdCard className="text-blue-500" /> License ID
              </label>
              <input
                type="text"
                name="licenseID"
                value={formData.licenseID}
                onChange={handleChange}
                className="block w-full h-12 px-5 py-3 bg-white leading-7 text-base font-normal text-gray-800 border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
                placeholder="Enter your license ID"
              />
            </div>

            <div className="relative mb-6">
              <label className="absolute left-5 -top-3 bg-white px-2 text-sm font-medium text-blue-700 transition-all duration-300 flex items-center gap-2">
                <FaPhone className="text-blue-500" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="block w-full h-12 px-5 py-3 bg-white leading-7 text-base font-normal text-gray-800 border-2 border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              className="group relative overflow-hidden w-full h-12 shadow-lg rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all duration-300 text-white text-base font-semibold leading-7 hover:scale-[1.02] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <FaUserPlus className="text-xl" />
              <span className="relative z-10">Register</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <p className="mt-6 text-sm text-gray-600 text-center">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-indigo-600 font-medium hover:underline transition-colors duration-300"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
