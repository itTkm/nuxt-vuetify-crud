// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// Components
import index from '@/pages/todos/index'
import storeConfig from '@/test/store-config/todos'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/todos/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(index, {
      store: new Vuex.Store(cloneDeep(storeConfig)),
      localVue,
      mocks: {
        $t: (msg) => msg,
      },
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
