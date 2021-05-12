export default function ({ $axios, app }) {
  // Space for setting global axios config e.g., set header on every request.
  // Refer to https://axios.nuxtjs.org/options/

  $axios.setBaseURL(process.env.apiUrl)
  $axios.onRequest((config) => {
    const token = app.store.getters['auth/token']

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
