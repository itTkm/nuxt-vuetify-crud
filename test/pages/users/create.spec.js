// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

// Components
import create from '@/pages/users/create'
import storeConfig from '@/test/store/users/config'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/users/create', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(create, {
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
