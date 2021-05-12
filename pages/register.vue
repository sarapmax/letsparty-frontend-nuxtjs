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
              <div class="tw-text-lg tw-font-medium text-center">
                {{ $t('auth.registerBeforeJoiningTheParty') }}
              </div>
              <v-form
                ref="form"
                v-model="valid"
                class="mt-4"
                @submit.prevent="register"
              >
                <ImageInput v-model="form.avatar" class="mt-4">
                  <div
                    slot="activator"
                    class="text-center tw-cursor-pointer mb-3"
                  >
                    <v-avatar
                      v-if="!form.avatar"
                      v-ripple
                      size="100px"
                      class="grey lighten-3"
                    >
                      <span>Click to add avatar</span>
                    </v-avatar>
                    <v-avatar v-else v-ripple size="100px">
                      <img :src="form.avatar.imageURL" alt="avatar" />
                    </v-avatar>
                  </div>
                </ImageInput>
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
                <v-text-field
                  v-model="form.fullName"
                  light="light"
                  prepend-icon="mdi-account"
                  :rules="$rule.required"
                  :label="$t('auth.fullName')"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="secondary"
                  class="mt-4"
                  block="block"
                  :loading="isLoading"
                >
                  {{ $t('auth.signUp') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <div class="tw-text-white mt-4">
            {{ $t('auth.alreadyHaveAccount') }}
            <nuxt-link to="/login">{{ $t('auth.signIn') }}</nuxt-link>
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
        avatar: null,
        email: null,
        password: null,
        fullName: null,
      },
    }
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        try {
          this.isLoading = true

          const formData = new FormData()
          formData.append('avatar', this.form.avatar.imageFile)
          formData.append('email', this.form.email)
          formData.append('password', this.form.password)
          formData.append('fullName', this.form.fullName)

          await this.$store.dispatch('user/create', formData)

          this.$router.push('/login')
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
