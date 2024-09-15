import axios from 'axios';

// Configure Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5126/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '843cc8c8-9f05-4ebc-8901-bbc598282eca', // Replace with your actual API key
  },
});

export default apiClient;
