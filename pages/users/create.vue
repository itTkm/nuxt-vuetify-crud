<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="users" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ $t('common.create') }}</v-card-title>
        <user-form :user="user" @save="create" />
      </v-card>
    </p>
  </div>
</template>

<script>
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import userForm from '@/components/form/user'

export default {
  components: {
    backBtn,
    listBtn,
    userForm,
  },
  data() {
    return {
      user: {
        title: '',
        userId: '',
        completed: false,
      },
    }
  },
  methods: {
    async create() {
      await this.$store.dispatch('users/create', this.user)
      this.$router.push(this.localePath('users', this.$i18n.locale))
    },
  },
}
</script>
