import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/',
});

const setAuthHeader = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  client.defaults.headers.common.Authorization = '';
};

export { client, setAuthHeader, clearAuthHeader };
