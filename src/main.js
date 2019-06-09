import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuex from 'vuex'
Vue.config.productionTip = false
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import uploader from 'vue-simple-uploader'
Vue.use(Vuetify,{
  iconfont: 'mdi',
  icons: {
    'github': 'mdi-github-circle',
    'email': 'mdi-email',
    'steam': 'mdi-steam-box',
    'link': 'mdi-link',
  }
})
Vue.use(uploader)
// Vue.prototype.$url = "http://localhost:9001"
Vue.prototype.$store = store
Vue.prototype.$url = "https://www.fbkfox.com"
// Vue.prototype.$token = ''
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
