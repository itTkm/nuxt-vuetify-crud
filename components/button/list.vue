<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click.stop="list()">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.list') }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  methods: {
    list() {
      this.$router.push(this.localePath(this.path, this.$i18n.locale))
    },
  },
}
</script>
