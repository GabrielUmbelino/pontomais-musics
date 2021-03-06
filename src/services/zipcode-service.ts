import axios from 'axios';
axios.defaults.baseURL = 'https://viacep.com.br/ws/';


export const getAddress = (zipcode: String) => {
  return axios.get(`${zipcode}/json/`)
}