import { Address } from "./address.type";
import { BasicPerson } from './basic-person.type';

export type IndividualPerson = BasicPerson & {
  _id: string;
  cpf: String,
  gender: String,
  birthDate: String,
  addresses: Address[];
};

