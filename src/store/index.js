import Vue from 'vue'
import Vuex from 'vuex'
import configuration from './modules/configuration'
import forms from './modules/forms'
import answers from './modules/answers'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  strict: true,
  modules: {
    configuration,
    forms,
    answers
  }
})

export default store()
