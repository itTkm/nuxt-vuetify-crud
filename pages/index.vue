<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.path">
            <v-card shaped @click.stop="list(card.path)">
              <v-img
                class="white--text align-end"
                :src="card.src"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title v-text="card.title" />
              </v-img>
              <v-card-text v-text="card.description" />
              <v-card-actions>
                <v-btn text @click.stop="create(card.path)">
                  {{ $t('common.create') }}
                </v-btn>
                <v-spacer />
                <v-btn text color="primary" @click.stop="list(card.path)">
                  {{ $t('common.list') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          path: 'todos',
          title: this.$t('menu.todos'),
          description: this.$t('todos.description'),
          src: 'https://picsum.photos/id/8/400/300',
        },
        {
          path: 'users',
          title: this.$t('menu.users'),
          description: this.$t('users.description'),
          src: 'https://picsum.photos/id/433/400/300',
        },
      ],
    }
  },
  methods: {
    list(path) {
      this.$router.push(this.localePath(path, this.$i18n.locale))
    },
    create(path) {
      this.$router.push(this.localePath(path, this.$i18n.locale) + `/create`)
    },
  },
  head() {
    return {
      // Page title is "appName"
      titleTemplate: '',
      title: require('../package.json').appName,
    }
  },
}
</script>
