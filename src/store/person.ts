import { Address, Person } from "@/models"
interface PersonState {
  person: Person
}
export const person = {
  state: () => ({
    person: {
      addresses: []
    }
  }),
  mutations: {
    addAddress(state: PersonState, address: Address) {

      const newAddress = {
        zipcode: address.zipcode,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: address.complement,
      } as Address
      state.person.addresses = [...state.person.addresses, newAddress]
    },
    removeAddresses(state: PersonState, index: number) {
      const addresses = [...state.person.addresses];
      addresses.splice(index, 1)
      state.person.addresses = addresses
    },
    updateAddress(state: PersonState, { index, address }: { index: number, address: Address }) {
      const addresses = [...state.person.addresses]
      addresses[index] = {
        zipcode: address.zipcode,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: address.complement,
      } as Address
      state.person.addresses = addresses
    },
    setIndividual(state: PersonState, individual: Person) {
      state.person = { ...individual, addresses: state.person.addresses } as Person
    },
    setEntity(state: PersonState, entity: Person) {
      state.person = { ...entity, addresses: state.person.addresses } as Person
    },
    setPerson(state: PersonState, person: Person) {
      state.person = { ...person, addresses: person.addresses };
    },
  },
  getters: {
    person(state: PersonState) {
      return state.person
    },
    addresses(state: PersonState) {
      return state.person.addresses
    }
  }
}
