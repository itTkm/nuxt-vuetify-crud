<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click.stop="filter()">
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.filter') }}</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    filter() {
      this.$emit('click')
    },
  },
}
</script>
