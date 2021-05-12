export default function ({ store }, inject) {
  inject('loader', {
    activate(active = true) {
      store.dispatch('global/activateLoader', active)
    },
  })
}
