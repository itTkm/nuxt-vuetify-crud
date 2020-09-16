<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click.stop="create()">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.create') }}</span>
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
    create() {
      this.$router.push(
        this.localePath(this.path, this.$i18n.locale) + `/create`
      )
    },
  },
}
</script>
