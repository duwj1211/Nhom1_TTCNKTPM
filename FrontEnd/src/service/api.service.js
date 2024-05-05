import axios from "axios";

let BASE_URL = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "*/*"
  },
  credentials: 'include'
})
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
instance.interceptors.request.use((config) => {
  let token = getCookie("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {

  return response;
}, (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      
    } else if (status === 500) {
      
    }
    return Promise.reject(error);
  }
)

export default instance;