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
          {{ $t('menu.todos') }} {{ $t('common.list') }}
          <v-spacer />
          <filter-btn @click="filter.visible = !filter.visible" />
        </v-card-title>
        <v-container v-if="filter.visible === true">
          <v-row>
            <v-spacer />
            <v-col>
              <v-text-field
                v-model="filter.search"
                append-icon="mdi-magnify"
                :label="$t('common.search')"
                single-line
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="filter.completed"
                :items="filter.completedItems"
                item-text="label"
                item-value="value"
                :label="$t('todos.completed')"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          class="table-cursor"
          :headers="headers"
          :items="todos"
          :items-per-page="10"
          :search="filter.search"
          @click:row="(item) => show(item.id)"
        >
          <template v-slot:[`item.userId`]="{ item }">
            <v-chip @click.stop="user(item.userId)">{{ item.userId }}</v-chip>
          </template>
          <template v-slot:[`item.completed`]="{ item }">
            <v-simple-checkbox
              v-model="item.completed"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <edit-btn :id="item.id" path="todos" small />
            <delete-btn :id="item.id" path="todos" :item="item" small />
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
import editBtn from '@/components/button/edit'
import deleteBtn from '@/components/button/delete'
import filterBtn from '@/components/button/filter'

export default {
  components: {
    deleteConfirm,
    backBtn,
    createBtn,
    reloadBtn,
    editBtn,
    deleteBtn,
    filterBtn,
  },
  async fetch({ store }) {
    if (store.state.todos.list.length === 0) {
      await store.dispatch('todos/fetchList')
    }
  },
  data() {
    return {
      filter: {
        visible: false,
        search: '',
        completed: '',
        completedItems: [
          { label: this.$t('todos.completed'), value: 'completed' },
          { label: this.$t('todos.uncompleted'), value: 'uncompleted' },
        ],
      },
      headers: [
        {
          text: this.$t('todos.title'),
          align: 'left',
          sortable: false,
          value: 'title',
        },
        { text: this.$t('todos.userId'), value: 'userId' },
        {
          text: this.$t('todos.completed'),
          value: 'completed',
          filter: (value) => {
            if (!this.filter.completed) return true
            else if (this.filter.completed === 'completed' && value) return true
            else if (this.filter.completed === 'uncompleted' && !value)
              return true
          },
        },
        { text: this.$t('common.actions'), value: 'actions' },
      ],
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
  },
}
</script>

<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
