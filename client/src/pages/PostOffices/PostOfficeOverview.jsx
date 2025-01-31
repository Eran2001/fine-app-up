import { motion } from 'framer-motion';
import { FaRegBuilding, FaHandHoldingUsd, FaTools } from 'react-icons/fa';

const PostOfficeOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        className="p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl text-white relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="flex items-center space-x-4">
          <FaRegBuilding className="text-4xl" />
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Welcome Back! 👋</h1>
            <p className="text-emerald-100 text-lg">Manage citizen fines and system reports efficiently</p>
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
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <FaHandHoldingUsd size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Process Fines</h3>
          </div>
          <p className="text-gray-600">Handle citizen fine payments securely and efficiently through our system.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
              <FaTools size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">System Support</h3>
          </div>
          <p className="text-gray-600">Report technical issues and maintain smooth system operations.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostOfficeOverview;
