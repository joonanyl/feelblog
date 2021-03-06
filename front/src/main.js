import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
