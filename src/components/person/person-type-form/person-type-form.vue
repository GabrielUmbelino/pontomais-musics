<template>
  <div class="person-type-form">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Tipo de pessoa *</label>
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                name="personType"
                value="individual"
                :checked="personType === 'individual'"
                @change="onChangePersonType"
              />
              Pessoa Física
            </label>
            <label class="radio">
              <input
                type="radio"
                name="personType"
                value="entity"
                :checked="personType === 'entity'"
                @change="onChangePersonType"
              />
              Pessoa Jurídica
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      personType: String,
    },
    setup(_props, { emit }) {
      const onChangePersonType = ($event: Event) => {
        emit(
          'onChangePersonType',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }

      return {
        onChangePersonType,
      }
    },
  })
</script>
<style lang="scss">
  .person-type-form {
    width: $form-width;
    max-width: 100%;
    padding: 0 15px;
    margin: 20px auto 0;
  }
</style>
