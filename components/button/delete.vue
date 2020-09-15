<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="red" v-bind="attrs" v-on="on" @click="removeConfirm()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <delete-confirm ref="deleteConfirm"></delete-confirm>
    </template>
    <span>{{ $t('common.delete') }}</span>
  </v-tooltip>
</template>

<script>
import deleteConfirm from '@/components/deleteConfirm.vue'
export default {
  components: {
    deleteConfirm,
  },
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
    async removeConfirm() {
      if (await this.$refs.deleteConfirm.open()) {
        this.remove()
      } else {
        // Do something in case of "cancel"
      }
    },
    async remove() {
      await this.$store.dispatch(`${this.path}/delete`, this.id)
      this.$router.push(this.localePath(this.path, this.$i18n.locale))
    },
  },
}
</script>
