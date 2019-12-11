import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false
Vue.router = router


const vuetifyOptions = { } 
Vue.use(Vuetify)

new Vue({
  el: '#app',
  vuetify: new Vuetify(vuetifyOptions),
  router,
  store,
  render: h => h(App)
})