import axios from 'axios';

// Configure Axios instance
const inriverClient = axios.create({
  baseURL: 'https://apieuw.productmarketingcloud.com', 
  headers: {
    'Content-Type': 'application/json',
    'X-inRiver-APIKey': 'ef6eedc4c83be949457a0ed72c1adb54', 
  },
});

export default inriverClient;
