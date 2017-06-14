/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:51:18
*/

'use strict';

import { get_commodity_catalogs } from '../../api/commodity'
import { COMMODITY_CATALOGS } from '../../types'

export default {
	namespaced: true,
	getters: {
		data: [],
		option: state => {
			const data = [];
			for (let item of state.data) {
				data.push({ value: item.id, label: item.name });
			}
			return data;
		}
	},
	actions: {
		[COMMODITY_CATALOGS.REQUEST] (store) {
			if (store.state.data.length == 0){
				store.commit(COMMODITY_CATALOGS.REQUEST);
				return new Promise((resolve, reject) => {
					get_commodity_catalogs().then(res => {
						store.commit(COMMODITY_CATALOGS.SUCCESS, res.data);
						resolve();
					}).catch(err => {
						store.commit(COMMODITY_CATALOGS.FAILURE, err);
						reject();
					})
				})
			}
		}
	},
	mutations: {
		[COMMODITY_CATALOGS.REQUEST] (state) {
			state.data = [];
		},
		[COMMODITY_CATALOGS.SUCCESS] (state, { catalogs }) {
			state.data = catalogs;
		},
		[COMMODITY_CATALOGS.FAILURE] (state, err) {
			// state.data = [];
		},
	}
}
