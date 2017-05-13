/*
* @Author: William Chan
* @Date:   2017-05-11 16:34:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-13 21:41:31
*/
// 单实例 不需要支持多实例

import Vue from 'vue'
import album from '@/components/item/album/album.vue'

const albumConstructor = Vue.extend(album);
let instance;
export default (options, cb) => {
	if (!instance) {
		instance = new albumConstructor();
		instance.vm = instance.$mount();
		document.body.appendChild(instance.vm.$el);
	}
	instance.vm.visible = true;
	instance.vm.cb   = cb || null;
	let data = {};
	if (typeof options !== 'object') {
		data.menu = options;
	} else {
		data = options;
	}
	instance.vm.menu     = data.menu && data.menu.toString() || '1';
	instance.vm.multiple = data.multiple || 1;
}
