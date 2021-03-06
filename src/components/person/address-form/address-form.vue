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
                'is-danger': zipcode.$error,
                'is-loading': loadingAddress,
              }"
              v-mask="'#####-###'"
              placeholder="CEP"
              :value="zipcode.$model"
              @input="onChangeZipcode"
              @blur="zipcode.$touch()"
            />
            <p v-if="loadingAddress" class="help is-info">
              Carregando endereço...
            </p>

            <p
              class="help is-danger"
              v-for="error of zipcode.$errors"
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
              type="tel"
              :class="{
                'is-danger': address.$error,
              }"
              placeholder="Endereço"
              :value="address.$model"
              @input="onChangeAddress"
              @blur="address.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of address.$errors"
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
                'is-danger': number.$error,
              }"
              v-mask="'########'"
              placeholder="Número"
              :value="number.$model"
              @input="onChangeNumber"
              @blur="number.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of number.$errors"
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
              type="tel"
              :class="{
                'is-danger': neighborhood.$error,
              }"
              placeholder="Endereço"
              :value="neighborhood.$model"
              @input="onChangeNeighborhood"
              @blur="neighborhood.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of neighborhood.$errors"
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
              type="tel"
              :class="{
                'is-danger': state.$error,
              }"
              placeholder="Estado"
              :value="state.$model"
              @input="onChangeState"
              @blur="state.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of state.$errors"
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
              type="tel"
              :class="{
                'is-danger': city.$error,
              }"
              placeholder="Cidade"
              :value="city.$model"
              @input="onChangeCity"
              @blur="city.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of city.$errors"
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
              type="tel"
              :class="{
                'is-danger': complement.$error,
              }"
              placeholder="Complemento"
              :value="complement.$model"
              @input="onChangeComplement"
              @blur="complement.$touch()"
            />
            <p
              class="help is-danger"
              v-for="error of complement.$errors"
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
    name: 'address-form',
    props: {
      zipcode: Object as () => Validation,
      address: Object as () => Validation,
      number: Object as () => Validation,
      neighborhood: Object as () => Validation,
      city: Object as () => Validation,
      state: Object as () => Validation,
      complement: Object as () => Validation,
      loadingAddress: Boolean,
    },
    setup(_props, { emit }) {
      const onChangeZipcode = ($event: Event) => {
        emit('onChangeZipcode', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeAddress = ($event: Event) => {
        emit('onChangeAddress', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeNumber = ($event: Event) => {
        emit('onChangeNumber', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeNeighborhood = ($event: Event) => {
        emit(
          'onChangeNeighborhood',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }
      const onChangeCity = ($event: Event) => {
        emit('onChangeCity', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeState = ($event: Event) => {
        emit('onChangeState', (<HTMLInputElement>$event.currentTarget).value)
      }
      const onChangeComplement = ($event: Event) => {
        emit(
          'onChangeComplement',
          (<HTMLInputElement>$event.currentTarget).value
        )
      }

      return {
        onChangeZipcode,
        onChangeAddress,
        onChangeNumber,
        onChangeNeighborhood,
        onChangeCity,
        onChangeState,
        onChangeComplement,
      }
    },
  })
</script>
