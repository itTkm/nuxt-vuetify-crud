// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import deleteConfirm from '@/components/deleteConfirm'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/deleteConfirm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(deleteConfirm, {
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
