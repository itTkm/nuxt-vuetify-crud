<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <v-btn icon @click="back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn icon @click="list()"><v-icon>mdi-view-list</v-icon></v-btn>
          <v-spacer />
          <v-btn icon @click="edit(todo.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon color="red" @click="removeConfirm()"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn icon @click="reload()"><v-icon>mdi-reload</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ todo.title }}</v-card-title>
        <v-card-text>
          <div>
            <v-icon>mdi-account</v-icon>{{ todo.userId }}<br />
            <v-icon>mdi-check</v-icon>{{ todo.completed }}
          </div>
        </v-card-text>
      </v-card>
    </p>
    <delete-confirm ref="deleteConfirm"></delete-confirm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteConfirm from '@/components/deleteConfirm.vue'
export default {
  components: {
    deleteConfirm,
  },
  async fetch({ store }) {
    // for direct access
    if (store.state.todos.list.length === 0) {
      await store.dispatch('todos/fetchList')
    }
  },
  data() {
    return {
      todo: [],
      userId: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters({
      getById: 'todos/getById',
    }),
  },
  mounted() {
    this.todo = this.getById(this.$route.params.id)
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    list() {
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
    async reload() {
      await this.$store.dispatch('todos/fetchList')
      this.todo = this.getById(this.$route.params.id)
    },
    edit(id) {
      this.$router.push(
        this.localePath('todos', this.$i18n.locale) + `/${id}/edit`
      )
    },
    async removeConfirm() {
      if (await this.$refs.deleteConfirm.open()) {
        this.remove()
      } else {
        // Do something in case of "cancel"
      }
    },
    async remove() {
      await this.$store.dispatch('todos/delete', this.todo)
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
  },
}
</script>
