import axios from 'axios';


// This is the main HTTP client for the application. Creating a unified client 
// will ease global changes like headers & baseURLs etc.
const api = axios.create({
    baseURL: 'https://creable.azurewebsites.net/',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
  });

  export default api;