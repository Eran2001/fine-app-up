import { useEffect, useState } from "react";
import BASE_URL from "../config";

const Officer = () => {
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [form, setForm] = useState({
    batch_number: "",
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOfficers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/officers`);
      const data = await response.json();
      setOfficers(data);
      setFilteredOfficers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching officers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `${BASE_URL}/api/officers/${editId}`
      : `${BASE_URL}/api/officers`;
    const method = editId ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      fetchOfficers();
      setForm({
        batch_number: "",
        name: "",
        email: "",
        password: "",
        contact: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving officer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/officers/${id}`, {
        method: "DELETE",
      });
      fetchOfficers();
    } catch (error) {
      console.error("Error deleting officer:", error);
    }
  };

  const handleEdit = (officer) => {
    setForm({
      batch_number: officer.batch_number,
      name: officer.name,
      email: officer.email,
      password: officer.password,
      contact: officer.contact,
    });
    setEditId(officer.officer_id);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredOfficers(officers);
    } else {
      setFilteredOfficers(
        officers.filter(
          (officer) =>
            officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            officer.batch_number
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, officers]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Officer List</h3>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or batch number"
        className="border px-2 py-1 mb-4"
      />

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Batch Number"
          value={form.batch_number}
          onChange={(e) => setForm({ ...form, batch_number: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {loading && <div>Loading...</div>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Officer ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Batch Number
                </th>
                <th className="px-10 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.map((officer) => (
                <tr key={officer.officer_id}>
                  <td className="px-6 py-3 border-b">{officer.officer_id}</td>
                  <td className="px-6 py-3 border-b">{officer.batch_number}</td>
                  <td className="px-6 py-3 border-b">{officer.name}</td>
                  <td className="px-6 py-3 border-b">{officer.email}</td>
                  <td className="px-6 py-3 border-b">{officer.contact}</td>
                  <td className="px-6 py-3 border-b">
                    <button
                      onClick={() => handleEdit(officer)}
                      className="px-2 py-1 text-white bg-yellow-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(officer.officer_id)}
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
      )}
    </div>
  );
};

export default Officer;
