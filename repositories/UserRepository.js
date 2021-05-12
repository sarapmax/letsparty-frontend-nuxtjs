const endpoint = 'v1/users'

export default ({ $axios }) => ({
  create(payload) {
    return $axios.post(endpoint, payload)
  },
})
