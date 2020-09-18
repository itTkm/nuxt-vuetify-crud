// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import createBtn from '@/components/button/create'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/create', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(createBtn, {
      localVue,
      mocks: {
        $t: (msg) => msg,
      },
      propsData: {
        path: 'todos',
      },
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
