export default ({ $axios }) => ({
  login() {
    return $axios.get('/auth')
  },
})
