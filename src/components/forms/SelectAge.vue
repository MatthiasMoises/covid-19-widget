<template>
  <div class="select-age-container">
    <v-row>
      <v-col><h3>{{ $t('select-age.your-age') }}</h3></v-col>
    </v-row>
    <v-spacer class="mb-10"></v-spacer>
    <v-row>
      <v-col class="pr-4">
        <v-form ref="form" v-model="valid">
          <v-slider
            v-model="slider"
            class="align-center"
            :max="max"
            :min="min"
            :rules="requiredRule"
            thumb-label="always"
            hide-details
          >
            <template v-slot:prepend>
              <v-icon
                color="red darken-2"
                @click="decrement"
              >
                remove
              </v-icon>
            </template>

            <template v-slot:append>
              <v-icon
                color="green darken-2"
                @click="increment"
              >
                add
              </v-icon>
            </template>
          </v-slider>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SelectAge',
  data () {
    return {
      valid: false,
      min: 18,
      max: 122,
      slider: 50,
      requiredRule: [
        v => !!v || this.$parent.$t('errors.required')
      ]
    }
  },
  watch: {
    valid (val) {
      this.setFormValidationStatus(val)
    }
  },
  methods: {
    ...mapActions({
      setFormValidationStatus: 'forms/setFormValidationStatus',
      setAge: 'answers/setAge'
    }),
    decrement () {
      this.slider--
      this.setAge(this.slider)
    },
    increment () {
      this.slider++
      this.setAge(this.slider)
    }
  },
  mounted () {
    this.setAge(this.slider)
  }
}
</script>

<style scoped lang="scss">

.select-age-container {
  text-align: center;
}

</style>
