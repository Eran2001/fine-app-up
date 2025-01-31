import { useState, useEffect } from "react";
import BASE_URL from "../config";

const AllFines = () => {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/fines`);
        const data = await response.json();
        setFines(data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      }
    };

    fetchFines();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">All Fines</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 py-3 border-b bg-gray-100 text-xs font-medium text-gray-600 uppercase">
              ID
            </th>
            <th className="px-2 py-3 border-b bg-gray-100 text-xs font-medium text-gray-600 uppercase">
              Name
            </th>
            <th className="px-2 py-3 border-b bg-gray-100 text-xs font-medium text-gray-600 uppercase">
              Type
            </th>
            <th className="px-2 py-3 border-b bg-gray-100 text-xs font-medium text-gray-600 uppercase">
              Fine Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {fines.length > 0 ? (
            fines.map((fine) => (
              <tr key={fine.fine_id} className="text-center">
                <td className="px-2 py-3 border-b">{fine.fine_id}</td>
                <td className="px-2 py-3 border-b">{fine.name}</td>
                <td className="px-2 py-3 border-b">{fine.type}</td>
                <td className="px-2 py-3 border-b">Rs.{fine.fine}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">
                No fines found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllFines;
