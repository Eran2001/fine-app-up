import { useState, useEffect } from "react";
import BASE_URL from '../../config';

const PayFine = () => {
  const [fines, setFines] = useState([]);

  const licenseId = localStorage.getItem("licenseId");
  
  useEffect(() => {
    const fetchFines = async (licenseId) => {
      if (!licenseId) {
        console.error("License ID is missing");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/officerfines?licenseId=${licenseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch fines");
        }
        const data = await response.json();
        setFines(data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      }
    };

    if (licenseId) {
      fetchFines(licenseId);
    }
  }, [licenseId]);

  const handlePaid = async (fineId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/officerfines/${fineId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete fine");
      }

      setFines((prevFines) => prevFines.filter((fine) => fine.fine_id !== fineId));
      alert("Fine marked as paid and removed successfully!");
    } catch (error) {
      console.error("Error deleting fine:", error);
      alert("Failed to mark the fine as paid.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pay Your Fine</h1>

      {fines.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">Fine ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">License ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">Fine Name</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">Fine Type</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">Fine Amount</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.fine_id}>
                <td className="px-6 py-3 border-b">{fine.fine_id}</td>
                <td className="px-6 py-3 border-b">{fine.license_id}</td>
                <td className="px-6 py-3 border-b">{fine.fine_name}</td>
                <td className="px-6 py-3 border-b">{fine.fine_type}</td>
                <td className="px-6 py-3 border-b">Rs.{fine.fine_amount}</td>
                <td className="px-6 py-3 border-b">
                  <button
                    onClick={() => handlePaid(fine.fine_id)}
                    className="bg-blue-500 text-white p-3 rounded-md"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No fines available to pay.</p>
      )}
    </div>
  );
};

export default PayFine;
