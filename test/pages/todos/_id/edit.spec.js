// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// Components
import edit from '@/pages/todos/_id/edit'
import storeConfig from '@/test/store/todos/config'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/todos/_id/edit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(edit, {
      store: new Vuex.Store({
        modules: {
          todos: cloneDeep(storeConfig),
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
