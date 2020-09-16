<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click.stop="reload()">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </template>
    <span>{{ $t('common.reload') }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      getTodoById: 'todos/getById',
    }),
  },
  methods: {
    async reload() {
      await this.$store.dispatch(`${this.path}/fetchList`)
      if (this.path === 'todos' && this.id) {
        this.$emit('reloaded', this.getTodoById(this.id))
      }
    },
  },
}
</script>
