<template>
  <v-dialog :value="dialog" persistent scrollable max-width="600">
    <v-card tile>
      <v-toolbar flat dark tile color="primary" height="56px">
        <h3 class="tw-text-lg">
          {{ $displayEnum.saveState[state] }} ข้อมูลสมาชิกในทีม
        </h3>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('onClose')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="tw-h-full tw-bg-gray-100">
        <v-form
          ref="form"
          v-model="valid"
          class="mt-4"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[...$rule.required, ...$rule.email]"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.firstName"
            label="First Name"
            :rules="$rule.required"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.lastName"
            label="Last Name"
            :rules="$rule.required"
            required
          ></v-text-field>
          <v-textarea v-model="form.bio" label="Biography"></v-textarea>
          <v-select
            v-model="form.status"
            :items="memberStatusItems"
            :rules="$rule.required"
            label="Status"
            required
          ></v-select>
          <div class="mt-4">
            <v-btn type="submit" color="primary"> Submit </v-btn>
            <v-btn text class="ml-2" @click="$emit('onClose')"> Cancel </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { teamMemberStatus } from '@/constants/teamMember'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      required: true,
    },
    existingTeamMember: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      valid: false,
      isLoading: false,
      form: {
        email: '',
        firstName: '',
        lastName: '',
        bio: '',
        status: '',
      },
    }
  },
  computed: {
    memberStatusItems() {
      return Object.entries(teamMemberStatus).map(([key, value]) => {
        return { text: key, value }
      })
    },
  },
  created() {
    this.setExistingTeamMember()
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.$loader.activate()

          if (this.state === this.$enum.saveState.create) {
            await this.$store.dispatch('teamMember/createTeamMember', this.form)
          }

          if (this.state === this.$enum.saveState.update) {
            await this.$store.dispatch('teamMember/updateTeamMember', {
              payload: this.form,
              id: this.existingTeamMember.id,
            })
          }

          this.$emit('onClose')
          this.$emit('teamMemberSaved')
        } catch (e) {
        } finally {
          this.$loader.activate(false)
        }
      }
    },
    setExistingTeamMember() {
      if (
        this.state === this.$enum.saveState.update &&
        this.existingTeamMember
      ) {
        this.form.email = this.existingTeamMember.email
        this.form.firstName = this.existingTeamMember.firstName
        this.form.lastName = this.existingTeamMember.lastName
        this.form.bio = this.existingTeamMember.bio
        this.form.status = this.existingTeamMember.status
      }
    },
  },
}
</script>
