import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/';

// Function to get user data from localStorage
const getUserData = () => {
  const persistedRoot = JSON.parse(localStorage.getItem('persist:root'));
  return persistedRoot?.user ? JSON.parse(persistedRoot.user).currentUser : null;
};

// Get user data or default to an empty object
const userData = getUserData() || {};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${userData.accessToken || ''}` },
});
