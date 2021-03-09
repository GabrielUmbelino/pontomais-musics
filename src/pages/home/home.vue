<template>
  <div>
    <section class="hero is-primary has-text-centered">
      <div class="hero-body">
        <p class="title">Cadastro de Pessoas</p>
      </div>
    </section>
    <div class="container is-max-desktop person-list">
      <PersonList
        :loading="loading"
        :personList="personList"
        @onRemovePerson="onRemove"
      />

      <Pagination
        v-if="personListLength || currentPage"
        :length="personListLength"
        :current="currentPage"
        @onChange="onChangePagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Person } from '@/models'
  import { personService } from '@/services'
  import { defineComponent, ref } from 'vue'
  import { PersonList } from '../../components/home/person-list/'
  import { Pagination } from '../../components/home/pagination/'
  export default defineComponent({
    components: {
      PersonList,
      Pagination,
    },
    created() {
      this.fetchPersonList()
    },
    setup() {
      const loading = ref(false)
      const currentPage = ref(1)
      const skip = ref(0)
      const limit = ref(10)
      const personListLength = ref(0)
      const personList = ref<Person[]>()

      const fetchPersonList = async (skip?: number, limit?: number) => {
        try {
          loading.value = true
          personListLength.value = await personService.getPersonCount()
          personList.value = await personService.get(skip, limit)
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }

      const onRemove = async (_id: Person['_id']) => {
        try {
          loading.value = true
          await personService.remove(_id)
          fetchPersonList(skip.value, limit.value)
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }

      const onChangePagination = (page: number) => {
        currentPage.value = page
        skip.value = page * 10 - 10
        limit.value = page * 10
        fetchPersonList(skip.value, limit.value)
      }

      return {
        loading,
        onRemove,
        personList,
        currentPage,
        fetchPersonList,
        personListLength,
        onChangePagination,
      }
    },
  })
</script>
<style lang="scss">
  .container {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    .container {
      padding: 0 5px;
    }
  }
</style>
