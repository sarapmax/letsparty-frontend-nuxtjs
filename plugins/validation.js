export default function ({ store }, inject) {
  inject('rule', {
    required: [(v) => !!v || 'this field is required'],
    email: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'email must be valid',
    ],
  })
}
