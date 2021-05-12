export const state = () => ({
  token: localStorage.getItem('token'),
  user: null,
})

export const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
  check: (state) => state.user !== null,
}

export const mutations = {
  SAVE_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  FETCH_USER_SUCCESS(state, user) {
    state.user = user
  },
  FETCH_USER_FAILURE(state) {
    state.token = null
    localStorage.removeItem('token')
  },
  LOGOUT(state) {
    state.token = null
    localStorage.removeItem('token')
  },
}

export const actions = {
  async login({ commit }, payload) {
    return await this.$repositories.auth.login(payload)
  },
  saveToken({ commit }, payload) {
    commit('SAVE_TOKEN', payload)
  },
  async fetchUser({ commit }) {
    try {
      const { data } = await this.$repositories.auth.check()

      commit('FETCH_USER_SUCCESS', data)
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
}
