import { mutations, getters, actions } from '@/store/posts'

export default {
  namespaced: true,
  state: {
    list: require('@/test/store/posts/list.json'),
  },
  mutations,
  getters,
  actions,
}
