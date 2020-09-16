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
        <todo-form :todo="todo" @save="create" />
      </v-card>
    </p>
  </div>
</template>

<script>
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import todoForm from '@/components/form/todo'

export default {
  components: {
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
