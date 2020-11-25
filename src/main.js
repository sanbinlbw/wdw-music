import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';
import axios from 'axios'
import '@/plugins/element.js'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8080/'
    // axios.defaults.withCredentials = true;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')