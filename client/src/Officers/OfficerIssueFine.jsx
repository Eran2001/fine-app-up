import { useState } from "react";
import BASE_URL from "../config";

const OfficerIssueFine = () => {
  const [fine, setFine] = useState({
    officerId: "",
    licenseId: "",
    fineName: "",
    fineType: "",
    fineAmount: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFine({ ...fine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(fine).filter(
      ([_, value]) => !value.trim()
    );
    if (emptyFields.length > 0) {
      alert("All fields are required!");
      return;
    }

    const licenseIdPattern = /^(?:[A-Z]\d{7}|\d{12})$/;
    const phonePattern = /^0\d{9}$/;

    if (!licenseIdPattern.test(fine.licenseId)) {
      alert("Invalid License ID.");
      return;
    }

    if (!phonePattern.test(fine.phoneNumber)) {
      alert("Invalid Phone Number.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/issuefines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fine),
      });

      if (!response.ok) {
        throw new Error("Error adding fine");
      }

      alert("Fine added successfully, and an email has been sent to the user.");
      setFine({
        officerId: "",
        licenseId: "",
        fineName: "",
        fineType: "",
        fineAmount: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error adding fine:", error);
      alert("Failed to add fine.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Officer, Issue a Fine</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="officerId"
          value={fine.officerId}
          onChange={handleChange}
          placeholder="Officer ID"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="licenseId"
          value={fine.licenseId}
          onChange={handleChange}
          placeholder="License ID"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="fineName"
          value={fine.fineName}
          onChange={handleChange}
          placeholder="Fine Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="fineType"
          value={fine.fineType}
          onChange={handleChange}
          placeholder="Fine Type"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="fineAmount"
          value={fine.fineAmount}
          onChange={handleChange}
          placeholder="Fine Amount"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="firstName"
          value={fine.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="lastName"
          value={fine.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={fine.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="phoneNumber"
          value={fine.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Add Fine
        </button>
      </form>
    </div>
  );
};

export default OfficerIssueFine;
