<template>
  <section class="container">
    <div>
      <v-app>
        <v-data-table
          :headers="headers"
          :items="lists"
          :items-per-page="10"
          @click:row="(r) => $router.push(`/todos/${r.id}`)"
        >
          <template v-slot:[`item.userId`]="{ item }">
            <nuxt-link :to="`/users/${item.userId}`">
              <v-chip>{{ item.userId }}</v-chip>
            </nuxt-link>
          </template>
        </v-data-table>
      </v-app>
    </div>
  </section>
</template>

<script>
export default {
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
      ],
    }
  },
  methods: {},
}
</script>
