import { motion } from "framer-motion";

const FeedBack = () => {
  return (
    <div className="bg-gray-50 py-24 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-20 text-gray-800"
        >
          What Our Clients Say
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {[
            {
              text: "The service was exceptional, and the team was incredibly helpful and professional.",
              name: "John Doe",
              role: "CEO, TechCorp",
              delay: 0.2,
              gradient: "from-indigo-500 to-purple-500"
            },
            {
              text: "I highly recommend their services. They exceeded all my expectations!",
              name: "Jane Smith",
              role: "Designer, ArtStudio",
              delay: 0.4,
              gradient: "from-purple-500 to-pink-500"
            },
            {
              text: "A wonderful experience! Professional and timely in every aspect.",
              name: "Emily Johnson",
              role: "Manager, BizWorld",
              delay: 0.6,
              gradient: "from-pink-500 to-rose-500"
            }
          ].map((feedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: feedback.delay, duration: 0.8 }}
              whileHover={{ y: -5, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <svg className={`w-10 h-10 mb-4 bg-gradient-to-r ${feedback.gradient} [clip-path:path('M4.583_17.321C3.553_16.227_3_15_3_13.011c0-3.5_2.457-6.637_6.03-8.188l.893_1.378c-3.335_1.804-3.987_4.145-4.247_5.621.537-.278_1.24-.375_1.929-.311_1.804.167_3.226_1.648_3.226_3.489a3.5_3.5_0_01-3.5_3.5c-1.073_0-2.099-.49-2.748-1.179zm10_0C13.553_16.227_13_15_13_13.011c0-3.5_2.457-6.637_6.03-8.188l.893_1.378c-3.335_1.804-3.987_4.145-4.247_5.621.537-.278_1.24-.375_1.929-.311_1.804.167_3.226_1.648_3.226_3.489a3.5_3.5_0_01-3.5_3.5c-1.073_0-2.099-.49-2.748-1.179z')] text-white p-2 rounded-lg`} />
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  &ldquo;{feedback.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feedback.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {feedback.name[0]}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">{feedback.name}</h4>
                  <p className="text-sm text-gray-500">{feedback.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
