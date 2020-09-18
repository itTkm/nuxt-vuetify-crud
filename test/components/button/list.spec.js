// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import listBtn from '@/components/button/list'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/list', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(listBtn, {
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
