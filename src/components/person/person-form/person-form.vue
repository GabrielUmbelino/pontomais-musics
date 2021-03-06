<template>
  <div class="person-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Nome *</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': name.$error }"
              type="text"
              placeholder="Nome"
              :value="name.$model"
              @input="onChangeName"
              @blur="name.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of name.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
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
              :class="{ 'is-danger': email.$error }"
              type="text"
              placeholder="Email"
              :value="email.$model"
              @input="onChangeEmail"
              @blur="email.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of email.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Telefone</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': phoneNumber.$error }"
              type="text"
              placeholder="Telefone"
              :value="phoneNumber.$model"
              @input="onChangePhoneNumber"
              @blur="phoneNumber.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of phoneNumber.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Celular</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': mobilePhoneNumber.$error }"
              type="text"
              placeholder="Celular"
              :value="mobilePhoneNumber.$model"
              @input="onChangeMobilePhoneNumber"
              @blur="mobilePhoneNumber.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of mobilePhoneNumber.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Foto (url)</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': photoUrl.$error }"
              type="text"
              placeholder="Foto (url)"
              :value="photoUrl.$model"
              @input="onChangePhotoUrl"
              @blur="photoUrl.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of photoUrl.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Validation } from '@vuelidate/core'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'person-form',
    props: {
      name: Object as () => Validation,
      email: Object as () => Validation,
      phoneNumber: Object as () => Validation,
      mobilePhoneNumber: Object as () => Validation,
      photoUrl: Object as () => Validation,
    },
    setup(_props, { emit }) {
      const onChangeName = ($event: Event) => {
        emit('onChangeName', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeEmail = ($event: Event) => {
        emit('onChangeEmail', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangePhoneNumber = ($event: Event) => {
        emit(
          'onChangePhoneNumber',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }
      const onChangeMobilePhoneNumber = ($event: Event) => {
        emit(
          'onChangeMobilePhoneNumber',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }
      const onChangePhotoUrl = ($event: Event) => {
        emit('onChangePhotoUrl', (<HTMLInputElement>$event.currentTarget).value)
      }

      return {
        onChangeName,
        onChangeEmail,
        onChangePhoneNumber,
        onChangeMobilePhoneNumber,
        onChangePhotoUrl,
      }
    },
  })
</script>
