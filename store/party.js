export const state = () => ({
  parties: [],
})

export const getters = {
  parties(state) {
    return state.parties
  },
}

export const mutations = {
  SAVE_PARTIES(state, parties) {
    state.parties = parties
  },
}

export const actions = {
  async all({ commit }) {
    const { data } = await this.$repositories.party.all()

    commit('SAVE_PARTIES', data)
  },
  async create({ commit }, payload) {
    return await this.$repositories.party.create(payload)
  },
  async update({ commit }, { payload, id }) {
    return await this.$repositories.party.update(payload, id)
  },
  async delete({ commit }, id) {
    return await this.$repositories.party.delete(id)
  },
}
