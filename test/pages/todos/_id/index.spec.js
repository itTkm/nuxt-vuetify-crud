// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// Components
import index from '@/pages/todos/_id/index'
import storeConfig from '@/test/store/todos/config'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/todos/_id/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(index, {
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
