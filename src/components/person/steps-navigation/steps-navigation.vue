<template>
  <div class="columns is-mobile is-gapless step-navigation">
    <div class="column is-6">
      <button
        type="button"
        class="button is-light is-pulled-left is-medium"
        @click="prevStep"
      >
        Voltar
      </button>
    </div>
    <div class="column is-6">
      <button
        v-if="!isLastStep"
        type="button"
        class="button is-primary is-pulled-right is-medium"
        @click="nextStep"
      >
        Próximo
      </button>
      <button
        v-else
        type="text"
        class="button is-primary is-pulled-right is-medium"
        :class="{ 'is-loading': loading }"
        :disabled="loading"
        @click="nextStep"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      loading: Boolean,
      isLastStep: Boolean,
      isFirstStep: Boolean,
      currentStep: {
        type: Number,
        default: 0,
      },
    },
    setup(props, context) {
      const prevStep = ($event: Event) => {
        $event.preventDefault()
        context.emit('onPrevStep', props.currentStep - 1)
      }

      const nextStep = ($event: Event) => {
        $event.preventDefault()
        context.emit('onNextStep', props.currentStep + 1)
      }

      return {
        prevStep,
        nextStep,
      }
    },
  })
</script>
