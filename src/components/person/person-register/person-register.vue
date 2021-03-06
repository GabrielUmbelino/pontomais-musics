<template>
  <article class="person-register">
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">Cadastro de Pessoa</p>
        <p class="subtitle">Preencha o formulário abaixo.</p>
      </div>
    </section>
    <FormSteops />
    <form>
      <person-form
        :name="v$.form.name"
        :email="v$.form.email"
        @onChangeName="v$.form.name.$model = $event"
        @onChangeEmail="v$.form.email.$model = $event"
      />
      <div class="columns">
        <div class="column">
          <div class="field is-grouped is-grouped-right">
            <!-- <p class="control">
        <a class="button is-light"> Voltar </a>
      </p> -->
            <p class="control">
              <a class="button is-primary"> Próximo </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </article>
</template>
<script lang="ts">
  import useVuelidate from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'
  import { defineComponent, reactive } from 'vue'
  import { PersonForm } from '../person-form'
  import { FormSteops } from '../form-steps'

  export default defineComponent({
    name: 'person-register',
    components: {
      PersonForm,
      FormSteops,
    },
    setup() {
      const state = reactive({
        form: {
          name: '',
          email: '',
        },
      })
      const rules = {
        form: {
          name: { required },
          email: { required, email },
        },
      }

      const v$ = useVuelidate(rules, state)

      return { v$ }
    },
  })
</script>
<style lang="scss">
  .person-register {
    .hero {
      .hero-body {
        width: $form-width;
        max-width: 100%;
        margin: auto;
        padding: 30px 0px;
      }
    }
    form {
      width: $form-width;
      max-width: 100%;
      margin: 40px auto 10px;
    }
  }
</style>
