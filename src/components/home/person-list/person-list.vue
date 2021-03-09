<template>
  <div class="person-list">
    <progress v-if="loading" class="progress is-small is-primary" max="100">
      15%
    </progress>
    <table v-else class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th class="is-desktop">Tipo</th>
          <th class="is-desktop">Documento</th>
          <th>
            <button
              type="button"
              class="button is-primary is-small"
              @click="onAddPerson()"
            >
              Adicionar
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="person in personList" :key="person._id">
          <td>{{ person.name }}</td>
          <!-- <td>{{ person.type === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica' }}</td> -->
          <td class="is-desktop">{{ person.type }}</td>
          <td class="is-desktop">
            {{ person.cpf ? person.cpf : person.cnpj }}
          </td>
          <td>
            <div class="buttons">
              <button
                type="button"
                class="button is-danger is-small"
                @click="onRemovePerson(person._id)"
              >
                Remover
              </button>
              <button
                type="button"
                class="button is-primary is-small"
                @click="onEditPerson(person)"
              >
                Editar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { router } from '@/router'
  import { Person } from '@/models'
  import { useStore } from 'vuex'

  export default defineComponent({
    props: {
      personList: Array,
      loading: Boolean,
    },
    setup(_props, { emit }) {
      const store = useStore()

      const onEditPerson = (person: Person) => {
        store.commit('setPerson', person)
        router.push(`/person/${person._id}`)
      }

      const onAddPerson = () => {
        store.commit('setPerson', { addresses: [] })
        router.push(`/person/`)
      }

      const onRemovePerson = (_id: Person['_id']) => {
        emit('onRemovePerson', _id)
      }

      return {
        onAddPerson,
        onEditPerson,
        onRemovePerson,
      }
    },
  })
</script>
<style lang="scss">
  .person-list {
    width: 960px;
    max-width: 100%;
    margin: 40px auto;

    .table,
    .progress {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    .table {
      .is-desktop {
        display: none;
      }
    }
  }
</style>
