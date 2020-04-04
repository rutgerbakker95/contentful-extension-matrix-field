import Vue from 'vue';
import App from './App.vue';

// import Forma 36 fcss
import '@contentful/forma-36-fcss/dist/styles.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
