import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      FB: null,
      myMap: null,
      markerCluster: null
    }
  },
  mutations: {
    setFB (state, payload) {
      state.FB = payload
    },
    setMymap (state, payload) {
      state.myMap = payload
    },
    setMarkerCluster (state, payload) {
      state.markerCluster = payload
    }
  },
  actions: {
    handleFB (state, bool) {
      state.commit('setFB', bool)
    },
    handleMymap (state, bool) {
      state.commit('setMymap', bool)
    },
    handleMarkerCluster (state, bool) {
      state.commit('setMarkerCluster', bool)
    }
  }
})
