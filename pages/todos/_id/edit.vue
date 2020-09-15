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
        <v-card-title>{{ this.$t('common.edit') }}</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="todo.title"
              :label="this.$t('todos.title')"
            ></v-text-field>
            <v-text-field
              v-model="todo.userId"
              :label="this.$t('todos.userId')"
            ></v-text-field>
            <v-checkbox
              v-model="todo.completed"
              :label="this.$t('todos.completed')"
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="save()">{{
            this.$t('common.save')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import deleteBtn from '@/components/button/delete'
import reloadBtn from '@/components/button/reload'

export default {
  components: {
    backBtn,
    listBtn,
    deleteBtn,
    reloadBtn,
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
