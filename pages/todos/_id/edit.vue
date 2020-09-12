<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <v-btn icon @click="back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-spacer />
          <v-btn icon color="red" @click="removeConfirm()"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
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
import deleteConfirm from '@/components/deleteConfirm.vue'
export default {
  components: {
    deleteConfirm,
  },
  async asyncData({ route, app }) {
    const todo = await app.$axios.$get(
      `https://jsonplaceholder.typicode.com/todos/${route.params.id}`
    )
    return {
      todo,
    }
  },
  data() {
    return {
      userId: this.$route.params.id,
    }
  },
  methods: {
    save() {},
    back() {
      this.$router.go(-1)
    },
    list() {
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
    async removeConfirm() {
      if (await this.$refs.deleteConfirm.open()) {
        this.remove()
      } else {
        // Do something in case of "cancel"
      }
    },
    remove() {},
  },
}
</script>
