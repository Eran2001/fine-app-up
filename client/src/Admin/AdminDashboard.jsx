import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaChartBar, FaFileInvoiceDollar, FaUserTie, FaRegBuilding, FaExclamationCircle, FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const menuItems = [
    { path: "/", icon: <FaHome />, text: "Home" },
    { path: "overview", icon: <FaChartBar />, text: "Overview" },
    { path: "fines", icon: <FaFileInvoiceDollar />, text: "Fines" },
    { path: "officer", icon: <FaUserTie />, text: "Officer" },
    { path: "post-office", icon: <FaRegBuilding />, text: "Post Office" },
    { path: "reported-issues", icon: <FaExclamationCircle />, text: "Reported Issues" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-red-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white/80 backdrop-blur-md shadow-xl rounded-r-2xl flex flex-col justify-between"
      >
        <div>
          <div className="p-6 text-xl font-bold text-red-800 border-b border-gray-100">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Admin Dashboard
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
                  className="flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
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
              to="/adminLogin"
              className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-center rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
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
              className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"
            >
              Logo
            </Link>
            <div className="space-x-6 flex items-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="setting" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                  <FaCog className="mr-2" />
                  Settings
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="#" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                  <FaUserCircle className="mr-2" />
                  Profile
                </Link>
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
}
