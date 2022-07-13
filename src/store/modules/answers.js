import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    answers: {
      sex: '',
      age: '',
      evidence: []
    }
  },
  getters: {
    getSex: state => state.answers.sex,
    getAge: state => state.answers.age,
    getEvidence: state => state.answers.evidence
  },
  mutations: {
    setSex (state, payload) {
      state.answers.sex = payload
    },
    setAge (state, payload) {
      state.answers.age = payload
    },
    addEvidence (state, payload) {
      const foundIndex = state.answers.evidence.findIndex((evidence) => evidence.id === payload.id)

      if (foundIndex === -1) {
        state.answers.evidence.push(payload)
      } else {
        state.answers.evidence.splice(foundIndex, 1, payload)
      }
    },
    resetEvidence (state) {
      state.answers.evidence = []
    },
    resetAnswers (state) {
      state.answers.sex = ''
      state.answers.age = ''
      state.answers.evidence = []
    }
  },
  actions: {
    setSex ({ commit }, payload) {
      commit('setSex', payload)
    },
    setAge ({ commit }, payload) {
      commit('setAge', payload)
    },
    addEvidence ({ commit }, payload) {
      commit('addEvidence', payload)
    },
    resetEvidence ({ commit }) {
      commit('resetEvidence')
    },
    resetAnswers ({ commit }) {
      commit('resetAnswers')
    }
  }
}
