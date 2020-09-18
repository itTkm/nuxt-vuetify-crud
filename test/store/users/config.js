import { mutations, getters, actions } from '@/store/users'

export default {
  namespaced: true,
  state: {
    list: require('@/test/store/users/list.json'),
  },
  mutations,
  getters,
  actions,
}
