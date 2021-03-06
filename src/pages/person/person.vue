<template>
  <section class="hero is-primary has-text-centered">
    <div class="hero-body">
      <p class="title">Cadastro de Pessoa</p>
      <p class="subtitle">Preencha o formulário abaixo.</p>
    </div>
  </section>
  <div class="container is-max-desktop person">
    <PersonRegister />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { PersonRegister } from '@/components/person/person-register'

  export default defineComponent({
    components: { PersonRegister },
    props: {
      id: Number,
    },
    name: 'Person',
  })
</script>

<style lang="scss">
  .hero {
    .hero-body {
      width: $form-width;
      max-width: 100%;
      margin: auto;
      padding: 30px 0px;
    }
  }
  .person {
    background: white;
  }
</style>
