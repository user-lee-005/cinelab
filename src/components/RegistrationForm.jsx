import React from "react";

const RegistrationForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="space-y-6 mb-4">
      {/* Name Input */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-lg font-semibold text-gray-700">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Mobile Number Input */}
      <div className="flex flex-col">
        <label htmlFor="mobile" className="text-lg font-semibold text-gray-700">
          Mobile Number<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your mobile number"
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit mobile number"
          required
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg font-semibold text-gray-700">
          Email ID<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email ID"
          required
        />
      </div>

      {/* Profession Dropdown (Optional) */}
      <div className="flex flex-col">
        <label
          htmlFor="profession"
          className="text-lg font-semibold text-gray-700"
        >
          Profession (Optional)
        </label>
        <select
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your profession</option>
          <option value="IT Professional">IT Professional</option>
          <option value="Content Creator">Content Creator</option>
          <option value="Filmmaker">Filmmaker</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </form>
  );
};

export default RegistrationForm;
