export const state = () => ({
  token: sessionStorage.getItem('token'),
})

export const getters = {
  token: (state) => state.token,
}

export const mutations = {
  SAVE_TOKEN(state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  LOGOUT(state) {
    state.token = null
    sessionStorage.removeItem('token')
  },
}

export const actions = {
  async login({ commit }) {
    try {
      const { data } = await this.$repositories.auth.login()

      commit('SAVE_TOKEN', data.token)
    } catch (error) {}
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
}
