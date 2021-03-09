import axios from 'axios'
import { Person } from './../models/person.type';
const baseURL = 'https://jsonbox.io/box_0ab2b3daab2ca90b17f4';
const baseMetaURL = 'https://jsonbox.io/_meta/box_0ab2b3daab2ca90b17f4';

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
  const response = await axiosInstance.post("/person", person);

  return response.data;
}

export const update = async (person: Person) => {
  const response = await axiosInstance.put(`/person/${person._id}`, person);

  return response.data;
}

export const remove = async (_id: Person['_id']) => {
  const response = await axiosInstance.delete(`/person/${_id}`);

  return response.data;
}

export const get = async (skip: number = 0, limit: number = 10): Promise<Person[]> => {
  const params = `?skip=${skip}&limit=${limit}`;
  const response = await axiosInstance.get(`/person${params}`);

  return response.data as Person[];
}

export const getPersonCount = async (): Promise<number> => {
  const response = await axios.get(`${baseMetaURL}`)
  return Number(response.data._count)
}