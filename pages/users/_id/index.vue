<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="users" />
          <v-spacer />
          <edit-btn :id="user.id" path="users" />
          <delete-btn :id="user.id" path="users" />
          <reload-btn :id="user.id" path="users" @reloaded="reloaded" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-text>
          <div>
            <v-icon small>mdi-pound</v-icon> {{ user.id }}<br />
            <v-icon small>mdi-identifier</v-icon> {{ user.username }}<br />
            <v-icon small>mdi-email</v-icon> {{ user.email }}<br />
            <v-icon small>mdi-phone</v-icon> {{ user.phone }}<br />
            <v-icon small>mdi-web</v-icon> {{ user.website }}
          </div>
        </v-card-text>
      </v-card>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import editBtn from '@/components/button/edit'
import deleteBtn from '@/components/button/delete'
import reloadBtn from '@/components/button/reload'

export default {
  components: {
    backBtn,
    listBtn,
    editBtn,
    deleteBtn,
    reloadBtn,
  },
  data() {
    return {
      userId: this.$route.params.id,
      user: {
        name: '',
        id: -1,
        username: '',
        email: '',
        phone: '',
        website: '',
      },
    }
  },
  computed: {
    ...mapGetters('users', ['getById']),
  },
  async mounted() {
    if (this.$store.state.users.list.length === 0) {
      await this.fetchList()
    }
    this.user = this.getById(this.$route.params.id)
  },
  methods: {
    ...mapActions('users', ['fetchList']),
    reloaded(item) {
      this.user = item
    },
  },
}
</script>
