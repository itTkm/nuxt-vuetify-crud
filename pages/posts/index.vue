<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <v-spacer />
          <create-btn path="posts" />
          <reload-btn path="posts" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>
          {{ $t('menu.posts') }} {{ $t('common.list') }}
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
                :label="$t('posts.completed')"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          class="table-cursor"
          :headers="headers"
          :items="posts"
          :items-per-page="10"
          :search="filter.search"
          @click:row="(item) => show(item.id)"
        >
          <template v-slot:[`item.userId`]="{ item }">
            <v-chip @click.stop="user(item.userId)">{{ item.userId }}</v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <edit-btn :id="item.id" path="posts" small />
            <delete-btn :id="item.id" path="posts" :item="item" small />
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
    if (store.state.posts.list.length === 0) {
      await store.dispatch('posts/fetchList')
    }
  },
  data() {
    return {
      filter: {
        visible: false,
        search: '',
      },
      headers: [
        {
          text: this.$t('posts.title'),
          align: 'left',
          value: 'title',
        },
        { text: this.$t('posts.userId'), value: 'userId' },
        { text: this.$t('common.actions'), value: 'actions' },
      ],
    }
  },
  computed: {
    posts() {
      return this.$store.getters['posts/list']
    },
  },
  methods: {
    show(id) {
      this.$router.push(this.localePath('posts', this.$i18n.locale) + `/${id}`)
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
