export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  create({ commit }, partyId) {
    try {
      return this.$repositories.userParty.create(partyId)
    } catch (error) {}
  },
}
