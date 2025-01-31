import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaIdCard, FaSignInAlt, FaLock } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import BASE_URL from '../../config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    licenseId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("licenseId");

    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("licenseId", formData.licenseId);
      navigate("/user-dashboard");
    } else {
      alert("Invalid email or license ID");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 bg-[size:400%] animate-gradient"
    >
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="max-w-md mx-auto"
        >
          <motion.div 
            className="text-center mb-10"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h1>
            <p className="text-gray-600 mt-3 text-lg">Sign in to access your account</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <FaLock className="text-6xl text-blue-600" />
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 transition-all duration-300 hover:shadow-indigo-200/50"
            whileHover={{ y: -5 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-5">
              <div>
                <label className="text-gray-700 font-medium mb-2 block text-lg">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors">
                    <FaEnvelope />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-lg bg-white/50 backdrop-blur-sm hover:border-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block text-lg">License ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors">
                    <FaIdCard />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="licenseId"
                    placeholder="Enter your license ID"
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-lg bg-white/50 backdrop-blur-sm hover:border-blue-300"
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-medium"
            >
              <FaSignInAlt />
              <span>Sign In</span>
            </motion.button>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-lg">
                Don&apos;t have an account?{" "}
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link 
                    to="/register" 
                    className="text-blue-600 hover:text-indigo-600 font-medium transition-colors"
                  >
                    Register here
                  </Link>
                </motion.span>
              </p>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-gray-500 text-base"
          >
            Protected by our secure login system
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
