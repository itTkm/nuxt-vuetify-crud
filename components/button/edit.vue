<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="edit()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.edit') }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    edit() {
      this.$router.push(
        this.localePath(this.path, this.$i18n.locale) + `/${this.id}/edit`
      )
    },
  },
}
</script>
