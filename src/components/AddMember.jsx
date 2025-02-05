// AddMember.jsx
import React, { useState } from "react";
import axios from "axios";
import { saveTeamMember } from "../service/Service";

const AddMember = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("file", image);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        "https://cinelab-server.onrender.com/api/saveTeamMember",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const response = await saveTeamMember(formData, "multipart/form-data");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMember;
