const endpoint = '/v1/user-parties'

export default ({ $axios }) => ({
  create(partyId) {
    return $axios.post(`${endpoint}/${partyId}`)
  },
})
