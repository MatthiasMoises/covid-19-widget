<template>
  <div>
    <v-stepper v-model="formStep">
      <v-stepper-header>
        <v-stepper-step :complete="formStep > 1" step="1">{{ $t('stepper.introduction') }}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="formStep > 2" step="2">{{ $t('stepper.sex') }}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="formStep > 3" step="3">{{ $t('stepper.age') }}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="formStep > 4" step="4">{{ $t('stepper.symptoms') }}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="5">{{ $t('stepper.results') }}</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content class="stepper-content" step="1">
          <ServiceAgreement v-if="formStep === 1" />
        </v-stepper-content>
        <v-stepper-content class="stepper-content" step="2">
          <SelectGender v-if="formStep === 2" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <SelectAge v-if="formStep === 3" />
        </v-stepper-content>
        <v-stepper-content step="4">
          <Interview v-if="formStep === 4" />
        </v-stepper-content>
        <v-stepper-content step="5">
          <Results v-if="formStep === 5" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <Navigation />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ServiceAgreement from './../components/forms/ServiceAgreement'
import SelectGender from './../components/forms/SelectGender'
import SelectAge from './../components/forms/SelectAge'
import Interview from './../components/forms/Interview'
import Results from './../components/forms/Results'
import Navigation from './../components/ui/Navigation'

export default {
  name: 'FormContainer',
  components: {
    ServiceAgreement,
    SelectGender,
    SelectAge,
    Interview,
    Results,
    Navigation
  },
  computed: {
    ...mapGetters({
      formStep: 'forms/getFormStep'
    })
  },
  methods: {
    ...mapActions({
      setFormStep: 'forms/setFormStep'
    })
  }
}
</script>

<style scoped lang="scss">

.stepper-content {
  padding: 10px 25px;
}

.v-stepper__items {
  min-height: 250px;
}

</style>
