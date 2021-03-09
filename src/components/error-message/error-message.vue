<template>
  <article v-if="errorMessage" class="message is-danger">
    <div class="message-header">
      <p>Aviso!</p>
      <button v-if="showClose" class="delete" @click="onCloseError"></button>
    </div>
    <div class="message-body">
      {{ errorMessage }}
    </div>
  </article>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    props: {
      showClose: {
        type: Boolean,
        default: true,
      },
      errorMessage: String,
    },
    setup(_props, { emit }) {
      const onCloseError = () => {
        emit('onClose')
      }

      return {
        onCloseError,
      }
    },
  })
</script>
<style lang="scss">
  article.message.is-danger {
    display: inline-block;
    min-width: 320px;
    margin: auto;
  }
</style>
