import Vue from 'vue'
import ElementUI from 'element-ui'
import { sync } from 'vuex-router-sync'
import FastClick from 'fastclick'

import App from '@/App.vue'
import { store } from '@/store'
import router from '@/router'

import 'normalize.css'
import '@/theme/index.css'
import '@/assets/common.less'
// import 'animate.css'

Vue.config.productionTip = false;
sync(store, router) // done.
Vue.use(ElementUI);
// create app
new Vue({
	router,
	store,
	el: '#app',
	template: '<App/>',
	components: { App },
})
if (window.navigator.userAgent.indexOf('iPad') > -1) {
	FastClick.attach(document.body);
}
