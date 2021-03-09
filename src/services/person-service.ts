import axios from 'axios'
import { Person } from './../models/person.type';
const baseURL = 'https://jsonbox.io/box_0ab2b3daab2ca90b17f4/person';

function createInstance(baseURL: string) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const axiosInstance = createInstance(baseURL)

export const create = async (person: Person) => {
  const response = await axiosInstance.post("/", person);

  return response.data;
}

export const update = async (person: Person) => {
  const response = await axiosInstance.put(`/${person._id}`, person);

  return response.data;
}

export const remove = async (_id: Person['_id']) => {
  const response = await axiosInstance.delete(`/${_id}`);

  return response.data;
}

export const get = async (): Promise<Person[]> => {
  const response = await axiosInstance.get("/");

  return response.data as Person[];
}