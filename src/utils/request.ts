import axios from 'axios';

const ins = axios.create({ timeout: 15000 });

ins.interceptors.response.use((res) => {
  return res.data;
});

export default ins;
