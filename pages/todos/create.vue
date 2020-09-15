<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <v-btn icon @click="back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn icon @click="list()"><v-icon>mdi-view-list</v-icon></v-btn>
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
export default {
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
    back() {
      this.$router.go(-1)
    },
    list() {
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
    async create() {
      await this.$store.dispatch('todos/create', this.todo)
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
  },
}
</script>
