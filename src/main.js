import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/reset.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/common.less'

import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import FastClick from 'fastclick'
sync(store, router) // done.
Vue.use(ElementUI); // 饿了么组件库 插件形式安装


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
