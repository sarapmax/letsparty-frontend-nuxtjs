export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  create({ commit }, payload) {
    try {
      return this.$repositories.user.create(payload)
    } catch (error) {}
  },
}
