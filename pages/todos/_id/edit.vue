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
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-card-text>
            <todo-form :todo="todo" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="invalid" @click="save()">{{
              $t('common.save')
            }}</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import deleteBtn from '@/components/button/delete'
import reloadBtn from '@/components/button/reload'
import todoForm from '@/components/form/todo'

export default {
  components: {
    ValidationObserver,
    backBtn,
    listBtn,
    deleteBtn,
    reloadBtn,
    todoForm,
  },
  async fetch({ store }) {
    if (store.state.todos.list.length === 0) {
      await store.dispatch('todos/fetchList')
    }
  },
  data() {
    return {
      todo: {},
    }
  },
  computed: {
    ...mapGetters({
      getById: 'todos/getById',
    }),
  },
  mounted() {
    this.todo = Object.assign({}, this.getById(this.$route.params.id))
  },
  methods: {
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
