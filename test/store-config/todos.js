import { mutations, getters, actions } from '@/store/todos'

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations,
  getters,
  actions,
}
