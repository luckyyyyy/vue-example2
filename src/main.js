import Vue from 'vue'
import ElementUI from 'element-ui'

import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/common.less'

import _L from './store/api/api_zhcn'

window._L = _L

import App from './App.vue'

import router from "./router"
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router) // done.


Vue.config.devtools = process.env.NODE_ENV !== 'production'; // 开启debug模式

Vue.use(ElementUI); // 饿了么组件库 插件形式安装

// create app
const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
