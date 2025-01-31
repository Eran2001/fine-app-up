import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { motion } from "framer-motion";

const Officers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div
          className="relative bg-cover bg-center bg-fixed transform transition-all duration-500"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('off.png')",
            height: "70vh",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
              <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-xl">
                Officers Portal
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-8 home tracking-tight">
              Welcome Officers
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Access your dashboard to manage violations and maintain road safety.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(4, 56, 228, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#0438e4] to-[#070250] text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 text-lg"
              onClick={() => navigate("/officersLogin")}
            >
              Officer Login
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Officers;
