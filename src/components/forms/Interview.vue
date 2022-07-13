<template>
  <div class="interview-container">
    <v-row>
      <v-col>
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentQuestion && shouldStop === false">
            <div v-if="evidence.length === 0" class="info-text">
              <h3>{{ $t('interview.intro') }}</h3>
            </div>
            <h2>{{ currentQuestion.question.text }}</h2>
            <br>
            <h3 v-if="currentQuestion.question.type === 'group_multiple'">{{ $t('interview.one-answer-each-row') }}</h3>
            <h3 v-else>{{ $t('interview.one-answer') }}</h3>
            <br>
            <v-form v-if="currentQuestion.question.type === 'single'" ref="form" v-model="valid">
              <v-row v-for="item in currentQuestion.question.items" :key="item.id" class="interview-items">
                <v-col>
                  <div>{{ item.name }}</div>
                  <br>
                  <v-radio-group :rules="requiredRule" row>
                    <v-radio v-for="choice in item.choices" :key="choice.id" :label="choice.label" :value="choice.id" @change="exportAnswerSelection(item.id, choice.id)"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
            <v-form v-if="currentQuestion.question.type === 'group_single'" ref="form" v-model="valid">
              <v-row>
                <v-col>
                  <v-radio-group :rules="requiredRule" column>
                    <v-radio v-for="item in currentQuestion.question.items" :key="item.id" class="interview-items-group-single" :label="item.name" :value="item.id" @change="exportAnswerSelection(item.id, item.choices[0].id)"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
            <v-form v-if="currentQuestion.question.type === 'group_multiple'" ref="form" v-model="valid">
              <v-row v-for="item in currentQuestion.question.items" :key="item.id" class="interview-items">
                <v-col>
                  <div class="d-flex justify-start">{{ item.name }}</div>
                  <div class="d-flex justify-end">
                    <v-radio-group :rules="requiredRule" row>
                      <v-radio v-for="choice in item.choices" :key="choice.id" :label="choice.label" :value="choice.id" @change="exportAnswerSelection(item.id, choice.id)"></v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </transition>
        <div v-if="!currentQuestion">
          <p>{{ $t('errors.could-not-load-data') }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Interview',
  data () {
    return {
      valid: false,
      requiredRule: [
        v => !!v || this.$parent.$t('errors.required')
      ]
    }
  },
  async mounted () {
    const answers = {
      sex: this.sex,
      age: this.age,
      evidence: this.evidence
    }

    await this.getInterviewQuestion(answers)
  },
  computed: {
    ...mapGetters({
      sex: 'answers/getSex',
      age: 'answers/getAge',
      evidence: 'answers/getEvidence',
      currentQuestion: 'forms/getCurrentQuestion',
      shouldStop: 'forms/getShouldStop'
    })
  },
  watch: {
    valid (val) {
      this.setFormValidationStatus(val)
    }
  },
  methods: {
    ...mapActions({
      setFormValidationStatus: 'forms/setFormValidationStatus',
      addEvidence: 'answers/addEvidence',
      getInterviewQuestion: 'forms/getInterviewQuestion'
    }),
    exportAnswerSelection (itemId, choiceId) {
      const evidence = {
        id: itemId,
        choice_id: choiceId
      }

      this.addEvidence(evidence)
    }
  }
}
</script>

<style scoped lang="scss">

.interview-container {

  .info-text {
    margin-bottom: 30px;
    text-align: center;
  }

  .row {
    margin-left: 0;
  }

  .interview-items {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .interview-items:last-child {
    border-bottom: none;
  }

  .interview-items-group-single {
    padding: 10px 0 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .interview-items-group-single:last-child {
    border-bottom: none;
  }
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
