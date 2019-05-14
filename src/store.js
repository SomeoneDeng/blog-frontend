import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
      token: '',
      uncheckHitokoTo: []
    },
    mutations: {
      setUserToken (state, token) {
        state.token = token
      },
      uncheckHitokoTo (state, uncheckHitokoTo) {
        state.uncheckHitokoTo = uncheckHitokoTo
      },
      deleteHitokoto (state, id) {
        state.uncheckHitokoTo = state.uncheckHitokoTo.filter(k => k.id != id)
      }
    }
})

