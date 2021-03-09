import { createStore } from 'vuex'
import { person } from './person'
import VuexPersistence from 'vuex-persist'

export const store = createStore({
  modules: {
    person
  },
  plugins: [new VuexPersistence().plugin]
})
