import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
      token: '',
      uncheckHitokoTo: [],
      topArticles: [],
      categories: [],
      messages: [],
      friends: [],
      archives:[]
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
      },
      setTopArticles(state, articles) {
        state.topArticles = articles
      },
      setCategories(state, categories){
        state.categories = categories;
      },
      setMessages(state, messages){
        state.messages  = messages
      },
      setFriends(state, friends){
        state.friends = friends
      },
      setArchives(state, archives){
        state.archives = archives
      }
    }
})

