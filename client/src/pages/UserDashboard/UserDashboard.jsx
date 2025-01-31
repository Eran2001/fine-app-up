import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaHome, FaClipboardList, FaMoneyBill, FaExclamationCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const UserDashboard = () => {
  // Initialize avatar state from localStorage if available
  const savedAvatar = localStorage.getItem("avatar");
  const [avatar, setAvatar] = useState(savedAvatar || "/avatar.jpg");

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar with the uploaded image
        localStorage.setItem("avatar", reader.result); // Save new avatar to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { path: "/", icon: <FaHome />, text: "Home" },
    { path: "user-overview", icon: <FaClipboardList />, text: "Overview" },
    { path: "fine-pay", icon: <FaMoneyBill />, text: "Pay Fine" },
    { path: "report-issue", icon: <FaExclamationCircle />, text: "Report an Issue" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white/80 backdrop-blur-md shadow-xl rounded-r-2xl flex flex-col justify-between"
      >
        <div>
          <div className="p-6 text-xl font-bold text-gray-800 border-b border-gray-100">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Citizen Dashboard
            </motion.span>
          </div>
          <nav className="mt-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              to="/login"
              className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-white/80 backdrop-blur-md shadow-md rounded-b-2xl mb-4"
        >
          <div className="container mx-auto px-6 flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Logo
            </Link>
            <div className="space-x-6 flex items-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <FaCog className="mr-2" />
                  Settings
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 transition-all duration-300">
                  <img
                    src={avatar}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
