import { mutations, getters, actions } from '@/store/todos'

export default {
  namespaced: true,
  state: {
    list: require('@/test/store/todos/list.json'),
  },
  mutations,
  getters,
  actions,
}
