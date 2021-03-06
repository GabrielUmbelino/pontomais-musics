<template>
  <div class="individual-person-register">
    <form>
      <IndividualForm
        v-if="currentStep === 0"
        :cpf="v$.individualForm.cpf"
        :gender="v$.individualForm.gender"
        :birthDate="v$.individualForm.birthDate"
        @onChangeCpf="individualForm.cpf = $event"
        @onChangeGender="individualForm.gender = $event"
        @onChangeBirthDate="individualForm.birthDate = $event"
      />
      <PersonForm
        v-if="currentStep === 0"
        :name="v$.personalForm.name"
        :email="v$.personalForm.email"
        :phoneNumber="v$.personalForm.phoneNumber"
        :mobilePhoneNumber="v$.personalForm.mobilePhoneNumber"
        :photoUrl="v$.personalForm.photoUrl"
        @onChangeName="personalForm.name = $event"
        @onChangeEmail="personalForm.email = $event"
        @onChangePhoneNumber="personalForm.phoneNumber = $event"
        @onChangeMobilePhoneNumber="personalForm.mobilePhoneNumber = $event"
        @onChangePhotoUrl="personalForm.photoUrl = $event"
      />
      <AddressForm
        v-if="currentStep === 1"
        :loadingAddress="loadingAddress"
        :zipcode="v$.addressForm.zipcode"
        :address="v$.addressForm.address"
        :number="v$.addressForm.number"
        :neighborhood="v$.addressForm.neighborhood"
        :city="v$.addressForm.city"
        :state="v$.addressForm.state"
        :complement="v$.addressForm.complement"
        @onChangeZipcode="onChangeZipcode"
        @onChangeAddress="addressForm.address = $event"
        @onChangeNumber="addressForm.number = $event"
        @onChangeNeighborhood="addressForm.neighborhood = $event"
        @onChangeCity="addressForm.city = $event"
        @onChangeState="addressForm.state = $event"
        @onChangeComplement="addressForm.complement = $event"
      />

      <div class="columns is-mobile is-gapless">
        <div class="column is-6">
          <button
            type="buttone"
            class="button is-light is-pulled-left"
            :disabled="cantGoBack"
            @click="prevStep"
          >
            Voltar
          </button>
        </div>
        <div class="column is-6">
          <button
            type="buttone"
            class="button is-primary is-pulled-right"
            :disabled="cantGoNext"
            @click="nextStep"
          >
            Próximo
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
  import {
    FormSteps,
    PersonForm,
    IndividualForm,
    AddressForm,
  } from '@/components/person'
  import {
    url,
    email,
    helpers,
    required,
    minLength,
  } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { defineComponent, reactive, ref } from 'vue'
  import { zipcodeService } from '@/services'

  export default defineComponent({
    name: 'person-register',
    components: {
      FormSteps,
      PersonForm,
      IndividualForm,
      AddressForm,
    },
    props: {
      cantGoBack: Boolean,
      cantGoNext: Boolean,
      currentStep: {
        type: Number,
        default: 0,
      },
    },
    setup(props, { emit }) {
      const user: any = {
        cpf: '08077953999',
        gender: 'male',
        birthDate: '30091993',
        name: 'Gabriel Ferreira',
        email: 'gabriel.f.umbelino@gmail.com',
      }
      const state = reactive({
        individualForm: {
          cpf: user.cpf || '',
          gender: user.gender || '',
          birthDate: user.birthDate || '',
        },
        personalForm: {
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          mobilePhoneNumber: user.mobilePhoneNumber || '',
          photoUrl: user.photoUrl || '',
        },
        addressForm: {
          zipcode: user.zipcode || '',
          address: user.address || '',
          number: user.number || '',
          neighborhood: user.neighborhood || '',
          city: user.city || '',
          state: user.state || '',
          complement: user.complement || '',
        },
      })
      const loadingAddress = ref(false)
      const rules = {
        individualForm: {
          cpf: {
            required: helpers.withMessage('Cpf é obrigatório.', required),
            minLength: helpers.withMessage('CPF incorreto.', minLength(11)),
          },
          gender: {
            required: helpers.withMessage('Sexo é obrigatório.', required),
          },
          birthDate: {
            required: helpers.withMessage(
              'Data de nascimento é obrigatório.',
              required
            ),
          },
        },
        personalForm: {
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
        addressForm: {
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
      const prevStep = ($event: Event) => {
        $event.preventDefault()

        emit('onChangeStep', props.currentStep - 1, !v$.value.$invalid)
      }
      const nextStep = ($event: Event) => {
        $event.preventDefault()
        if (
          props.currentStep === 0 &&
          (v$.value.individualForm.$invalid || v$.value.personalForm.$invalid)
        ) {
          v$.value.$touch()
          return
        }

        if (props.currentStep === 1 && v$.value.addressForm.$invalid) {
          v$.value.$touch()
          return
        }

        emit('onChangeStep', props.currentStep + 1, !v$.value.$invalid)
      }
      const onChangeZipcode = (zipcode: String) => {
        state.addressForm.zipcode = zipcode

        if (!v$.value.addressForm.zipcode.$invalid) {
          loadingAddress.value = true
          zipcodeService
            .getAddress(zipcode)
            .then((response) => {
              state.addressForm.address = response.data.logradouro
              state.addressForm.city = response.data.localidade
              state.addressForm.state = response.data.uf
              state.addressForm.neighborhood = response.data.bairro
              state.addressForm.complement = response.data.complemento
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {
              loadingAddress.value = false
            })
        }
      }

      return {
        v$,
        nextStep,
        prevStep,
        loadingAddress,
        onChangeZipcode,
        individualForm: state.individualForm,
        personalForm: state.personalForm,
        addressForm: state.addressForm,
      }
    },
  })
</script>
<style lang="scss">
  .individual-person-register {
    form {
      width: $form-width;
      max-width: 100%;
      margin: 10px auto;
      padding: 0 15px;

      > .columns {
        padding: 60px 0 40px;
      }
    }
  }
</style>
