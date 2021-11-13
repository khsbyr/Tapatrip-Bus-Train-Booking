import axios from 'axios';
let config = { baseURL: 'http://47.243.62.69:8000/api' };
// const apiClient = axios.create({
//   baseURL: 'http://47.243.62.69:8001/api',
// });

export default axios.create(config);
