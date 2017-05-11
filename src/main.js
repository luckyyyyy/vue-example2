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

import card from '@/components/item/card'

Vue.config.productionTip = false;
sync(store, router) // done.
Vue.use(ElementUI);

Vue.component('ra-card', card);

if (window.navigator.userAgent.indexOf('iPad') > -1) {
	FastClick.attach(document.body);
}
// create app
export default new Vue({
	router,
	store,
	el: '#app',
	template: '<App/>',
	components: { App,},
})
