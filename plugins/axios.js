export default function ({ $axios, env }) {
  // Space for setting global axios config e.g., set header on every request.
  // Refer to https://axios.nuxtjs.org/options/

  $axios.setBaseURL(env.API_URL)
}
