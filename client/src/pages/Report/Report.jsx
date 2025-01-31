import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Report = () => {
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
          backgroundImage: "url('48.jpg')",
          height: "600px", // Adjusting the height as per your original image
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-50">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
            data-aos="fade-up"
          >
            Online Report
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-6"
          data-aos="fade-up"
        >
          VIEW &amp; PAY FINES
        </h3>
        <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          The *Online Report* feature on fine.lk empowers users to conveniently
          report various traffic-related incidents and concerns in real-time,
          ensuring a smooth and transparent communication channel between
          individuals and law enforcement authorities. This feature allows users
          to submit reports regarding lost fine slips, incorrect fine details,
          disputes over violations, or even grievances related to traffic
          incidents. By providing an intuitive interface, users can easily enter
          key details such as vehicle registration numbers, incident
          descriptions, location, and supporting evidence like images or
          documents. Each submitted report is logged into the system and
          forwarded to the relevant traffic department for swift review and
          resolution, streamlining what is traditionally a lengthy and complex
          process.
        </p>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          The platform ensures transparency and accountability by enabling users
          to track the status of their reports through a reference number
          provided after submission. Notifications and updates are sent via
          email and SMS, keeping users informed about the progress of their
          cases. This not only saves time but also eliminates the need for
          individuals to physically visit government offices, reducing
          bureaucratic delays. The fine.lk Online Report feature benefits law
          enforcement by providing a centralized repository for managing reports
          efficiently while improving response times and communication with the
          public. Ultimately, this functionality enhances trust, accountability,
          and efficiency, marking a significant step toward modernizing public
          services in Sri Lanka.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
