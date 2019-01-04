import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios;

new Vue({
    render: h => h(App),
}).$mount('#app')