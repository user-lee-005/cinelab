// src/services/teamService.js

import axios from "axios";

// Use environment variable for the base URL
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api"; // Fallback to localhost for local development

// Function to get the list of team members
export const getTeamMembersList = () => {
  return axios
    .get(`${BASE_URL}/getAllTeamMembers`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("There was an error fetching the team members!", error);
      throw error;
    });
};

// Function to save a new team member
export const saveTeamMembers = (payload) => {
  return axios
    .post(`${BASE_URL}/saveTeamMember`, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error("There was an error saving the team member!", error);
      throw error;
    });
};
