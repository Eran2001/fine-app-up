import { motion } from 'framer-motion';
import { FaUserShield, FaUsers, FaRegBuilding, FaTools } from 'react-icons/fa';

const Overview = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Manage Officers",
      description: "Add and manage traffic officers efficiently"
    },
    {
      icon: <FaRegBuilding />,
      title: "Post Offices",
      description: "Control post office registrations and operations"
    },
    {
      icon: <FaTools />,
      title: "System Management",
      description: "Monitor and resolve reported system issues"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        className="p-8 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl shadow-xl text-white relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="flex items-center space-x-4">
          <FaUserShield className="text-4xl" />
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Welcome, Admin! 👋</h1>
            <p className="text-red-100 text-lg">Manage your system and users from one central dashboard</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl shadow-md text-center"
      >
        <p className="text-gray-600">
          Maintain system integrity and ensure smooth operations across all modules
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Overview;