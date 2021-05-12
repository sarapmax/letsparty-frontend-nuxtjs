const endpoint = '/team-members'

export default ({ $axios }) => ({
  all() {
    return $axios.get(endpoint)
  },
  create(payload) {
    return $axios.post(endpoint, payload)
  },
  update(payload, id) {
    return $axios.put(`${endpoint}/${id}`, payload)
  },
  delete(id) {
    return $axios.delete(`${endpoint}/${id}`)
  },
})
