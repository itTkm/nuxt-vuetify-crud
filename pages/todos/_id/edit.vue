<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <v-btn icon @click="back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn icon @click="list()"><v-icon>mdi-view-list</v-icon></v-btn>
          <v-spacer />
          <v-btn icon color="red" @click="removeConfirm()"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn icon @click="reload()"><v-icon>mdi-reload</v-icon></v-btn>
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
    back() {
      this.$router.go(-1)
    },
    list() {
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
    async save() {
      await this.$store.dispatch('todos/update', this.todo)
      this.$router.push(
        this.localePath('todos', this.$i18n.locale) + `/${this.todo.id}`
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
