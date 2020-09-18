<template>
  <div>
    <p>
      <v-card>
        <v-card-actions>
          <back-btn />
          <list-btn path="posts" />
          <v-spacer />
        </v-card-actions>
      </v-card>
    </p>
    <p>
      <v-card>
        <v-card-title>{{ $t('common.create') }}</v-card-title>
        <post-form :post="post" @save="create" />
      </v-card>
    </p>
  </div>
</template>

<script>
import backBtn from '@/components/button/back'
import listBtn from '@/components/button/list'
import postForm from '@/components/form/post'

export default {
  components: {
    backBtn,
    listBtn,
    postForm,
  },
  data() {
    return {
      post: {
        title: '',
        userId: '',
        completed: false,
      },
    }
  },
  methods: {
    async create() {
      await this.$store.dispatch('posts/create', this.post)
      this.$router.push(this.localePath('posts', this.$i18n.locale))
    },
  },
}
</script>
