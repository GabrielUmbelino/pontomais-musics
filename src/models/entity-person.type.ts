import { Address } from "./address.type";
import { BasicPerson } from './basic-person.type';

export type EntityPerson = BasicPerson & {
  _id: string,
  cnpj: String,
  companyName: String,
  addresses: Address[]
};
