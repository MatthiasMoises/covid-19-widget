import Vue from 'vue'
import Vuex from 'vuex'
import DataService from '@/services/DataService'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    selectedLanguage: 'de',
    formStep: 1,
    formValidationStatus: false,
    loading: false,
    currentQuestion: null,
    results: null,
    shouldStop: false
  },
  getters: {
    getSelectedLanguage: state => state.selectedLanguage,
    getFormStep: state => state.formStep,
    getFormValidationStatus: state => state.formValidationStatus,
    getLoading: state => state.loading,
    getCurrentQuestion: state => state.currentQuestion,
    getResults: state => state.results,
    getShouldStop: state => state.shouldStop
  },
  mutations: {
    setSelectedLanguage (state, payload) {
      state.selectedLanguage = payload
    },
    setFormStep (state, payload) {
      state.formStep = payload
    },
    setFormValidationStatus (state, payload) {
      state.formValidationStatus = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setCurrentQuestion (state, payload) {
      state.currentQuestion = payload
    },
    resetCurrentQuestion (state) {
      state.currentQuestion = null
    },
    setResults (state, payload) {
      state.results = payload
    },
    setShouldStop (state, payload) {
      state.shouldStop = payload
    },
    resetForms (state) {
      state.selectedLanguage = 'de'
      state.formStep = 1
      state.formValidationStatus = false
      state.loading = false
      state.currentQuestion = null
      state.results = null
      state.shouldStop = false
    }
  },
  actions: {
    setSelectedLanguage ({ commit }, payload) {
      commit('setSelectedLanguage', payload)
    },
    setFormStep ({ commit }, payload) {
      commit('setFormStep', payload)
    },
    setFormValidationStatus ({ commit }, payload) {
      commit('setFormValidationStatus', payload)
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    resetCurrentQuestion ({ commit }) {
      commit('resetCurrentQuestion')
    },
    async getInterviewQuestion ({ commit }, payload) {
      try {
        const response = await DataService.diagnosis(payload)
        if (response.status === 200) {
          if (response.data.question && response.data.should_stop === false) {
            commit('setCurrentQuestion', response.data)
          } else {
            commit('setCurrentQuestion', null)
            commit('setShouldStop', response.data.should_stop)
            commit('setFormStep', 5)
          }
          return true
        }
      } catch (err) {
        // console.log(err)
      }
      return false
    },
    async getTriageResults ({ commit }, payload) {
      try {
        const response = await DataService.triage(payload)
        if (response.status === 200) {
          commit('setResults', response.data)
          return true
        }
      } catch (err) {
        // console.log(err)
      }
      return false
    },
    setShouldStop ({ commit }, payload) {
      commit('setShouldStop', payload)
    },
    resetForms ({ commit }) {
      commit('resetForms')
    }
  }
}
