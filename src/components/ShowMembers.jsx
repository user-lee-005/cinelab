import React, { useState, useEffect } from "react";
import {
  getTeamMembersList,
  updateTeamMember,
  deleteTeamMember,
} from "../service/Service";
import axios from "axios";

const ShowMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    image: null,
  });

  // Fetch the team members from the API
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const members = await getTeamMembersList();
      setTeamMembers(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Handle input changes in the form for editing
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (event) => {
    setEditFormData({
      ...editFormData,
      image: event.target.files[0],
    });
  };

  // Handle the edit button click and load the data into the form
  const handleEditClick = (member) => {
    setEditMemberId(member.id);
    setEditFormData({
      name: member.name,
      role: member.role,
      image: null, // No need to load image, since it's from DB
    });
  };

  // Handle the cancel button in edit form
  const handleCancelEdit = () => {
    setEditMemberId(null);
  };

  // Handle form submission for updating
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("role", editFormData.role);
    if (editFormData.image) {
      formData.append("image", editFormData.image);
    }

    try {
      await updateTeamMember(editMemberId, formData, "multipart/form-data");
      fetchTeamMembers(); // Refresh the list after update
      setEditMemberId(null); // Reset edit state
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  // Handle delete operation
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        // await deleteTeamMember(id);
        await axios
          .delete(`https://cinelab-server.onrender.com/api/deleteTeamMember/${id}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error(
              `There was an error deleting the team member with id ${id}!`,
              error
            );
            throw error;
          });
        fetchTeamMembers(); // Refresh the list after delete
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Team Members</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id} className="bg-gray-100">
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2">{member.role}</td>
              <td className="border px-4 py-2">
                <img
                  src={`data:image/jpeg;base64,${member.image}`}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditClick(member)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteClick(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to edit the team member */}
      {editMemberId && (
        <form onSubmit={handleEditFormSubmit} className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Edit Team Member</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <input
              type="text"
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2"
            />
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-4"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShowMembers;
