import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import OurServices from "../../components/OurServices/OurServices";
import Card from "../../components/Card/Card";
import FeedBack from "../../components/FeedBack/FeedBack";
import Download from "../../components/Download/Download";
import MyMap from "../../components/MyMap/MyMap";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [slideIn, setSlideIn] = useState(false);
  
  const texts = ["Clear Fine", "Save Time", "Save Money", "Stay Safe"];
  const images = [
    "/37a.jpg",
    "/dd.png",
    "/20.jpg",
    "/67.jpg",

    "fine.jpg",
  ];
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 6 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  useEffect(() => {
    const timer = setTimeout(() => setSlideIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(textInterval);
  });

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY <= 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageNavigation = (index) => {
    setImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        className="relative"
      >
        {/* Hero Section */}
        <div className="relative h-[93.5vh] overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={imageIndex}>
            <motion.div
              key={imageIndex}
              custom={imageIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <motion.img 
                src={images[imageIndex]}
                alt={`Hero ${imageIndex + 1}`}
                className="w-full h-full object-cover"
                animate={{
                  scale: [1, 1.1],
                  x: [0, -20],
                  y: [0, -20],
                }}
                transition={{
                  duration: 5,
                  ease: "easeOut",
                  times: [0, 1],
                }}
              />
              
              {/* Enhanced overlays */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Enhanced image navigation dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleImageNavigation(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  idx === imageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Subtle gradient shadow for additional depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        
        {/* Hero Content */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${
          slideIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } transition-all duration-1000 ease-out`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                textShadow: [
                  "0 2px 4px rgba(0,0,0,0.3)",
                  "0 2px 8px rgba(0,0,0,0.2)",
                  "0 2px 4px rgba(0,0,0,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="text-7xl font-bold mb-8 text-white tracking-tight drop-shadow-lg">
                Fine.lk{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={texts[textIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-blue-400"
                  >
                    {texts[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-light text-white leading-relaxed drop-shadow-lg">
                Fine.lk simplifies the process of managing traffic fines for citizens,
              </h2>
              <h2 className="text-3xl font-light text-white leading-relaxed drop-shadow-lg">
                officers, and post offices
              </h2>
            </motion.div>

            {/* Enhanced floating button */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16"
            >
              <Link
                to="/register"
                className="group relative px-10 py-4 bg-blue-500 rounded-full text-white text-lg font-semibold 
                transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-blue-600 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Content Sections with Enhanced Animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 bg-white"
      >
        <OurServices />
        <Card />
        <FeedBack />
        <Download />
        <MyMap />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;