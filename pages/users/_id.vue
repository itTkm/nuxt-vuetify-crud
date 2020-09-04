<template>
  <v-card class="mx-auto" max-width="450">
    <v-card-title>{{ user.name }}</v-card-title>
    <v-card-text>
      <div class="text--primary">
        <v-icon>mdi-pound-box</v-icon>{{ user.id }}<br />
        <v-icon>mdi-email</v-icon>{{ user.email }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  async asyncData({ route, app }) {
    const user = await app.$axios.$get(
      `https://jsonplaceholder.typicode.com/users/${route.params.id}`
    )
    return {
      user,
    }
  },
  data() {
    return {
      userId: this.$route.params.id,
    }
  },
}
</script>
