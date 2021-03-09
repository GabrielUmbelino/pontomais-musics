import axios from 'axios';
const baseURL = 'https://viacep.com.br/ws/';

function createInstance(baseURL: string) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const axiosInstance = createInstance(baseURL)
export const getAddress = (zipcode: String) => {
  return axiosInstance.get(`${zipcode}/json/`)
}