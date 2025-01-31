import { useState, useEffect } from "react";
import BASE_URL from "../config";

const Fines = () => {
  const [fines, setFines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fine: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch fines
  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/fines`);
      const data = await response.json();
      setFines(data);
    } catch (error) {
      console.error("Error fetching fines:", error);
    }
  };

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add new fine (POST)
  const handleAddFine = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/fines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchFines();
        setFormData({ name: "", type: "", fine: "" });
        alert("Fine added successfully!");
      } else {
        alert("Failed to add fine.");
      }
    } catch (error) {
      console.error("Error adding fine:", error);
    }
  };

  // 🔹 Update fine (PUT)
  const handleUpdateFine = async (e) => {
    e.preventDefault();
    if (!editId) return;

    try {
      const response = await fetch(`${BASE_URL}/api/fines/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchFines();
        setFormData({ name: "", type: "", fine: "" });
        setEditId(null);
        alert("Fine updated successfully!");
      } else {
        alert("Failed to update fine.");
      }
    } catch (error) {
      console.error("Error updating fine:", error);
    }
  };

  // 🔹 Delete fine (DELETE)
  const handleDeleteFine = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fine?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/fines/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFines();
        alert("Fine deleted successfully!");
      } else {
        alert("Failed to delete fine.");
      }
    } catch (error) {
      console.error("Error deleting fine:", error);
    }
  };

  // 🔹 Populate form for editing
  const handleEditFine = (fine) => {
    setFormData({ name: fine.name, type: fine.type, fine: fine.fine });
    setEditId(fine.fine_id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fines List</h1>

      {/* 🟢 Fine Form */}
      <form
        onSubmit={editId ? handleUpdateFine : handleAddFine}
        className="mb-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Fine Name"
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Fine Type"
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="fine"
          value={formData.fine}
          onChange={handleChange}
          placeholder="Amount (Rs.)"
          required
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editId ? "Update Fine" : "Add Fine"}
        </button>
      </form>

      {/* 🟡 Fines Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
                Fine_ID
              </th>
              <th className="px-20 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="px-4 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
                Type
              </th>
              <th className="px-4 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
                Fine (Rs.)
              </th>
              <th className="px-4 py-3 border-b bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.fine_id}>
                <td className="px-2 py-3 border-b">{fine.fine_id}</td>
                <td className="px-20 py-3 border-b">{fine.name}</td>
                <td className="px-4 py-3 border-b">{fine.type}</td>
                <td className="px-4 py-3 border-b">{fine.fine}</td>
                <td className="px-4 py-3 border-b">
                  <button
                    onClick={() => handleEditFine(fine)}
                    className="px-2 py-1 text-white bg-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFine(fine.fine_id)}
                    className="px-2 py-1 text-white bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fines;
