<template>
	<div class="sidebar">
		<div class="logo">
			<!-- 待定 -->
			<img :src="channel.logoImageUrl + '/avatar'">
		</div>
		<Menu class="sidebar-menu" @on-select="onSelect" theme="dark" :activeName="active" mode="vertical" width="140px" :openNames="openNames">
			<template v-for="item of sidebar">
				<template v-if="item.sub">
					<Submenu :name="item.name">
						<span slot="title" v-html="item.item"></span>
						<MenuItem :key="sub.name" v-for="sub of item.sub" :name="sub.name" v-html="sub.item"></MenuItem>
					</Submenu>
				</template>
				<MenuItem :class="{ line: item.line }" v-else :name="item.name" v-html="item.item"></MenuItem>
			</template>
		</Menu>
		<div style="text-align: center;padding: 10px;">
			<iSwitch @on-change="enableDebug" v-model="debug">
				<span slot="open">on</span>
				<span slot="close">off</span>
			</iSwitch>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				debug: localStorage.getItem('debug') ? true : false,
				sidebar: [
					{ item: '<i class="iconfont icon-rank"></i>概况', name: 'index' },
					{ item: '<i class="iconfont icon-list"></i>频道', name: 'channel' },
					{
						item: '<i class="iconfont icon-video"></i>直播',
						name: 'live',
						sub: [
							{ item: '直播列表', name: 'live_list' },
							{ item: '回放列表', name: 'video_list' },
							{ item: '直播间模板', name: 'live_template' },
						]
					},
					// { item: '<i class="iconfont icon-shop"></i>电商', name: 'shop', sub: [
					// 	{ item: '商品', name: 'store_shop_list' },
					// 	{ item: '订单', name: 'store_order_list' },
					// 	{ item: '设置', name: 'store_setting' },
					// ] },
					{
						item: '<i class="iconfont icon-recharge"></i>账户',
						name: 'account',
						sub: [
							{ item: '账户总览', name: 'account_overview' },
							{ item: '套餐购买', name: 'account_package' },
							{ item: '流量管理', name: 'account_flow' },
							{ item: '立即充值', name: 'account_recharge' },
							// { item: '我的收入', name: 'account_income' },
						]
					},
					// { item: '<i class="iconfont icon-circle"></i>营销', name: 'index2' },
					{ item: '<i class="iconfont icon-material"></i>素材', name: 'multimedia', line: true },
					{ item: '<i class="iconfont icon-set"></i>设置', name: 'channel_preferences' },

				],
			}
		},
		computed: {
			active() {
				let active = this.$route.name;
				this.$route.matched.some(record => {
					if(record.meta.parent) {
						active = record.meta.parent;
					}
				})
				return active;
			},
			openNames() {
				let openNames = [];
				for(let item of this.sidebar) {
					for(let sub of item.sub || []) {
						if(sub.name == this.active) {
							openNames.push(item.name);
							break;
						}
					}
				}
				return openNames;
			},
			...mapState('channel', ['channel'])
		},
		mounted() {
			// console.log(this.info)
		},
		methods: {
			enableDebug(val) {
				if(val) {
					localStorage.setItem('debug', true);
				} else {
					localStorage.removeItem('debug');
				}
				window.location.reload();
			},
			onSelect(name) {
				this.$router.push({ name })
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/styles/sidebar";
</style>
