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
        <v-card-title>{{ this.$t('common.create') }}</v-card-title>
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
          <v-btn color="primary" @click="create()">{{
            this.$t('common.save')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </p>
  </div>
</template>

<script>
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'

export default {
  components: {
    backBtn,
    listBtn,
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
