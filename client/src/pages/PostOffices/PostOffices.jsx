import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegBuilding, FaUserLock, FaClipboardList, FaChartLine, FaUsers, FaGlobe } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="backdrop-blur-lg bg-white/90 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
  >
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-lg inline-block mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center p-6"
  >
    <h4 className="text-4xl font-bold text-blue-600 mb-2">{number}+</h4>
    <p className="text-gray-600">{label}</p>
  </motion.div>
);

const PostOffices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('pp.png')",
          height: "85vh",
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMTUiPjwvcmVjdD4KPC9zdmc+')] opacity-30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-7xl font-bold mb-6 tracking-tight leading-tight">
              Welcome to<br/>
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Post Office Portal
              </span>
            </h1>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                onClick={() => navigate("/post-office-login")}
              >
                <FaUserLock className="text-xl" />
                Post Office Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="1000" label="Active Post Offices" />
            <StatCard number="50K" label="Daily Transactions" />
            <StatCard number="95" label="Satisfaction Rate" />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FaRegBuilding />}
            title="Centralized Management"
            description="Access all your postal services from one unified platform"
          />
          <FeatureCard
            icon={<FaClipboardList />}
            title="Fine Processing"
            description="Efficiently handle and process fines with automated systems"
          />
          <FeatureCard
            icon={<FaUserLock />}
            title="Secure Access"
            description="Protected portal with advanced security measures"
          />
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-4 py-16 mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-white shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of post offices already benefiting from our digital platform
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/post-office-login")}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PostOffices;
