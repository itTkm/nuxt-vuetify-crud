// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// Components
import edit from '@/pages/posts/_id/edit'
import storeConfig from '@/test/store/posts/config'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/posts/_id/edit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(edit, {
      store: new Vuex.Store({
        modules: {
          posts: cloneDeep(storeConfig),
        },
      }),
      localVue,
      mocks: {
        $t: (msg) => msg,
        $route: {
          params: {
            id: 1,
          },
        },
      },
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
