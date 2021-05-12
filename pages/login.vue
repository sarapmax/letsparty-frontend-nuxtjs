<template>
  <v-content class="tw-bg-gray-900">
    <v-container fill-height="fill-height">
      <v-layout align-center="align-center" justify-center="justify-center">
        <v-flex class="login-form text-xs-center">
          <div class="mb-6 text-center">
            <v-icon color="white" x-large> mdi-party-popper </v-icon>
            <h2 class="mt-2 tw-text-3xl tw-text-white tw-font-bold">
              {{ $t('global.letsParty') }}
            </h2>
          </div>
          <v-card light="light">
            <v-card-text>
              <div class="tw-text-lg tw-font-medium">
                {{ $t('auth.loginToJoinTheParty') }}
              </div>
              <v-form
                ref="form"
                v-model="valid"
                class="mt-4"
                @submit.prevent="login"
              >
                <v-text-field
                  v-model="form.email"
                  light="light"
                  prepend-icon="mdi-email"
                  :label="$t('auth.email')"
                  :rules="[...$rule.required, ...$rule.email]"
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  light="light"
                  prepend-icon="mdi-lock"
                  :label="$t('auth.password')"
                  :rules="$rule.required"
                  type="password"
                ></v-text-field>
                <v-btn
                  type="submit"
                  :loading="isLoading"
                  color="secondary"
                  block="block"
                >
                  {{ $t('auth.signIn') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <div class="tw-text-white mt-4">
            {{ $t('auth.notHaveAccount') }}
            <nuxt-link to="/register">{{ $t('auth.signUp') }}</nuxt-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
  data() {
    return {
      valid: false,
      isLoading: false,
      form: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          this.isLoading = true

          const { data } = await this.$store.dispatch('auth/login', this.form)

          this.$store.dispatch('auth/saveToken', data.token)
          this.$store.dispatch('auth/fetchUser')

          this.$router.push(this.localePath('/'))
        } catch (e) {
        } finally {
          this.isLoading = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.login-form {
  max-width: 500px;
}
</style>
