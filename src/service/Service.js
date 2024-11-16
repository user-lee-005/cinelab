import axios from "axios";

// Use environment variable for the base URL
const BASE_URL = "https://cinelab-server.onrender.com/api"; // Fallback to localhost for local development

// Function to get the list of team members
export const getTeamMembersList = async () => {
  try {
    const response = await axios
      .get(`${BASE_URL}/getAllTeamMembers`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the team members!", error);
    throw error;
  }
};

// Function to save a new team member
export const saveTeamMembers = async (payload, contentType) => {
  try {
    const response = await axios
      .post(`${BASE_URL}/saveTeamMember`, payload, {
        headers: { "Content-Type": contentType },
      });
    return response.data;
  } catch (error) {
    console.error("There was an error saving the team member!", error);
    throw error;
  }
};

// Function to update an existing team member
export const updateTeamMember = async (id, payload, contentType) => {
  try {
    const response = await axios
      .put(`${BASE_URL}/editTeamMember/${id}`, payload, {
        headers: { "Content-Type": contentType },
      });
    return response.data;
  } catch (error) {
    console.error(
      `There was an error updating the team member with id ${id}!`,
      error
    );
    throw error;
  }
};

// Function to delete a team member
export const deleteTeamMember = async (id) => {
  try {
    const response = await axios
      .delete(`${BASE_URL}/deleteTeamMember/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `There was an error deleting the team member with id ${id}!`,
      error
    );
    throw error;
  }
};
