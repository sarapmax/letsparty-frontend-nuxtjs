<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('teamMember.title') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(teamMember, teamMemberIndex) in teamMembers"
        :key="teamMemberIndex"
        cols="12"
        lg="4"
      >
        <TeamMemberCard
          :team-member="teamMember"
          @onEdit="openSaveTeamMemberDialog($enum.saveState.update, teamMember)"
          @teamMemberDeleted="getTeamMembers"
        />
      </v-col>
    </v-row>

    <v-fab-transition>
      <v-btn
        color="primary"
        fixed
        fab
        dark
        medium
        bottom
        right
        @click="openSaveTeamMemberDialog($enum.saveState.create)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <SaveMemberDialog
      v-if="saveTeamMemberDialog"
      :state="saveTeamMemberDialogState"
      :existing-team-member="teamMemberData"
      :dialog="saveTeamMemberDialog"
      @onClose="saveTeamMemberDialog = false"
      @teamMemberSaved="getTeamMembers"
    />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      teamMembers: [],
      teamMemberData: null,
      saveTeamMemberDialog: false,
      saveTeamMemberDialogState: null,
    }
  },
  async fetch() {
    this.$loader.activate()
    await this.getTeamMembers()

    // For the sake of showing the overlay loder.
    // eslint-disable-next-line nuxt/no-timing-in-fetch-data
    setTimeout(() => {
      this.$loader.activate(false)
    }, 1000)
  },
  methods: {
    async getTeamMembers() {
      await this.$store.dispatch('teamMember/fetchTeamMembers')
      this.teamMembers = this.$store.getters['teamMember/teamMembers']
    },
    openSaveTeamMemberDialog(state, teamMember = null) {
      if (state === this.$enum.saveState.create) {
        this.saveTeamMemberDialogState = this.$enum.saveState.create
      }

      if (state === this.$enum.saveState.update) {
        this.teamMemberData = teamMember
        this.saveTeamMemberDialogState = this.$enum.saveState.update
      }

      this.saveTeamMemberDialog = true
    },
  },
}
</script>
