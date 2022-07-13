import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    darkTheme: false,
    primaryColor: '#1E88E5',
    assetSet: 'noasset'
  },
  getters: {
    getDarkTheme: state => state.darkTheme,
    getPrimaryColor: state => state.primaryColor,
    getAssetSet: state => state.assetSet
  },
  mutations: {
    setDarkTheme (state, payload) {
      state.darkTheme = payload
    },
    setPrimaryColor (state, payload) {
      state.primaryColor = payload
    },
    setAssetSet (state, payload) {
      state.assetSet = payload
    }
  },
  actions: {
    setDarkTheme ({ commit }, payload) {
      commit('setDarkTheme', payload)
    },
    setPrimaryColor ({ commit }, payload) {
      commit('setPrimaryColor', payload)
    },
    setAssetSet ({ commit }, payload) {
      commit('setAssetSet', payload)
    }
  }
}
