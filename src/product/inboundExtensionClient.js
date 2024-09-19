import axios from 'axios';

const extensionApiKey = "1f3e9a48-45bc-4f4d-8d97-a48b7c59a1e1";
const byteArray = `apikey:${extensionApiKey}`;
const base64String = btoa(byteArray); // Encode to Base64

// Set up headers as an object (Axios expects an object, not a Headers instance)
const headers = {
  Authorization: `Basic ${base64String}`,
  'Content-Type': 'application/json',
};

// Configure Axios instance with the correct headers
const inboundExtensionClient = axios.create({
  baseURL: 'https://inbound.productmarketingcloud.com/api/inbounddata/bonaab/test',
  headers: headers,
});

export default inboundExtensionClient;