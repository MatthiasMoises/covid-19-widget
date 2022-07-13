<template>
  <div v-if="results">
    <v-row>
      <v-col>
        <h2>{{ $t('results.recommendation') }}</h2>
      </v-col>
      <v-col>
        <v-icon x-large v-if="results.serious.length > 0" color="red darken-2" class="d-flex justify-end">notification_important</v-icon>
        <v-icon x-large v-else color="green darken-2" class="d-flex justify-end">house</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p><b>{{ results.label }}</b></p>
        <p>{{ results.description }}</p>
      </v-col>
    </v-row>
    <v-row v-if="results.serious.length > 0">
      <v-col>
        <h3>{{ $t('results.alarming-symptoms') }}:</h3>
        <br>
        <ul>
          <li v-for="item in results.serious" :key="item.id">{{ item.common_name }}</li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Results',
  computed: {
    ...mapGetters({
      sex: 'answers/getSex',
      age: 'answers/getAge',
      evidence: 'answers/getEvidence',
      results: 'forms/getResults'
    })
  },
  methods: {
    ...mapActions({
      getTriageResults: 'forms/getTriageResults'
    })
  },
  async mounted () {
    const answers = {
      sex: this.sex,
      age: this.age,
      evidence: this.evidence
    }

    await this.getTriageResults(answers)
  }
}
</script>

<style scoped lang="scss">

ul {
  list-style: none;
}

ul li::before {
  content: "\2022";
  color: #D32F2F;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

</style>
