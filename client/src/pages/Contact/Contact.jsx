import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import BASE_URL from '../../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
        alert("Message sent successfully!")
      } else {
        setStatus("Failed to send message. Please try again.");
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("Error occurred while sending the message.");
      alert(error)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            We&apos;d love to hear from you. Let us know how we can help!
          </p>
        </div>

        {/* Social Contact Options */}
        <div className="flex justify-center gap-8 mb-12">
          {['email', 'phone', 'location'].map((item) => (
            <div key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl">
              <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                {/* Add icons here */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                    item === 'email' ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :
                    item === 'phone' ? "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" :
                    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  } />
                </svg>
              </span>
              <span className="font-medium">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </div>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* ...existing form fields with updated classes... */}
              <div className="space-y-4 group">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-700/50 dark:text-white transition-all duration-300 group-hover:shadow-lg"
                  required
                />
              </div>

              <div className="space-y-4 group">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-700/50 dark:text-white transition-all duration-300 group-hover:shadow-lg"
                  required
                />
              </div>

              <div className="space-y-4 group">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-700/50 dark:text-white transition-all duration-300 resize-none group-hover:shadow-lg"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "Sending..."}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-colored"
              >
                {status === "Sending..." ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </form>

            {status && status !== "Sending..." && (
              <div className={`mt-4 text-center text-sm font-medium p-4 rounded-xl backdrop-blur-sm ${
                status.includes("successfully") 
                  ? "bg-green-100/80 text-green-700 border border-green-200" 
                  : "bg-red-100/80 text-red-700 border border-red-200"
              }`}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
