<template>
  <v-dialog :value="dialog" persistent scrollable max-width="600">
    <v-card tile>
      <v-toolbar flat dark tile height="56px">
        <h3 class="tw-text-lg">
          {{ title }}
        </h3>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('onClose')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="tw-h-full">
        <v-form
          ref="form"
          v-model="valid"
          class="mt-4"
          @submit.prevent="submit"
        >
          <ImageInput v-model="form.image" class="mt-4">
            <div slot="activator" class="text-center tw-cursor-pointer mb-3">
              <v-avatar
                v-if="!form.image.imageURL"
                v-ripple
                tile
                size="200px"
                class="grey lighten-2"
              >
                <span class="tw-text-black">Click to party image</span>
              </v-avatar>
              <v-avatar v-else v-ripple tile size="200px">
                <img :src="form.image.imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </ImageInput>
          <v-text-field
            v-model="form.name"
            :label="$t('party.name')"
            :rules="$rule.required"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.maxMembers"
            type="number"
            :label="$t('party.maxMembers')"
            :rules="$rule.required"
            required
          ></v-text-field>
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
    existingParty: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      isLoading: false,
      form: {
        image: {
          imageURL: null,
          imageFile: null,
        },
        name: '',
        maxMembers: null,
      },
    }
  },
  created() {
    this.setExistingParty()
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        if (!this.form.image.imageFile) {
          this.$notifier.showMessage({
            content: 'Please select a party image before creating party',
            color: 'error',
          })

          return
        }

        try {
          this.$loader.activate()

          const formData = new FormData()
          formData.append('image', this.form.image.imageFile)
          formData.append('name', this.form.name)
          formData.append('maxMembers', this.form.maxMembers)

          if (this.state === this.$enum.saveState.create) {
            await this.$store.dispatch('party/create', formData)
          }

          if (this.state === this.$enum.saveState.update) {
            await this.$store.dispatch('party/update', {
              payload: formData,
              id: this.existingParty.id,
            })
          }

          this.$emit('onClose')
          this.$emit('partySaved')
        } catch (e) {
        } finally {
          this.$loader.activate(false)
        }
      }
    },
    setExistingParty() {
      if (this.state === this.$enum.saveState.update && this.existingParty) {
        this.form.name = this.existingParty.name
        this.form.image.imageURL = this.existingParty.imageUrl
        this.form.maxMembers = this.existingParty.maxMembers
      }
    },
  },
}
</script>
