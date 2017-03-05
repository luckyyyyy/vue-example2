/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-05 21:23:34
*/

'use strict';

import { get_commodity_catalogs } from '../../api/commodity'
import { COMMODITY_CATALOGS } from '../../types'

const state = {
	lock: false,
	data: [],
}

const getters = {
	option: state => {
		const data = [];
		for (let item of state.data) {
			data.push({ value: item.id, label: item.name });
		}
		return data;
	}
}

const actions = {
	[COMMODITY_CATALOGS.REQUEST] (store) {
		if (store.state.data.length == 0){
			store.commit(COMMODITY_CATALOGS.REQUEST);
			get_commodity_catalogs().then(res => {
				store.commit(COMMODITY_CATALOGS.SUCCESS, res.data);
			}).catch(err => {
				store.commit(COMMODITY_CATALOGS.FAILURE, err);
			})
		}
	}
}

const mutations = {
	[COMMODITY_CATALOGS.REQUEST] (state) {
		state.lock = true;
		state.data = [];
	},
	[COMMODITY_CATALOGS.SUCCESS] (state, { catalogs }) {
		state.lock = false;
		state.data = catalogs;
	},
	[COMMODITY_CATALOGS.FAILURE] (state, err) {
		state.lock = false;
		// state.data = [];
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
