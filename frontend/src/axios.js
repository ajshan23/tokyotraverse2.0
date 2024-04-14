import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { baseUrl } from './constants/constants';
import Cookies from "js-cookie"


let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null

const axiosInstance = axios.create({
    baseURL:baseUrl,
    headers:{Authorization: `Bearer ${accessToken}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!accessToken){
        accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
        refresh:Cookies.get('refreshToken')
      });

    localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
    req.headers.Authorization = `Bearer ${response.data.accessToken}`
    return req
})

// axiosInstance.interceptors.response.use(
//     (response) => {
//       const { data, status, headers } = response;
  
    
//       if (status >= 200 && status < 300) {
//         return data; 
//       } else {
//         console.warn(`Request failed with status ${status}`);
//         return Promise.reject(new Error(`API request failed (status: ${status})`));
//       }
//     },
//     (error) => {
//       const { response, request, message } = error;
//       if (response) {
//         console.error(`API request error (${response.status})`, response.data);
//         if (response.status === 401) {
         
//           return Promise.reject(new Error('Unauthorized'));
//         }
//       } else if (request) {
//         console.error('Network error:', message);
//         return Promise.reject(new Error('Network Error'));
//       } else {
//         console.error('Error:', message);
//         return Promise.reject(error);
//       }
//     }
//   );


export default axiosInstance;