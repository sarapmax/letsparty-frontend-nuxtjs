<template>
  <div class="tw-relative">
    <v-card>
      <v-img height="250" :src="party.imageUrl"></v-img>
      <v-card-title class="pb-2 pt-2">{{ party.name }}</v-card-title>
      <v-card-text class="d-flex">
        <div class="tw-w-1/2">
          <span
            v-for="partyMember in party.partyMembers"
            :key="partyMember.id"
            class="tw--mr-1"
          >
            <v-avatar size="30px">
              <img :src="partyMember.avatarUrl" :alt="partyMember.fullName" />
            </v-avatar>
          </span>
        </div>
        <div class="tw-w-1/2 text-right">
          <span v-if="isPartyFull" class="mr-2 tw-font-bold tw-text-red-600">
            Full
          </span>
          <span v-else class="mr-2 tw-font-bold tw-text-green-600">
            {{ party.partyMembers.length }}/{{ party.maxMembers }}
          </span>
          <v-btn
            color="primary"
            small
            :disabled="isPartyFull || !canJoinParty"
            @click="joinPart"
          >
            Join
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-list-item-action
      v-if="canEditParty"
      class="tw-absolute tw--top-1 tw-right-2 tw-bg-gray-700 tw-rounded"
    >
      <v-menu bottom left nudge-bottom="35">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="$emit('onEdit', Party)">
            <v-list-item-content>
              <v-list-item-title> Edit </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="deletePartyDialog = true">
            <v-list-item-content>
              <v-list-item-title> Delete </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <DeleteConfirmationDialog
        :dialog="deletePartyDialog"
        @onConfirm="deleteParty()"
        @onCancel="deletePartyDialog = false"
      ></DeleteConfirmationDialog>
    </v-list-item-action>
  </div>
</template>

<script>
export default {
  props: {
    party: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deletePartyDialog: false,
    }
  },
  computed: {
    isPartyFull() {
      return this.party.maxMembers <= this.party.partyMembers.length
    },
    canJoinParty() {
      return (
        this.party.partyMembers.filter(
          (partyMember) => partyMember.id === this.user.id
        ).length === 0
      )
    },
    canEditParty() {
      return this.user.id === this.party.createdBy.id
    },
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    async deleteParty() {
      this.$loader.activate()
      await this.$store.dispatch('party/delete', this.party.id)
      this.deletePartyDialog = false
      this.$loader.activate(false)
      this.$emit('partyDeleted')
    },
    async joinPart() {
      this.$loader.activate()
      await this.$store.dispatch('user-party/create', this.party.id)
      this.$loader.activate(false)
      this.$emit('memberJoined')
    },
  },
}
</script>
