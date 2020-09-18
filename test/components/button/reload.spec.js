// Libraries
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import reloadBtn from '@/components/button/reload'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(new Vuetify())

describe('components/button/reload', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(reloadBtn, {
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
