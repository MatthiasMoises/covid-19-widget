<template>
  <div class="select-gender-container">
    <v-row>
      <v-col>
        <h3>{{ $t('select-gender.your-gender') }}?</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-form ref="form" v-model="valid">
          <v-radio-group v-model="gender" :rules="requiredRule" row @change="selectGender()">
            <v-radio value="male">
              <template v-slot:label>
                <div class="gender-container">
                  <img class="gender-image" :src="require('@/assets/img/gender/male.png')" alt="male" />
                </div>
                <div class="gender-label male">
                  <span>{{ $t('select-gender.options.male') }}</span>
                </div>
              </template>
            </v-radio>
            <v-radio value="female">
              <template v-slot:label>
                <div class="gender-container">
                  <img class="gender-image" :src="require('@/assets/img/gender/female.png')" alt="female" />
                </div>
                <div class="gender-label female">
                  <span>{{ $t('select-gender.options.female') }}</span>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SelectGender',
  data () {
    return {
      valid: false,
      gender: '',
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
      setGender: 'answers/setSex'
    }),
    selectGender () {
      this.setGender(this.gender)
    }
  }
}
</script>

<style scoped lang="scss">

.select-gender-container {
  text-align: center;

  .gender-container {
    text-align: center;

    .gender-image {
      width: 75px;
      height: auto;
    }
  }

  .gender-label {
      margin-left: 8px;
    }

  .male {
    color: #00AEEF;
  }

  .female {
    color: #EC148E;
  }

}

</style>
