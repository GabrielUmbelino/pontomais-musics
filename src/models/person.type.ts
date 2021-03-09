import { EntityPerson } from './entity-person.type';
import { IndividualPerson } from '@/models';
export type Person = IndividualPerson & EntityPerson & {
  type: 'individual' | 'entity';
};