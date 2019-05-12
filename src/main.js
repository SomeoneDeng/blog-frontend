import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify,{
  iconfont: 'mdi',
  icons: {
    'github': 'mdi-github-circle',
    'email': 'mdi-email',
    'steam': 'mdi-steam-box',
    'link': 'mdi-link',
  }
})
Vue.use(Vuex)

// 全局变量
const store = new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
    userToken: state => {
      return state.token
    }
  },
  mutations: {
    userToken (state, token) {
      state.token = token
    }
  }
})


// Vue.prototype.$url = "http://localhost:9001"
Vue.prototype.$url = "https://shirakamifubuki.com"
// Vue.prototype.$token = ''
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
