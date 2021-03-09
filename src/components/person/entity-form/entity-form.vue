<template>
  <div class="entity-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">CNPJ *</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              :class="{ 'is-danger': v$.entity.cnpj.$error }"
              v-mask="'##.###.###/####-##'"
              placeholder="CNPJ"
              v-model="state.entity.cnpj"
              @blur="v$.entity.cnpj.$touch()"
              @change="onChange"
            />

            <p
              class="help is-danger"
              v-for="error of v$.entity.cnpj.$errors"
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
          <label class="label">Razão Social *</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': v$.entity.companyName.$error }"
              type="text"
              placeholder="Razão Social"
              v-model="state.entity.companyName"
              @blur="v$.entity.companyName.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.companyName.$errors"
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
          <label class="label">Nome *</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': v$.entity.name.$error }"
              type="text"
              placeholder="Nome"
              v-model="state.entity.name"
              @blur="v$.entity.name.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.name.$errors"
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
              :class="{ 'is-danger': v$.entity.email.$error }"
              type="text"
              placeholder="Email"
              v-model="state.entity.email"
              @blur="v$.entity.email.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.email.$errors"
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
              type="tel"
              :class="{ 'is-danger': v$.entity.phoneNumber.$error }"
              v-mask="['(##) ####-####', '(##) #####-####']"
              placeholder="Telefone"
              v-model="state.entity.phoneNumber"
              @blur="v$.entity.phoneNumber.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.phoneNumber.$errors"
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
              type="tel"
              :class="{ 'is-danger': v$.entity.mobilePhoneNumber.$error }"
              v-mask="['(##) ####-####', '(##) #####-####']"
              placeholder="Celular"
              v-model="state.entity.mobilePhoneNumber"
              @blur="v$.entity.mobilePhoneNumber.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.mobilePhoneNumber.$errors"
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
              :class="{ 'is-danger': v$.entity.photoUrl.$error }"
              type="text"
              placeholder="Foto (url)"
              v-model="state.entity.photoUrl"
              @blur="v$.entity.photoUrl.$touch()"
              @change="onChange"
            />
            <p
              class="help is-danger"
              v-for="error of v$.entity.photoUrl.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <StepsNavigation
          :isFirstStep="isFirstStep"
          :isLastStep="isLastStep"
          :currentStep="currentStep"
          @onPrevStep="onPrevStep"
          @onNextStep="onNextStep"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { mask } from 'vue-the-mask'
  import useVuelidate from '@vuelidate/core'
  import { defineComponent, reactive } from 'vue'
  import StepsNavigation from '../steps-navigation/steps-navigation.vue'
  import {
    email,
    helpers,
    minLength,
    required,
    url,
  } from '@vuelidate/validators'
  import { useStore } from 'vuex'

  export default defineComponent({
    directives: { mask },
    components: { StepsNavigation },
    props: {
      isFirstStep: Boolean,
      isLastStep: Boolean,
      currentStep: {
        type: Number,
        default: 0,
      },
    },
    setup(_props, { emit }) {
      const store = useStore()

      const state = reactive({
        entity: store.getters.person,
      })
      const rules = {
        entity: {
          name: {
            required: helpers.withMessage('Nome é obrigatório.', required),
            minLength: helpers.withMessage('Nome é muito curto.', minLength(2)),
          },
          companyName: {
            required: helpers.withMessage(
              'Razão Social é obrigatório.',
              required
            ),
            minLength: helpers.withMessage(
              'Razão Social é muito curto.',
              minLength(2)
            ),
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
          cnpj: {
            required: helpers.withMessage('CNPJ é obrigatório.', required),
            minLength: helpers.withMessage('CNPJ incorreto.', minLength(13)),
          },
        },
      }
      const onChange = () => {
        emit('onChange', state.entity)
      }
      const v$ = useVuelidate(rules, state)

      const onPrevStep = (step: number) => {
        emit('onChangeStep', step)
      }

      const onNextStep = (step: number) => {
        if (v$.value.$invalid) {
          v$.value.$touch()
          return
        }

        store.commit('setIndividual', state.entity)
        emit('onChangeStep', step)
      }
      return {
        v$,
        state,
        onChange,
        onPrevStep,
        onNextStep,
      }
    },
  })
</script>
