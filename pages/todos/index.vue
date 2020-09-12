<template>
  <section class="container">
    <div>
      <v-app>
        <v-card>
          <v-card-title>
            {{ this.$t('menu.todos') }} {{ this.$t('common.list') }}
          </v-card-title>
          <v-data-table
            class="table-cursor"
            :headers="headers"
            :items="lists"
            :items-per-page="10"
            @click:row="(item) => show(item.id)"
          >
            <template v-slot:[`item.userId`]="{ item }">
              <v-chip @click.stop="user(item.userId)">{{ item.userId }}</v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon>
                <v-icon small @click.stop="edit(item.id)"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon color="red">
                <v-icon small @click.stop="removeConfirm(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
        <delete-confirm ref="deleteConfirm"></delete-confirm>
        <v-btn dark fab bottom right fixed color="primary" @click="create()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app>
    </div>
  </section>
</template>

<script>
import deleteConfirm from '@/components/deleteConfirm.vue'
export default {
  components: {
    deleteConfirm,
  },
  async asyncData({ app }) {
    const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
    const response = await app.$axios.$get(baseUrl)
    return { lists: response }
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('todos.title'),
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: this.$t('todos.userId'), value: 'userId' },
        { text: this.$t('todos.completed'), value: 'completed' },
        { text: this.$t('common.actions'), value: 'actions' },
      ],
      deleteConfirm: {
        dialog: false,
        itemTitle: '',
        itemUserId: '',
        itemCompleted: false,
      },
    }
  },
  methods: {
    show(id) {
      this.$router.push(this.localePath('todos', this.$i18n.locale) + `/${id}`)
    },
    user(id) {
      this.$router.push(this.localePath('users', this.$i18n.locale) + `/${id}`)
    },
    edit(id) {
      this.$router.push(
        this.localePath('todos', this.$i18n.locale) + `/${id}/edit`
      )
    },
    async removeConfirm(item) {
      if (await this.$refs.deleteConfirm.open(item)) {
        this.remove()
      } else {
        // Do something in case of "cancel"
      }
    },
    remove(item) {},
    create() {
      this.$router.push(this.localePath('todos', this.$i18n.locale) + `/create`)
    },
  },
}
</script>

<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
