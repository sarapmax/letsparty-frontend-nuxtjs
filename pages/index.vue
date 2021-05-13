<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="tw-text-xl mt-2">{{ $t('party.title') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(party, partyIndex) in parties"
        :key="partyIndex"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <PartyCard
          :party="party"
          @onEdit="openSavePartyDialog($enum.saveState.update, party)"
          @partyDeleted="getParties"
          @memberJoined="getParties"
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
        @click="openSavePartyDialog($enum.saveState.create)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <SavePartyDialog
      v-if="savePartyDialog"
      :state="savePartyDialogState"
      :existing-party="existingParty"
      :dialog="savePartyDialog"
      :title="$t(`party.${savePartyDialogState}Title`)"
      @onClose="savePartyDialog = false"
      @partySaved="getParties"
    />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      parties: [],
      existingParty: null,
      savePartyDialog: false,
      savePartyDialogState: null,
    }
  },
  async fetch() {
    this.$loader.activate()
    await this.getParties()
    this.$loader.activate(false)
  },
  methods: {
    async getParties() {
      await this.$store.dispatch('party/all')
      this.parties = this.$store.getters['party/parties']
    },
    openSavePartyDialog(state, party = null) {
      if (state === this.$enum.saveState.create) {
        this.savePartyDialogState = this.$enum.saveState.create
      }

      if (state === this.$enum.saveState.update) {
        this.existingParty = party
        this.savePartyDialogState = this.$enum.saveState.update
      }

      this.savePartyDialog = true
    },
  },
}
</script>
