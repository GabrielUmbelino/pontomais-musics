<template>
  <article class="person-register">
    <FormSteps :step="steps[currentStep].name" />
    <PersonTypeForm
      v-show="currentStep === 0"
      :personType="personType"
      @onChangePersonType="personType = $event"
      :currentStep="currentStep"
      @onChangeStep="onChangeStep"
    />
    <IndividualPersonRegister
      v-show="personType === 'individual'"
      :cantGoBack="currentStep === 0"
      :cantGoNext="currentStep === steps.length - 1"
      :currentStep="currentStep"
      @onChangeStep="onChangeStep"
    />
  </article>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import {
    FormSteps,
    PersonTypeForm,
    IndividualPersonRegister,
  } from '@/components'

  export default defineComponent({
    name: 'person-register',
    components: {
      FormSteps,
      PersonTypeForm,
      IndividualPersonRegister,
    },
    setup() {
      const steps = ref([
        {
          name: 'personal',
          isValid: false,
        },
        {
          name: 'address',
          isValid: false,
        },
        {
          name: 'complete',
          isValid: false,
        },
      ])
      const currentStep = ref(0)
      const personType = ref('individual')
      const onChangeStep = (step: number, isValid: boolean) => {
        const newSteps = [...steps.value]
        newSteps[currentStep.value] = {
          ...steps.value[currentStep.value],
          isValid,
        }
        steps.value = newSteps
        currentStep.value = step
      }

      return { personType, steps, currentStep, onChangeStep }
    },
  })
</script>
<style lang="scss">
  .person-register {
    .steps {
      width: $form-width;
      max-width: 100%;
      padding-top: 40px;
    }
  }
</style>
