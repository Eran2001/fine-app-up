import { motion } from 'framer-motion';
import { FaClipboardCheck, FaBell } from 'react-icons/fa';

const UserOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        className="p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl text-white relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <h1 className="text-4xl font-extrabold mb-4">Welcome Back! 👋</h1>
        <p className="text-blue-100 text-lg">Your one-stop dashboard for managing fines and reports</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <FaClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Pay Fines</h3>
          </div>
          <p className="text-gray-600">Easily manage and pay your fines through our secure payment system.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <FaBell size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Report Issues</h3>
          </div>
          <p className="text-gray-600">Report any system issues or technical problems for quick resolution.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserOverview;
