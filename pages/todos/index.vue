<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <v-spacer />
          <create-btn path="todos" />
          <reload-btn path="todos" />
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
import backBtn from '@/components/button/back'
import createBtn from '@/components/button/create'
import reloadBtn from '@/components/button/reload'

export default {
  components: {
    deleteConfirm,
    backBtn,
    createBtn,
    reloadBtn,
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
        this.remove(item.id)
      } else {
        // Do something in case of "cancel"
      }
    },
    async remove(id) {
      await this.$store.dispatch('todos/delete', id)
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
