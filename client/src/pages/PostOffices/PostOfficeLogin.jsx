import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import BASE_URL from '../../config';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

const PostOfficeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/api/post-office-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Token:", data.token);
        navigate("/post-office-dashboard");
      } else {
        console.error("Error:", data.message);
        alert("Invalid Credentials");
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative">
        <Navbar />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-center mt-10 mb-4 text-indigo-900 tracking-tight">
            Post Office Login
          </h1>
          <p className="text-gray-600 mb-10">Welcome back! Please enter your credentials to continue.</p>
        </div>
        <form onSubmit={handleSubmit} 
              className="w-full max-w-lg mx-auto p-10 bg-white/80 backdrop-blur-sm rounded-2xl 
                         shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border border-white/20 
                         transform hover:scale-[1.01] transition-all duration-300">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}
          <div className="relative mb-8 group">
            <label className="flex items-center gap-2 mb-3 text-gray-700 text-sm font-semibold" htmlFor="email">
              <FaEnvelope className="text-indigo-600" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full h-12 px-5 py-3 bg-white/40 leading-7 text-base font-normal 
                         text-gray-900 border border-gray-200 rounded-xl placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-300 hover:bg-white/60"
              required
            />
          </div>
          <div className="relative mb-8">
            <label className="flex items-center gap-2 mb-3 text-gray-700 text-sm font-semibold" htmlFor="password">
              <FaLock className="text-indigo-600" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full h-12 px-5 py-3 bg-gray-50 leading-7 text-base font-normal 
                         text-gray-900 border border-gray-200 rounded-xl placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-300 hover:bg-gray-100"
              required
            />
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-xs h-12 shadow-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 
                       transition-all duration-300 text-white text-base font-semibold leading-7 
                       flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
                       hover:shadow-indigo-500/50 hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
      <style>
        {`
          .bg-grid-pattern {
            background-image: radial-gradient(circle, #3730a3 1px, transparent 1px);
            background-size: 30px 30px;
          }
        `}
      </style>
    </div>
  );
};

export default PostOfficeLogin;