<template>
  <div class="address-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">CEP *</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              :class="{
                'is-loading': loadingAddress,
                'is-danger': v$.address.zipcode.$error,
              }"
              v-mask="'#####-###'"
              placeholder="CEP"
              v-model="state.address.zipcode"
              @input="onChangeZipcode"
              @blur="v$.address.zipcode.$touch()"
            />
            <p v-if="loadingAddress" class="help is-info">
              Carregando endereço...
            </p>

            <p
              class="help is-danger"
              v-for="error of v$.address.zipcode.$errors"
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
          <label class="label">Endereço *</label>
          <div class="control">
            <input
              class="input"
              type="text"
              :class="{
                'is-danger': v$.address.address.$error,
              }"
              placeholder="Endereço"
              v-model="state.address.address"
              @blur="v$.address.address.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.address.$errors"
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
          <label class="label">Número *</label>
          <div class="control">
            <input
              class="input"
              type="tel"
              :class="{
                'is-danger': v$.address.number.$error,
              }"
              v-mask="'########'"
              placeholder="Número"
              v-model="state.address.number"
              @blur="v$.address.number.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.number.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Bairro</label>
          <div class="control">
            <input
              class="input"
              type="text"
              :class="{
                'is-danger': v$.address.neighborhood.$error,
              }"
              placeholder="Bairro"
              v-model="state.address.neighborhood"
              @blur="v$.address.neighborhood.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.neighborhood.$errors"
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
          <label class="label">Estado *</label>
          <div class="control">
            <input
              class="input"
              type="text"
              :class="{
                'is-danger': v$.address.address.$error,
              }"
              placeholder="Estado"
              v-model="state.address.state"
              @blur="v$.address.address.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.address.$errors"
              :key="error.id"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Cidade *</label>
          <div class="control">
            <input
              class="input"
              type="text"
              :class="{
                'is-danger': v$.address.city.$error,
              }"
              placeholder="Cidade"
              v-model="state.address.city"
              @blur="v$.address.city.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.city.$errors"
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
          <label class="label">Complemento</label>
          <div class="control">
            <input
              class="input"
              type="text"
              :class="{
                'is-danger': v$.address.complement.$error,
              }"
              placeholder="Complemento"
              v-model="state.address.complement"
              @input="onChangeComplement"
              @blur="complement.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of v$.address.complement.$errors"
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
        <div class="buttons">
          <button type="button" class="button is-light" @click="onCancel">
            Cancelar
          </button>

          <button type="button" class="button is-primary" @click="onSave">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { zipcodeService } from '@/services'
  import useVuelidate from '@vuelidate/core'
  import { helpers, minLength, required } from '@vuelidate/validators'
  import { defineComponent, reactive, ref } from 'vue'
  import { mask } from 'vue-the-mask'

  export default defineComponent({
    directives: { mask },
    props: {
      address: Object,
    },
    setup(props, { emit }) {
      const loadingAddress = ref(false)
      const state = reactive({
        address: {
          id: props.address?.id,
          zipcode: props.address?.zipcode,
          address: props.address?.address,
          number: props.address?.number,
          neighborhood: props.address?.neighborhood,
          city: props.address?.city,
          state: props.address?.state,
          complement: props.address?.complement,
        },
      })

      const rules = {
        address: {
          zipcode: {
            required: helpers.withMessage('Cep é obrigatório.', required),
            minLength: helpers.withMessage('Cep é inválido.', minLength(9)),
          },
          address: {
            required: helpers.withMessage('Endereço é obrigatório.', required),
            minLength: helpers.withMessage(
              'Endereço é inválido.',
              minLength(2)
            ),
          },
          number: {
            required: helpers.withMessage('Número é obrigatório.', required),
          },
          neighborhood: {
            minLength: helpers.withMessage('Bairro é inválido.', minLength(2)),
          },
          city: {
            required: helpers.withMessage('Cidade é obrigatória.', required),
            minLength: helpers.withMessage('Cidade é inválida.', minLength(2)),
          },
          state: {
            required: helpers.withMessage('Cidade é obrigatória.', required),
            minLength: helpers.withMessage('Cidade é inválida.', minLength(2)),
          },
          complement: {
            minLength: helpers.withMessage(
              'Complemento é inválido.',
              minLength(2)
            ),
          },
        },
      }

      const v$ = useVuelidate(rules, state)

      const onSave = () => {
        if (v$.value.$invalid) {
          v$.value.$touch()
          return
        }

        emit('onSave', state.address)
        state.address = {
          id: undefined,
          zipcode: undefined,
          address: '',
          number: undefined,
          neighborhood: '',
          city: '',
          state: '',
          complement: '',
        }
      }

      const onCancel = () => {
        emit('onCancel')
      }

      const onChangeZipcode = () => {
        if (state.address?.zipcode && !v$.value.address.zipcode.$invalid) {
          loadingAddress.value = true
          zipcodeService
            .getAddress(state.address.zipcode)
            .then((response) => {
              state.address.address = response.data.logradouro
              state.address.city = response.data.localidade
              state.address.state = response.data.uf
              state.address.neighborhood = response.data.bairro
              state.address.complement = response.data.complemento

              loadingAddress.value = false
            })
            .catch((error) => {
              loadingAddress.value = false
              console.log(error)
            })
        }
      }

      return { v$, state, onChangeZipcode, loadingAddress, onSave, onCancel }
    },
    watch: {
      address(newAddress) {
        this.state.address.id = newAddress?.id
        this.state.address.zipcode = newAddress?.zipcode
        this.state.address.address = newAddress?.address
        this.state.address.number = newAddress?.number
        this.state.address.neighborhood = newAddress?.neighborhood
        this.state.address.city = newAddress?.city
        this.state.address.state = newAddress?.state
        this.state.address.complement = newAddress?.complement
      },
    },
  })
</script>
