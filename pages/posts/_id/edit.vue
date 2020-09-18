<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="posts" />
          <v-spacer />
          <delete-btn :id="post.id" path="posts" />
          <reload-btn :id="post.id" path="posts" @reloaded="reloaded" />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ $t('common.edit') }}</v-card-title>
        <post-form :post="post" @save="save" />
      </v-card>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import deleteBtn from '@/components/button/delete'
import reloadBtn from '@/components/button/reload'
import postForm from '@/components/form/post'

export default {
  components: {
    backBtn,
    listBtn,
    deleteBtn,
    reloadBtn,
    postForm,
  },
  // async fetch({ store }) {
  //   if (store.state.posts.list.length === 0) {
  //     await store.dispatch('posts/fetchList')
  //   }
  // },
  data() {
    return {
      post: {
        id: -1,
      },
    }
  },
  computed: {
    ...mapGetters({
      getById: 'posts/getById',
    }),
  },
  // mounted() {
  //   this.post = Object.assign({}, this.getById(this.$route.params.id))
  // },
  async mounted() {
    if (this.$store.state.posts.list.length === 0) {
      await this.fetchList()
    }
    this.post = Object.assign({}, this.getById(this.$route.params.id))
  },
  methods: {
    ...mapActions('posts', ['fetchList']),
    reloaded(item) {
      this.post = item
    },
    async save() {
      await this.$store.dispatch('posts/update', this.post)
      this.$router.push(
        this.localePath('posts', this.$i18n.locale) + `/${this.post.id}`
      )
    },
  },
}
</script>
