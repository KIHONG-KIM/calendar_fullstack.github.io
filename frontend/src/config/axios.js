import axios from 'axios';

const Req = axios.create({
    baseURL: "http://localhost:5000",
  });
  
export default Req;