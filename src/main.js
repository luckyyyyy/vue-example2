import Vue from 'vue'
import iView from 'iview'
import ElementUI from 'element-ui'
import { sync } from 'vuex-router-sync'
import FastClick from 'fastclick'

import App from '@/App.vue'
import { store } from '@/store'
import router from '@/router'
import 'animate.css'
import '@/assets/styles/iview-theme/index.less'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/common.less'


Vue.config.productionTip = false;
sync(store, router) // done.
Vue.use(iView);
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
