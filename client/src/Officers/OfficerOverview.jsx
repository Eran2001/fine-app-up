import { motion } from 'framer-motion';
import { FaUserShield, FaFileInvoiceDollar, FaBug } from 'react-icons/fa';

const OfficerOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        className="p-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl text-white relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="flex items-center space-x-4">
          <FaUserShield className="text-4xl" />
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Welcome, Officer! 👋</h1>
            <p className="text-purple-100 text-lg">Manage fines and maintain law and order efficiently</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FaFileInvoiceDollar size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Issue Fines</h3>
          </div>
          <p className="text-gray-600">Create and manage fine tickets for traffic violations and other offenses.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <FaBug size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">System Support</h3>
          </div>
          <p className="text-gray-600">Report technical issues and ensure smooth system operations.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OfficerOverview;
