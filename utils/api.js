import axios from 'axios';


// This is the main HTTP client for the application. Creating a unified client 
// will ease global changes like headers & baseURLs etc.
const api = axios.create({
    baseURL: 'http://creable-001-site1.atempurl.com/',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
  });

  export default api;