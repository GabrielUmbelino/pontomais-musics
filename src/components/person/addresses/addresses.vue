<template>
  <div>
    <div class="tile is-parent is-vertical">
      <article
        class="tile is-child notification"
        v-for="(address, i) in state.addresses"
        :key="i"
      >
        <p class="title">{{ address.zipcode }}</p>
        <p class="subtitle">{{ address.address }} {{ address.number }}</p>
        <div class="buttons">
          <button type="button" class="button is-danger" @click="onDelete(i)">
            Delete
          </button>
          <button type="button" class="button is-info" @click="onEdit(i)">
            Editar
          </button>
        </div>
      </article>
    </div>
    <div class="columns">
      <div class="column is-12">
        <button type="button" class="button is-primary" @click="addAddress">
          Adicionar Endereço
        </button>
      </div>
    </div>
    <div class="columns" v-if="showForm">
      <div class="column is-12">
        <AddressForm :address="address" @onSave="onSave" @onCancel="onCancel" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <div
          v-if="v$.addresses.$dirty && !state.addresses.length"
          class="notification is-danger"
        >
          Adicione um endereço.
        </div>
        <StepsNavigation
          :isFirstStep="isFirstStep"
          :isLastStep="isLastStep"
          :currentStep="currentStep"
          :loading="loading"
          @onPrevStep="onPrevStep"
          @onNextStep="onNextStep"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { useStore } from 'vuex'
  import { defineComponent, reactive, ref } from 'vue'
  import AddressForm from './address-form.vue'
  import { StepsNavigation } from '../steps-navigation'
  import useVuelidate from '@vuelidate/core'
  import { Address } from '@/models'
  import { required } from '@vuelidate/validators'

  export default defineComponent({
    components: {
      AddressForm,
      StepsNavigation,
    },
    props: {
      loading: Boolean,
      isLastStep: Boolean,
      isFirstStep: Boolean,
      currentStep: {
        type: Number,
        default: 0,
      },
    },
    setup(_props, { emit }) {
      const address = ref()
      const store = useStore()
      const showForm = ref(false)

      const state = reactive({
        addresses: store.getters.person.addresses,
      })

      const rules = {
        addresses: {
          $each: {
            required,
          },
        },
      }
      const v$ = useVuelidate(rules, state)

      const addAddress = ($event: Event) => {
        showForm.value = false
        address.value = {}
        $event.preventDefault()
        showForm.value = true
      }

      const onCancel = () => {
        showForm.value = false
        address.value = {}
      }

      const onSave = (newAddress: Address) => {
        if (newAddress.id !== undefined) {
          store.commit('updateAddress', {
            index: newAddress.id,
            address: newAddress,
          })
        } else {
          store.commit('addAddress', newAddress)
        }
        state.addresses = store.getters.person.addresses
        showForm.value = false
        address.value = {}
      }

      const onEdit = (index: number) => {
        showForm.value = false
        address.value = { ...store.getters.person.addresses[index], id: index }
        showForm.value = true
      }

      const onDelete = (index: number) => {
        store.commit('removeAddresses', index)

        showForm.value = false
        address.value = {}
        state.addresses = store.getters.person.addresses
      }

      const onPrevStep = (step: number) => {
        emit('onChangeStep', step)
        state.addresses = store.getters.person.addresses
      }

      const onNextStep = () => {
        v$.value.$touch()
        if (v$.value.$invalid || state.addresses.length === 0) {
          return
        }

        emit('onSubmit')
      }

      return {
        v$,
        state,
        onEdit,
        onSave,
        onCancel,
        onDelete,
        showForm,
        addAddress,
        onNextStep,
        onPrevStep,
        address,
      }
    },
  })
</script>
<style lang="scss">
  .tile.is-vertical.is-parent {
    padding: 20px 0;
  }
</style>
