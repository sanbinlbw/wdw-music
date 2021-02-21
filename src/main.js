import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';
import axios from 'axios'
//导入element
import '@/plugins/element.js'
//导入过滤器
import '@/plugins/filter.js'
//导入全局样式
import '@/assets/css/global.css'
//引入自定义图标
import '@/assets/font_cloudMusic/iconfont.css'
//解决跨域
import { VueJsonp } from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000/'
    // axios.defaults.baseURL = 'https://autumnfish.cn/'
    // axios.defaults.baseURL = '/api'
    // axios.defaults.baseURL = 'http://8.129.133.120:3000/'
axios.defaults.withCredentials = true;
//引入vuescroll
// import vuescroll from "vuescroll";
//引入vuescroll样式
// import "vuescroll/dist/vuescroll.css";


// Vue.use(vuescroll); //使用
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')