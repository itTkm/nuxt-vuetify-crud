<template>
  <v-card>
    <v-card-title>{{ todo.title }}</v-card-title>
    <v-card-text>
      <label></label>
      <div class="text--primary">
        <v-icon>mdi-account</v-icon>{{ todo.userId }}<br />
        <v-icon>mdi-check</v-icon>{{ todo.completed }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  async asyncData({ route, app }) {
    const todo = await app.$axios.$get(
      `https://jsonplaceholder.typicode.com/todos/${route.params.id}`
    )
    return {
      todo,
    }
  },
  data() {
    return {
      userId: this.$route.params.id,
    }
  },
}
</script>
