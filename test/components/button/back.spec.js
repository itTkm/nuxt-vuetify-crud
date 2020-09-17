// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import backBtn from '@/components/button/back'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/back', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(backBtn, {
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
