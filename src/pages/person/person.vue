<template>
  <div class="container is-max-desktop person">
    <PersonRegister />
  </div>
</template>

<script lang="ts">
  import { PersonRegister } from '@/components'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { PersonRegister },
    props: {
      id: Number,
    },
    name: 'Person',
  })
</script>

<style lang="sass">
  .person
    background: white
</style>
