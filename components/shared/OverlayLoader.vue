<template>
  <v-overlay :value="loader" style="z-index: 999">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    loader() {
      return this.$store.getters['global/loader']
    },
  },
}
</script>

<style></style>
