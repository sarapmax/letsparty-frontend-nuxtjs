<template>
  <v-chip
    :class="`${teamMemberStatus.color} lighten-5 ${teamMemberStatus.color}--text font-weight-bold`"
  >
    {{ teamMemberStatus.text }}
  </v-chip>
</template>

<script>
import { teamMemberStatusDisplay } from '@/constants/teamMember'
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    teamMemberStatus() {
      return teamMemberStatusDisplay[this.status]
    },
  },
}
</script>
