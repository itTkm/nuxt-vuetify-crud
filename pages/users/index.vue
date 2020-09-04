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
    const baseUrl = 'https://jsonplaceholder.typicode.com/users/'
    const response = await app.$axios.$get(baseUrl)
    return { lists: response }
  },
  data() {
    return {
      headers: [
        { text: this.$t('users.name'), value: 'name' },
        { text: this.$t('users.username'), value: 'username' },
        { text: this.$t('users.email'), value: 'email' },
        { text: this.$t('users.phone'), value: 'phone' },
        { text: this.$t('users.website'), value: 'website' },
      ],
    }
  },
  methods: {},
}
</script>
