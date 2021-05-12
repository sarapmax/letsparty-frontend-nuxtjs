<template>
  <div class="tw-relative">
    <v-card>
      <v-img
        height="250"
        :src="`https://loremflickr.com/320/240/people?random=${randomImageParam}`"
      ></v-img>

      <v-card-title class="pb-2">{{ fullName }}</v-card-title>

      <v-card-text>
        <div>
          <TeamMemberStatusChip :status="teamMember.status" />
        </div>

        <div class="mt-2">
          {{ teamMember.bio }}
        </div>
      </v-card-text>
    </v-card>
    <v-list-item-action
      class="tw-absolute tw--top-1 tw-right-2 tw-bg-white tw-rounded"
    >
      <v-menu bottom left nudge-bottom="35">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="$emit('onEdit', teamMember)">
            <v-list-item-content>
              <v-list-item-title> Edit </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="deleteTeamMemberDialog = true">
            <v-list-item-content>
              <v-list-item-title> Delete </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <DeleteConfirmationDialog
        :dialog="deleteTeamMemberDialog"
        @onConfirm="deleteTeamMember()"
        @onCancel="deleteTeamMemberDialog = false"
      ></DeleteConfirmationDialog>
    </v-list-item-action>
  </div>
</template>

<script>
export default {
  props: {
    teamMember: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deleteTeamMemberDialog: false,
    }
  },
  computed: {
    // Here we can compute some data before render it on HTML.
    // Refer to https://vuejs.org/v2/guide/computed.html to see the use of computed property.
    fullName() {
      return `${this.teamMember.firstName} ${this.teamMember.lastName}`
    },
    randomImageParam() {
      // Random number from 1 to 100.
      return Math.floor(Math.random() * 100 + 1)
    },
  },
  methods: {
    async deleteTeamMember() {
      this.$loader.activate()
      await this.$store.dispatch(
        'teamMember/deleteTeamMember',
        this.teamMember.id
      )
      this.deleteTeamMemberDialog = false
      this.$loader.activate(false)
      this.$emit('teamMemberDeleted')
    },
  },
}
</script>

<style lang="scss" scoped>
.team-member-card {
  position: relative;

  .action {
    background: $white;
    border-radius: 4px;
    position: absolute;
    top: -6px;
    right: 6px;
  }
}
</style>
