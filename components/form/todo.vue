<template>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <v-card-text>
      <v-form>
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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="invalid" @click="save()">{{
        $t('common.save')
      }}</v-btn>
    </v-card-actions>
  </ValidationObserver>
</template>

<script>
import {
  localize,
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import { required, between, ext } from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

localize('ja', ja)
extend('required', required)
extend('between', between)
extend('ext', ext)

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    save() {
      this.$emit('save')
    },
  },
}
</script>
