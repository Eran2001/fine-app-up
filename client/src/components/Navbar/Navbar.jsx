import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getLinkClasses = (path) => {
    return `cursor-pointer px-4 py-2 rounded-xl ${
      isActive(path) ? "text-blue-600 font-semibold bg-blue-50/50" : "text-gray-700"
    } hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 hover:scale-105`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`p-1 fixed w-full left-0 right-0 top-0 flex items-center justify-between backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-[60] transition-all duration-500`}
      style={{
        height: "4rem",
        background: 'linear-gradient(120deg, rgba(255,255,255,0.9), rgba(236,252,255,0.85), rgba(230,242,255,0.9), rgba(238,242,255,0.85))',
        animation: 'gradient 8s ease-in-out infinite'
      }}
    >
      {/* Logo Section */}
      <div
        className="flex items-center pl-8 transition-all duration-500 hover:scale-105 hover:drop-shadow-2xl group"
        onClick={() => navigate("/")}
      >
        <img
          src="/Fine2.png"
          alt="Logo"
          className="h-12 w-auto object-contain cursor-pointer filter drop-shadow-lg group-hover:brightness-110 group-hover:rotate-2 transition-all duration-300"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 md:space-x-8 flex-wrap justify-center">
        {/* Home Link with Button Style */}
        <button
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-medium py-2.5 px-7 rounded-full inline-flex items-center hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-500 transform hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-[length:200%_100%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        {/* Other Links */}
        <div
          className={getLinkClasses("/services")}
          onClick={() => navigate("/services")}
        >
          Services
        </div>
        <div
          className={getLinkClasses("/officers")}
          onClick={() => navigate("/officers")}
        >
          Officers
        </div>
        <div
          className={getLinkClasses("/post-offices")}
          onClick={() => navigate("/post-offices")}
        >
          Post Offices
        </div>
        <div className={getLinkClasses("/about")} onClick={() => navigate("/about")}>
          About
        </div>
        <div
          className={getLinkClasses("/contact")}
          onClick={() => navigate("/contact")}
        >
          Contact
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 pr-8">
        <button
          className="relative overflow-hidden bg-white/95 text-gray-800 border-2 border-gray-100/80 px-7 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:border-blue-300 hover:text-blue-600 font-medium transform hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 group"
          onClick={() => navigate("/login")}
        >
          <span className="relative z-10">Login</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
        <button
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-7 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:scale-105 font-medium border-2 border-transparent hover:border-blue-300 transform hover:-translate-y-0.5 group"
          onClick={() => navigate("/register")}
        >
          <span className="relative z-10">Register</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
