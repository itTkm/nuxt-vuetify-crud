<template>
  <v-card>
    <v-card-title>{{ this.$t('common.create') }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field :label="this.$t('todos.title')"></v-text-field>
        <v-text-field :label="this.$t('todos.userId')"></v-text-field>
        <v-checkbox :label="this.$t('todos.completed')"></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">{{ this.$t('common.save') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>
