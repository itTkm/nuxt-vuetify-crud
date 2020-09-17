// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import index from '@/pages/index'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('pages/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(index, {
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
