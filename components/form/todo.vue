<template>
  <v-form>
    <!-- <ValidationObserver ref="observer" v-slot="{ invalid }"> -->
    <ValidationProvider
      v-slot="{ errors }"
      :name="$t('todos.title')"
      rules="required"
    >
      <v-text-field
        v-model="todo.title"
        :label="$t('todos.title')"
        :error-messages="errors"
      ></v-text-field>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :name="$t('todos.userId')"
      rules="required"
    >
      <v-text-field
        v-model="todo.userId"
        :label="$t('todos.userId')"
        :error-messages="errors"
      ></v-text-field>
    </ValidationProvider>
    <v-checkbox
      v-model="todo.completed"
      :label="$t('todos.completed')"
    ></v-checkbox>
    <!-- </ValidationObserver> -->
  </v-form>
</template>

<script>
import {
  localize,
  extend,
  ValidationProvider,
  // ValidationObserver,
} from 'vee-validate'
import { required, between, ext } from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

localize('ja', ja)
extend('required', required)
extend('between', between)
extend('ext', ext)

export default {
  components: {
    ValidationProvider,
    // ValidationObserver,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
}
</script>
