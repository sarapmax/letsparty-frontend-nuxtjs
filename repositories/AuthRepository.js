const endpoint = 'auth'

export default ({ $axios }) => ({
  login(payload) {
    return $axios.post(`${endpoint}/login`, payload)
  },
  check() {
    return $axios.get(`${endpoint}/check`)
  },
})
