/*
* @Author: William Chan
* @Date:   2017-05-11 16:34:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-11 18:15:38
*/

import Vue from 'vue'
import album from '@/components/item/album/album.vue'

const albumConstructor = Vue.extend(album);
let instance;
export default (menu, cb) => {
	if (!instance) {
		instance = new albumConstructor();
		instance.vm = instance.$mount();
		document.body.appendChild(instance.vm.$el);
	}
	instance.vm.visible = true;
	instance.vm.cb = cb;
	instance.vm.menu = menu || '1';
}
