<template>
  <div class="person-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': name.$invalid }"
              type="type"
              placeholder="Nome"
              :value="name.$model"
              @blur="name.$touch()"
              @input="onChangeName"
            />
            <p v-if="name.$invalid" class="help is-danger"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': email.$invalid }"
              type="type"
              placeholder="Email"
              :value="email.$model"
              @blur="email.$touch()"
              @input="onChangeEmail"
            />
            <p v-if="email.$invalid" class="help is-danger"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, SetupContext } from 'vue'
  import { Validation } from '@vuelidate/core'
  interface PersonFormProps {}
  export default defineComponent({
    name: 'person-form',
    props: {
      name: Object as () => Validation,
      email: Object as () => Validation,
    },
    setup(props: PersonFormProps, context: SetupContext) {
      const onChangeName = ($event: Event) => {
        context.emit(
          'onChangeName',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }
      const onChangeEmail = ($event: Event) => {
        context.emit(
          'onChangeEmail',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }
      return { onChangeName, onChangeEmail }
    },
  })
</script>
