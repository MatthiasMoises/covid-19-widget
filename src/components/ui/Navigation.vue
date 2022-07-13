<template>
  <v-row>
    <v-col md-6 class="d-flex justify-start">
      <v-btn v-if="formStep > 1 && formStep < 5" color="secondary" @click="navigatePrev()">{{ $t('navigation.previous') }}</v-btn>
    </v-col>
    <v-col v-if="formStep < 5" md-6 class="d-flex justify-end">
      <v-btn color="primary" :disabled="!formValidationStatus" @click="navigateNext()">{{ $t('navigation.next') }}</v-btn>
    </v-col>
    <v-col v-if="formStep === 5" md-6 class="d-flex justify-end">
      <v-btn color="primary" @click="restartInterview()">{{ $t('navigation.restart') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({
      formStep: 'forms/getFormStep',
      formValidationStatus: 'forms/getFormValidationStatus',
      shouldStop: 'forms/getShouldStop',
      sex: 'answers/getSex',
      age: 'answers/getAge',
      evidence: 'answers/getEvidence'
    })
  },
  methods: {
    ...mapActions({
      setFormStep: 'forms/setFormStep',
      setFormValidationStatus: 'forms/setFormValidationStatus',
      getInterviewQuestion: 'forms/getInterviewQuestion',
      resetCurrentQuestion: 'forms/resetCurrentQuestion',
      resetAnswers: 'answers/resetAnswers',
      resetForms: 'forms/resetForms',
      resetEvidence: 'answers/resetEvidence'
    }),
    async navigatePrev () {
      if (this.formStep > 1) {
        const newStep = this.formStep - 1

        if (newStep === 3) {
          this.resetEvidence()
          await this.resetCurrentQuestion()
        }

        await this.setFormStep(newStep)
      }
    },
    async navigateNext () {
      await this.setFormValidationStatus(false)
      if (this.formStep < 4) {
        const newStep = this.formStep + 1
        await this.setFormStep(newStep)
      } else {
        const answers = {
          sex: this.sex,
          age: this.age,
          evidence: this.evidence
        }

        if (!this.shouldStop) {
          await this.getInterviewQuestion(answers)
        }
      }
    },
    async restartInterview () {
      await this.resetAnswers()
      await this.resetForms()
    }
  }
}
</script>
