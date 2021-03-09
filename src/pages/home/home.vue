<template>
  <section class="hero is-primary has-text-centered">
    <div class="hero-body">
      <p class="title">Cadastro de Pessoas</p>
    </div>
  </section>
  <div class="container is-max-desktop person-list">
    <PersonList
      :personList="personList"
      :loading="loading"
      @onRemovePerson="onRemove"
    />
  </div>
</template>

<script lang="ts">
  import { Person } from '@/models'
  import { personService } from '@/services'
  import { defineComponent, ref } from 'vue'
  import { PersonList } from '@/components/home/person-list/'
  export default defineComponent({
    components: {
      PersonList,
    },
    created() {
      this.fetchPersonList()
    },
    setup() {
      const personList = ref<Person[]>()
      const loading = ref(false)

      const fetchPersonList = async () => {
        try {
          loading.value = true
          personList.value = await personService.get()
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
          fetchPersonList()
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }

      return { loading, personList, fetchPersonList, onRemove }
    },
  })
</script>
