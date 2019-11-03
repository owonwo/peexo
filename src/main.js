import Vue from 'vue';
import App from './App.vue';
import '@/sass/app.scss';
import {
  trace, debug, logError, DebugHelpers,
} from './lib/mixins/vue-mixins';

Vue.config.productionTip = false;

window.trace = trace
window.debug = debug
window.logError = logError

Vue.mixin(DebugHelpers)

new Vue({
  render: h => h(App),
}).$mount('#app');
