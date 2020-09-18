<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="posts" />
          <v-spacer />
          <edit-btn :id="post.id" path="posts" />
          <delete-btn :id="post.id" path="posts" />
          <reload-btn :id="post.id" path="posts" @reloaded="reloaded" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>
          <div>
            <v-icon small>mdi-account</v-icon> {{ post.userId }}<br />
            <v-icon small>mdi-text-subject</v-icon> {{ post.body }}
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
      post: {
        id: -1,
      },
      userId: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters('posts', ['getById']),
  },
  async mounted() {
    if (this.$store.state.posts.list.length === 0) {
      await this.fetchList()
    }
    this.post = this.getById(this.$route.params.id)
  },
  methods: {
    ...mapActions('posts', ['fetchList']),
    reloaded(item) {
      this.post = item
    },
  },
}
</script>
