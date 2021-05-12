<template>
  <v-dialog
    :value="dialog"
    persistent
    max-width="330px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('onConfirm')">
          Confirm
        </v-btn>
        <v-btn
          text
          class="grey--text text--darken-1"
          @click="$emit('onCancel')"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Are you sure?',
    },
  },
}
</script>
