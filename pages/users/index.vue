<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <v-spacer />
          <create-btn path="users" />
          <reload-btn path="users" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>
          {{ this.$t('menu.users') }} {{ this.$t('common.list') }}
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
          </v-row>
        </v-container>
        <v-data-table
          class="table-cursor"
          :headers="headers"
          :items="users"
          :items-per-page="10"
          :search="filter.search"
          @click:row="(item) => show(item.id)"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <edit-btn :id="item.id" path="users" small />
            <delete-btn :id="item.id" path="users" :item="item" small />
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
    if (store.state.users.list.length === 0) {
      await store.dispatch('users/fetchList')
    }
  },
  data() {
    return {
      filter: {
        visible: false,
        search: '',
      },
      headers: [
        { text: this.$t('users.name'), value: 'name' },
        { text: this.$t('users.username'), value: 'username' },
        { text: this.$t('users.email'), value: 'email' },
        { text: this.$t('users.phone'), value: 'phone' },
        { text: this.$t('users.website'), value: 'website' },
        { text: this.$t('common.actions'), value: 'actions' },
      ],
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/list']
    },
  },
  methods: {
    show(id) {
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
