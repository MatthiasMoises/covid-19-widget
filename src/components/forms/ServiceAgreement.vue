<template>
  <div>
    <v-row>
      <v-col>
        <LanguageSelector />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('service-agreement.terms-of-use') }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ $t('service-agreement.information') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ul>
          <li>
            <b>{{ $t('service-agreement.no-diagnosis-intro') }}</b>
            {{ $t('service-agreement.no-diagnosis-text') }}
          </li>
          <li>
            <b>{{ $t('service-agreement.not-in-emergency-intro') }}</b>
            {{ $t('service-agreement.not-in-emergency-text') }}
          </li>
          <li>
            <b>{{ $t('service-agreement.data-protection-intro') }}</b>
            {{ $t('service-agreement.data-protection-text') }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" v-model="valid">
          <v-checkbox v-model="status" :rules="requiredRule" :label="$t('service-agreement.agreement')" required></v-checkbox>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import LanguageSelector from './../ui/LanguageSelector'

export default {
  name: 'ServiceAgreement',
  components: {
    LanguageSelector
  },
  data () {
    return {
      valid: false,
      status: false,
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
      setFormValidationStatus: 'forms/setFormValidationStatus'
    })
  }
}
</script>

<style scoped lang="scss">

</style>
