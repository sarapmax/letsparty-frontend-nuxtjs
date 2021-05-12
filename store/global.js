export const state = () => ({
  loader: false,
})

export const getters = {
  loader(state) {
    return state.loader
  },
}

export const mutations = {
  ACTIVATE_LOADER(state, active) {
    state.loader = active
  },
}

export const actions = {
  activateLoader({ commit }, active) {
    commit('ACTIVATE_LOADER', active)
  },
}
