import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Fine = () => {
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
          backgroundImage: "url('fine.jpg')",
          height: "600px", // Adjusting the height as per your original image
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-50">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
            data-aos="fade-up"
          >
            PAY FINES
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
          The *Pay a Fine* feature on fine.lk offers an efficient, secure, and
          user-friendly solution for individuals to manage and settle their
          traffic fines seamlessly. Users can instantly retrieve their fine
          details by entering either a fine reference number or vehicle
          registration details, providing transparency into the offense,
          location, and amount due. The platform supports secure online payments
          through multiple methods, including credit/debit cards, bank
          transfers, and mobile wallets, ensuring flexibility and convenience
          for all users. Upon successful payment, users receive immediate
          confirmation via SMS and email, along with downloadable digital
          receipts for record-keeping. Additionally, fine.lk incorporates
          offline payment options by partnering with authorized post offices,
          addressing the needs of users without consistent internet access and
          promoting inclusivity across rural and urban areas.
        </p>
        <p
          className="text-gray-700 text-base sm:text-lg leading-7 mb-6"
          data-aos="fade-up"
        >
          The *Pay a Fine* feature on fine.lk offers an efficient, secure, and
          user-friendly solution for individuals to manage and settle their
          traffic fines seamlessly. Users can instantly retrieve their fine
          details by entering either a fine reference number or vehicle
          registration details, providing transparency into the offense,
          location, and amount due. The platform supports secure online payments
          through multiple methods, including credit/debit cards, bank
          transfers, and mobile wallets, ensuring flexibility and convenience
          for all users. Upon successful payment, users receive immediate
          confirmation via SMS and email, along with downloadable digital
          receipts for record-keeping. Additionally, fine.lk incorporates
          offline payment options by partnering with authorized post offices,
          addressing the needs of users without consistent internet access and
          promoting inclusivity across rural and urban areas.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Fine;
