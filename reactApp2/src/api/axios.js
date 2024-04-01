 import axios from 'axios';

const baseURL = 'http://localhost:5001';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Include credentials for CORS
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';

    // config.withCredentials= true
    // config.crossDomain= true
    return config;
  },
  (error) => Promise.reject(error)
);

/* 
define  args as an object with the following properties:
method: HTTP method (GET, POST, PUT, DELETE)
url: API endpoint
data: Request payload
params: Query parameters
headers: Request headers
Example:
const args = {
  method: 'POST',
  url: '/notes',
  data: { title: 'New note', content: 'This is a new note' },
};
axiosWithReauth(args).then((data) => console.log(data));
 
*/
const axiosWithReauth = async (args) => {
  try {
    console.log("args-", args)
    const response = await axiosInstance(args);
    console.log("response-", response)
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('Sending refresh token');

      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh');
        if (refreshResponse.data) {
          localStorage.setItem('token', refreshResponse.data.token);
          return axiosInstance(args).then((response) => response.data);
        } else {
          if (refreshResponse.status === 403) {
            throw new Error('Your login has expired.');
          } else {
            throw new Error('Refresh token request failed.');
          }
        }
      } catch (refreshError) {
        throw new Error('Refresh token request failed.');
      }
    } else {
      throw error;
    }
  }
};

// export const api = {
//   axiosWithReauth,
//   // Other utility functions can be added here if needed
// };

// who to export and use?
export default axiosWithReauth;