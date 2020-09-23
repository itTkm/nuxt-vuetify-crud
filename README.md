# Vuetify + Nuxt.js template (Customized)

## Overview

This project is based on [nuxt-vuetify-custom](https://github.com/itTkm/nuxt-vuetify-custom). It also supports CRUD pages with [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## What has been customized?

- Remove unnecessary code such as demo code.
- Get parameter of the application information from `package.json` then use these parameters on the code.
  - Application name on the AppBar and Content.
  - Add the author name to the footer copyright.
  - Add the application version to the right of the footer.
- Change the behavior of the navigation drawer.
  - On a wide screen such as a PC, you will always see a minimized navigation drawer. Click the hamburger icon to see the full size navigation drawer.
  - On small screens such as smartphones, the full size navigation drawer is only displayed when the hamburger icon is clicked.
- Support the theme switching with icon button on the right of AppBar.
  - Dark <-> Light
  - The settings are stored in localStorage and used for subsequent access.
- Support the multi language switching with `nuxt-i18n`
  - ja <-> en
  - You can add or change your own language.
- Update page titles
  - index: `appName`
  - other: `pageTitle - appName`
- Add tooltips.
  - Menu items
  - Language switch
  - Theme switch
- Add CRUD example functions and pages with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.
  - List page
  - Create page
  - Edit page
  - Show page
  - Delete confirmation dialog

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## License

This project is licensed under the [MIT License](./LICENSE).
