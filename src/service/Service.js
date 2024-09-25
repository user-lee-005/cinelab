import axios from "axios";

// Use environment variable for the base URL
const BASE_URL = "http://127.0.0.1:3001/api"; // Fallback to localhost for local development

// Function to get the list of team members
export const getTeamMembersList = () => {
  return axios
    .get(`${BASE_URL}/getAllTeamMembers`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("There was an error fetching the team members!", error);
      throw error;
    });
};

// Function to save a new team member
export const saveTeamMembers = (payload, contentType) => {
  return axios
    .post(`${BASE_URL}/saveTeamMember`, payload, {
      headers: { "Content-Type": contentType },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("There was an error saving the team member!", error);
      throw error;
    });
};

// Function to update an existing team member
export const updateTeamMember = (id, payload, contentType) => {
  return axios
    .put(`${BASE_URL}/editTeamMember/${id}`, payload, {
      headers: { "Content-Type": contentType },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `There was an error updating the team member with id ${id}!`,
        error
      );
      throw error;
    });
};

// Function to delete a team member
export const deleteTeamMember = (id) => {
  return axios
    .delete(`${BASE_URL}/deleteTeamMember/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `There was an error deleting the team member with id ${id}!`,
        error
      );
      throw error;
    });
};
