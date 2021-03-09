<template>
  <article class="person-register">
    <ErrorMessage :errorMessage="errorMessage" @onClose="onCloseError" />
    <FormSteps :step="steps[currentStep].name" />
    <PersonTypeForm
      v-show="currentStep === 0"
      :personType="personType"
      @onChangePersonType="personType = $event"
      :currentStep="currentStep"
      @onChangeStep="onChangeStep"
    />
    <IndividualPersonRegister
      v-if="personType === 'individual'"
      :isFirstStep="currentStep === 0"
      :isLastStep="currentStep === steps.length - 1"
      :currentStep="currentStep"
      :loading="loading"
      @onChangeStep="onChangeStep"
      @onSubmit="onSubmitIndividualPerson"
    />
    <EntityPersonRegister
      v-if="personType === 'entity'"
      :isFirstStep="currentStep === 0"
      :isLastStep="currentStep === steps.length - 1"
      :currentStep="currentStep"
      :loading="loading"
      @onChangeStep="onChangeStep"
      @onSubmit="onSubmitEntityPerson"
    />
  </article>
</template>
<script lang="ts">
  import { useStore } from 'vuex'
  import { router } from '@/router'
  import { Person } from '@/models'
  import { FormSteps } from '../form-steps'
  import { personService } from '@/services'
  import { defineComponent, ref } from 'vue'
  import { PersonTypeForm } from '../person-type-form'
  import { EntityPersonRegister } from '../entity-person-register'
  import { IndividualPersonRegister } from '../individual-person-register'
  import { ErrorMessage } from '@/components/error-message'

  export default defineComponent({
    components: {
      FormSteps,
      ErrorMessage,
      PersonTypeForm,
      EntityPersonRegister,
      IndividualPersonRegister,
    },
    setup() {
      const store = useStore()
      const steps = ref([
        {
          name: 'personal',
        },
        {
          name: 'address',
        },
      ])
      const currentStep = ref(0)
      const errorMessage = ref('')
      const personType = ref(store.getters.person.type || 'individual')
      const loading = ref(false)

      const onChangeStep = (step: number) => {
        if (step < 0) {
          router.push('/')
        } else {
          currentStep.value = step
        }
      }

      const onSubmitIndividualPerson = async (person: Person) => {
        try {
          loading.value = true

          if (!person._id) {
            await personService.create({ ...person, type: personType.value })
          } else {
            await personService.update({ ...person, type: personType.value })
          }

          loading.value = false
          router.push('/')
        } catch (error) {
          loading.value = false
          errorMessage.value = 'Ocorreu um erro ao salvar'
        }
      }

      const onSubmitEntityPerson = async (person: Person) => {
        try {
          loading.value = true

          if (!person._id) {
            await personService.create({ ...person, type: personType.value })
          } else {
            await personService.update({ ...person, type: personType.value })
          }

          loading.value = false
          router.push('/')
        } catch (error) {
          loading.value = false
          errorMessage.value = 'Ocorreu um erro ao salvar'
        }
      }

      const onCloseError = () => {
        errorMessage.value = ''
      }

      return {
        steps,
        loading,
        personType,
        currentStep,
        onChangeStep,
        errorMessage,
        onCloseError,
        onSubmitEntityPerson,
        onSubmitIndividualPerson,
      }
    },
  })
</script>
<style lang="scss">
  .person-register {
    .steps {
      width: $form-width;
      max-width: 100%;
      padding: 40px 10px 0 15px;
    }
  }
</style>
