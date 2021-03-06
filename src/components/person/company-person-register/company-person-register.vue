<template>
  <article class="company-person-register">
    <form>
      <PersonForm
        :name="v$.form.name"
        :email="v$.form.email"
        :phoneNumber="v$.form.phoneNumber"
        :mobilePhoneNumber="v$.form.mobilePhoneNumber"
        :photoUrl="v$.form.photoUrl"
        @onChangeName="state.form.name = $event"
        @onChangeEmail="state.form.email = $event"
        @onChangePhoneNumber="state.form.phoneNumber = $event"
        @onChangeMobilePhoneNumber="state.form.mobilePhoneNumber = $event"
        @onChangePhotoUrl="state.form.photoUrl = $event"
      />
    </form>
  </article>
</template>
<script lang="ts">
  import useVuelidate from '@vuelidate/core'
  import {
    email,
    helpers,
    minLength,
    required,
    url,
  } from '@vuelidate/validators'
  import { defineComponent, reactive } from 'vue'
  import { FormSteps } from '../form-steps'
  import { PersonForm } from '../person-form'

  export default defineComponent({
    name: 'person-register',
    components: {
      FormSteps,
      PersonForm,
    },
    setup() {
      const user: any = {}

      const state = reactive({
        form: {
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          mobilePhoneNumber: user.mobilePhoneNumber || '',
          photoUrl: user.photoUrl || '',
        },
      })

      const rules = {
        form: {
          name: {
            required: helpers.withMessage('Nome é obrigatório.', required),
            minLength: helpers.withMessage('Nome é muito curto.', minLength(2)),
          },
          email: {
            email: helpers.withMessage('E-mail inválido.', email),
          },
          phoneNumber: {
            minLength: helpers.withMessage('Telefone inválido.', minLength(8)),
          },
          mobilePhoneNumber: {
            minLength: helpers.withMessage('Celular inválido.', minLength(8)),
          },
          photoUrl: {
            url: helpers.withMessage('Url de foto inválida.', url),
          },
        },
      }

      const v$ = useVuelidate(rules, state)

      return { state, v$ }
    },
  })
</script>
<style lang="scss">
  .company-person-register {
    form {
      width: $form-width;
      max-width: 100%;
      margin: 40px auto 10px;
      padding: 0 15px;
    }
  }
</style>
