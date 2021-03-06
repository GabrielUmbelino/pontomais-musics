<template>
  <div class="individual-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">CPF *</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              :class="{ 'is-danger': cpf.$error }"
              v-mask="'###.###.###-##'"
              placeholder="CPF"
              :value="cpf.$model"
              @input="onChangeCpf"
              @blur="cpf.$touch()"
            />

            <p
              class="help is-danger"
              v-for="error of cpf.$errors"
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
          <label class="label">Sexo *</label>
          <div class="control">
            <div class="select">
              <select
                :class="{ 'is-danger': gender.$error }"
                :value="gender.$model"
                @change="onChangeGender"
                @blur="gender.$touch()"
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </select>
            </div>
            <p
              class="help is-danger"
              v-for="error of gender.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Data de Nascimento *</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': birthDate.$error }"
              type="tel"
              v-mask="'##/##/####'"
              placeholder="Data de Nascimento"
              :value="birthDate.$model"
              @input="onChangeBirthDate"
              @blur="birthDate.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of birthDate.$errors"
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
  import { mask } from 'vue-the-mask'

  export default defineComponent({
    directives: { mask },
    name: 'individual-form',
    props: {
      cpf: Object as () => Validation,
      gender: Object as () => Validation,
      birthDate: Object as () => Validation,
    },
    setup(_props, { emit }) {
      const onChangeCpf = ($event: Event) => {
        emit('onChangeCpf', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeGender = ($event: Event) => {
        emit('onChangeGender', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeBirthDate = ($event: Event) => {
        emit(
          'onChangeBirthDate',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }

      return {
        onChangeCpf,
        onChangeGender,
        onChangeBirthDate,
      }
    },
  })
</script>
