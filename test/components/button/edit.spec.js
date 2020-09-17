// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import editBtn from '@/components/button/edit'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/edit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(editBtn, {
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
