import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 light:bg-gray-900 py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img
                className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
                src="/10.jpg"
                alt="Pay a Fine"
                width="100%"
              />
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                Pay a Fine
              </h6>
              <p className="text-slate-600 leading-normal font-light">
                The Pay a Fine feature on fine.lk offers a secure, convenient
                way to manage and settle traffic fines online or offline.
              </p>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <button
                onClick={() => navigate("/fine")}
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img
                className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
                src="/48.jpg"
                alt="Online Report"
                width="100%"
              />
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                Online Report
              </h6>
              <p className="text-slate-600 leading-normal font-light">
                The Online Report feature on fine.lk allows users to report
                traffic incidents, track progress, and enhance communication
                with authorities.
              </p>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <button
                onClick={() => navigate("/report")}
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
              <img
                className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
                src="/20.jpg"
                alt="Traffic Alerts"
                width="100%"
              />
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                Traffic Alerts
              </h6>
              <p className="text-slate-600 leading-normal font-light">
                The Traffic Alerts feature on fine.lk offers real-time updates
                  on road conditions, safety, and critical alerts, enhancing
                  travel efficiency and safety.
              </p>
            </div>
            <div className="px-4 pb-4 pt-0 mt-2">
              <button
                onClick={() => navigate("/traffic")}
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
