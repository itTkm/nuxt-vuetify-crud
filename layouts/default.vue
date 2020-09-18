<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          :exact="item.exact"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        @click.stop="
          if (drawer) {
            drawer = !miniVariant ? !miniVariant : miniVariant
            miniVariant = !miniVariant
          } else {
            drawer = !drawer
            miniVariant = false
          }
        "
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :to="switchLocalePath(getNextLanguage())"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('switchLanguage') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="invertColors">
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('switchTheme') }}</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" inset app>
      <span>&copy; {{ new Date().getFullYear() }} {{ author }}</span>
      <v-spacer />
      <span>v{{ version }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: require('../package.json').appName,
      version: require('../package.json').version,
      author: require('../package.json').author,
      dark: this.isDark(),
      lang: '',
      nextLang: '',
      clipped: true,
      drawer: null,
      fixed: false,
      miniVariant: true,
      items: [
        {
          icon: 'mdi-apps',
          title: this.$t('menu.index'),
          to: this.localePath('index', this.$i18n.locale),
          exact: true, // If root page, it should be "true".
        },
        {
          icon: 'mdi-message-text-outline',
          title: this.$t('menu.posts'),
          to: this.localePath('posts', this.$i18n.locale),
          exact: false, // If the page has child pages (e.g. /inspire/edit), it should be "false".
        },
        {
          icon: 'mdi-format-list-checks',
          title: this.$t('menu.todos'),
          to: this.localePath('todos', this.$i18n.locale),
          exact: false, // If the page has child pages (e.g. /inspire/edit), it should be "false".
        },
        {
          icon: 'mdi-account-multiple',
          title: this.$t('menu.users'),
          to: this.localePath('users', this.$i18n.locale),
          exact: false, // If the page has child pages (e.g. /inspire/edit), it should be "false".
        },
      ],
    }
  },
  mounted() {
    // Set default theme
    this.$vuetify.theme.dark = this.isDark()

    // Set default language
    this.lang = this.getLanguage()
    if (this.lang !== this.$i18n.locale) {
      this.$router.push(this.localePath('index', this.lang))
    }
  },
  updated() {
    // Update language setting
    if (this.lang !== this.$i18n.locale) {
      this.lang = this.$i18n.locale
      localStorage.setItem('lang', this.lang)

      // Update link of navigation drawer
      this.items.forEach((item, i) => {
        const path = item.to.split('/')
        const routeName =
          path[path.length - 1] !== ''
            ? path[path.length - 1] !== this.getNextLanguage()
              ? path[path.length - 1]
              : 'index'
            : 'index'
        if (this.$i18n.locale === this.$i18n.defaultLocale) {
          this.items[i].title = this.$t(`menu.${routeName}`)
          this.items[i].to =
            path[path.length - 1] !== this.getNextLanguage()
              ? '/' + path[path.length - 1]
              : '/'
        } else {
          this.items[i].title = this.$t(`menu.${routeName}`)
          this.items[i].to =
            '/' + this.$i18n.locale + '/' + path[path.length - 1]
        }
      })
    }
  },
  methods: {
    invertColors() {
      this.dark = !this.dark
      this.$vuetify.theme.dark = this.dark
      localStorage.setItem('dark', this.dark)
    },
    isDark() {
      return localStorage.getItem('dark') !== null
        ? localStorage.getItem('dark') === 'true'
        : true
    },
    getLanguage() {
      return localStorage.getItem('lang') !== null
        ? localStorage.getItem('lang')
        : 'ja'
    },
    getNextLanguage() {
      if (this.lang === '' || this.lang === 'ja') {
        return 'en'
      } else {
        return 'ja'
      }
    },
  },
}
</script>
