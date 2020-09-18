# Vuetify + Nuxt.js template (Customized)

## Overview

This project is based on [nuxt-vuetify-custom](https://github.com/itTkm/nuxt-vuetify-custom). It also supports CRUD pages with [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

```
npx create-nuxt-app nuxt-vuetify-custom

create-nuxt-app v3.2.0
✨  Generating Nuxt.js project in nuxt-vuetify-custom
? Project name: nuxt-vuetify-custom
? Programming language: JavaScript
? Package manager: Yarn
? UI framework: Vuetify.js
? Nuxt.js modules: Axios, Progressive Web App (PWA), Content
? Linting tools: ESLint, Prettier, Lint staged files, StyleLint
? Testing framework: Jest
? Rendering mode: Single Page App
? Deployment target: Static (Static/JAMStack hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using
typescript)
```

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
