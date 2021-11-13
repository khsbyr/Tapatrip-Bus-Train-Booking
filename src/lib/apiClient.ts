import axios from 'axios';
// let config = { baseURL: 'http://47.243.62.69:8000/api' };
// // const apiClient = axios.create({
// //   baseURL: 'http://47.243.62.69:8001/api',
// // });
// console.log(config);
// export default axios.create(config);
console.log('env : ', process.env.NEXT_PUBLIC_API_URL);
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
console.log(apiClient);
export default apiClient;
