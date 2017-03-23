import Vue from 'vue'
import iView from 'iview'
import './assets/styles/iview-theme/index.less'
import './assets/common.less'
import 'animate.css'
import App from './App.vue'
import { store } from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import FastClick from 'fastclick'
sync(store, router) // done.
Vue.use(iView);
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
