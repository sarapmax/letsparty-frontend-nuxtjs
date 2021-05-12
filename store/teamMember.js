export const state = () => ({
  teamMembers: [],
})

export const getters = {
  teamMembers(state) {
    return state.teamMembers
  },
}

export const mutations = {
  SAVE_TEAM_MEMBERS(state, teamMembers) {
    state.teamMembers = teamMembers
  },
}

export const actions = {
  async fetchTeamMembers({ commit }) {
    const { data } = await this.$repositories.teamMember.all()

    commit('SAVE_TEAM_MEMBERS', data)
  },
  async createTeamMember({ commit }, payload) {
    return await this.$repositories.teamMember.create(payload)
  },
  async updateTeamMember({ commit }, { payload, id }) {
    return await this.$repositories.teamMember.update(payload, id)
  },
  async deleteTeamMember({ commit }, id) {
    return await this.$repositories.teamMember.delete(id)
  },
}
