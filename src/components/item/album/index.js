/*
* @Author: William Chan
* @Date:   2017-05-11 16:34:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-11 17:50:45
*/

import Vue from 'vue'
import album from '@/components/item/album/album.vue'

const albumConstructor = Vue.extend(album);

export default (menu, cb) => {
	let instance = new albumConstructor();
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
	instance.vm.visible = true;
	instance.vm.cb = cb;
	instance.vm.menu = menu || '1';
}
