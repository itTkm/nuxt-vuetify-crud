<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <v-btn icon @click="back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-spacer />
          <v-btn icon @click="create()"><v-icon>mdi-plus-circle</v-icon></v-btn>
          <v-btn icon @click="reload()"><v-icon>mdi-reload</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>
          {{ this.$t('menu.todos') }} {{ this.$t('common.list') }}
        </v-card-title>
        <v-data-table
          class="table-cursor"
          :headers="headers"
          :items="todos"
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
  async fetch({ store }) {
    if (store.state.todos.list.length === 0) {
      await store.dispatch('todos/fetchList')
    }
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
  computed: {
    todos() {
      return this.$store.getters['todos/list']
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async reload() {
      await this.$store.dispatch('todos/fetchList')
    },
    show(id) {
      this.$router.push(this.localePath('todos', this.$i18n.locale) + `/${id}`)
    },
    user(id) {
      this.$router.push(this.localePath('users', this.$i18n.locale) + `/${id}`)
    },
    create() {
      this.$router.push(this.localePath('todos', this.$i18n.locale) + `/create`)
    },
    edit(id) {
      this.$router.push(
        this.localePath('todos', this.$i18n.locale) + `/${id}/edit`
      )
    },
    async removeConfirm(item) {
      if (await this.$refs.deleteConfirm.open(item)) {
        this.remove(item)
      } else {
        // Do something in case of "cancel"
      }
    },
    async remove(item) {
      await this.$store.dispatch('todos/delete', item)
      this.$router.push(this.localePath('todos', this.$i18n.locale))
    },
  },
}
</script>

<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
