import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Traffic = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1-second duration for animation
  }, []);

  return (
    <div className="font-sans relative z-10 bg-[#fff]">
      <Navbar />
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('416.jpg')",
          height: "600px", // Adjusting the height as per your original image
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-50">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
            data-aos="fade-up"
          >
            Traffic Alerts
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-6"
          data-aos="fade-up"
        >
          Traffic Alerts Details
        </h3>
        <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          The *Traffic Alerts* feature on fine.lk provides real-time updates on
          traffic conditions, road safety notifications, and critical alerts to
          keep users informed and ensure safer, more efficient travel across Sri
          Lanka. By leveraging modern technology and integration with traffic
          authorities, this feature delivers timely notifications regarding road
          closures, traffic congestion, construction zones, and accident-prone
          areas. Users can access detailed traffic reports, allowing them to
          make informed decisions to avoid delays and choose alternate routes
          for a smoother commute.
        </p>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          The Traffic Alerts card ensures that users receive instant updates via
          email, SMS, or push notifications, helping them stay proactive in
          managing their travel plans. Additionally, notifications on
          accident-prone or high-risk zones serve as a precautionary measure to
          enhance road safety and awareness. This system not only benefits
          individual commuters but also assists law enforcement by reducing
          congestion and enabling better traffic flow management. The platform's
          user-friendly interface ensures that even non-tech-savvy individuals
          can easily view and subscribe to alerts.
        </p>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          By providing real-time, accurate updates, the Traffic Alerts feature
          minimizes travel inconvenience, saves time, and enhances safety for
          all road users. It exemplifies the commitment of fine.lk to modernize
          traffic management, contributing to a smarter, safer, and more
          responsive transportation system in Sri Lanka.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Traffic;
