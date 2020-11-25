import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';
import axios from 'axios'
//导入element
import '@/plugins/element.js'
//导入全局样式
import '@/assets/css/global.css'
//引入自定义图标
import '@/assets/font_musicHome/iconfont.css'
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
    // axios.defaults.withCredentials = true;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')