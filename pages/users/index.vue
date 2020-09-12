<template>
  <section class="container">
    <div>
      <v-app>
        <v-card>
          <v-card-title>
            {{ this.$t('menu.users') }} {{ this.$t('common.list') }}
          </v-card-title>
          <v-data-table
            class="table-cursor"
            :headers="headers"
            :items="lists"
            :items-per-page="10"
            @click:row="(item) => show(item.id)"
          >
          </v-data-table>
        </v-card>
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
