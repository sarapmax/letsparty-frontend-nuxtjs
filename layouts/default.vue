<template>
  <v-app dark>
    <v-app-bar fixed app tile>
      <v-toolbar-title class="tw-font-medium tw-text-xl">
        <v-icon large> mdi-party-popper </v-icon>
        <span class="tw-text-2xl">{{ $t('global.letsParty') }}</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text :to="switchLocalePath('th')">TH</v-btn>
      <v-btn text :to="switchLocalePath('en')">EN</v-btn>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large class="ml-2" v-on="on">
            <v-avatar size="36">
              <img :src="user.avatarUrl" :alt="user.fullName" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h4 class="py-2">
                {{ user.fullName }}
              </h4>
              <h4 class="pb-2">
                {{ user.email }}
              </h4>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text @click="logout">LOGOUT</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
      <OverlayLoader />
      <AlertBar />
      <nuxt />
      <!-- </v-container> -->
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')

      this.$router.push(this.localePath('/login'))
    },
  },
}
</script>
