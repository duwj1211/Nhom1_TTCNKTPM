import axios from "axios";

let BASE_URL = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "*/*"
  },
})

instance.interceptors.request.use((config) => {
  //config
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {

  return response;
}, (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      
    } else if (status == 500 || status == 500) {
      router.push("/error/500");
    }
    return Promise.reject(error);
  }
)

export default instance;