<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="todos" />
          <v-spacer />
          <delete-btn :id="todo.id" path="todos" />
          <reload-btn :id="todo.id" path="todos" @reloaded="reloaded" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ $t('common.edit') }}</v-card-title>
        <todo-form :todo="todo" @save="save" />
      </v-card>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import deleteBtn from '@/components/button/delete'
import reloadBtn from '@/components/button/reload'
import todoForm from '@/components/form/todo'

export default {
  components: {
    backBtn,
    listBtn,
    deleteBtn,
    reloadBtn,
    todoForm,
  },
  // async fetch({ store }) {
  //   if (store.state.todos.list.length === 0) {
  //     await store.dispatch('todos/fetchList')
  //   }
  // },
  data() {
    return {
      todo: {
        id: -1,
      },
    }
  },
  computed: {
    ...mapGetters({
      getById: 'todos/getById',
    }),
  },
  // mounted() {
  //   this.todo = Object.assign({}, this.getById(this.$route.params.id))
  // },
  async mounted() {
    if (this.$store.state.todos.list.length === 0) {
      await this.fetchList()
    }
    this.todo = Object.assign({}, this.getById(this.$route.params.id))
  },
  methods: {
    ...mapActions('todos', ['fetchList']),
    reloaded(item) {
      this.todo = item
    },
    async save() {
      await this.$store.dispatch('todos/update', this.todo)
      this.$router.push(
        this.localePath('todos', this.$i18n.locale) + `/${this.todo.id}`
      )
    },
  },
}
</script>
