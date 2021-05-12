export default function ({ store }, inject) {
  inject('loader', {
    activate(active = true) {
      store.dispatch('global/activateLoader', active)
    },
  })

  inject('notifier', {
    showMessage({ content = '', color = '' }) {
      store.commit('snackbar/showMessage', { content, color })
    },
  })
}
