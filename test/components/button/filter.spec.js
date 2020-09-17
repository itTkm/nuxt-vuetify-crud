// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import filterBtn from '@/components/button/filter'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/filter', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(filterBtn, {
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
