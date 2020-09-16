<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="todos" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ $t('common.create') }}</v-card-title>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-card-text>
            <todo-form :todo="todo" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="invalid" @click="create()">{{
              $t('common.save')
            }}</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import todoForm from '@/components/form/todo'

export default {
  components: {
    ValidationObserver,
    backBtn,
    listBtn,
    todoForm,
  },
  data() {
    return {
      todo: {
        title: '',
        userId: '',
        completed: false,
      },
    }
  },
  methods: {
    async create() {
      await this.$store.dispatch('todos/create', this.todo)
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
  },
}
</script>
