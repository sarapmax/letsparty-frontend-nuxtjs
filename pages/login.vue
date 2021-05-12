<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-btn color="primary" dark @click="login">Login</v-btn>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
  methods: {
    async login() {
      await this.$store.dispatch('auth/login')

      this.$router.push('/')
    },
  },
}
</script>
