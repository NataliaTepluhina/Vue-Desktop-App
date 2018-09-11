import Vue from 'vue';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
