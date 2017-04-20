<template>
	<div class="container">
		<div class="wrapper">
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					流量管理
					<a class="link" href="#">充值</a>
					<a class="link" href="#">账户充值记录</a>
				</p>
				<p class="content">当前流量余额：<span class="text-bold">¥ 0.00</span></p>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					当前频道
					<a class="link" href="#">了解更多</a>
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前频道流量套餐：<span class="text-bold">基础班</span></p>
						<p>有效期至：<span class="text-bold">2018.04.06</span></p>
						<a class="link" href="#">购买</a>
					</div>
					<div class="content-body">
						<div class="content-card">
							<dashboard :max="max" :value="value" ></dashboard>
						</div>
						<div class="content-card">

						</div>
						<div class="content-card-large">
							<h4 class="content-card-title">免费版套餐详情</h4>
							<ul class="collapse" :class="{ open: isOpen }">
								<li class="item" v-for="item in data">
									<div class="item-title">
										<template v-if='item.titleList'>
											<p>{{ item.titleList.title1 }}</p>
											<span class="line"></span>
											<p>{{ item.titleList.title2 }}</p>
										</template>
										<template v-else>
											<p>{{ item.title }}</p>
										</template>
									</div>
									<div class="item-main">
										<template v-if='item.imgURL'>
											<img :src="item.imgURL">
										</template>
										<template v-else>
											<p>{{ item.main }}</p>
										</template>
									</div>
								</li>
							</ul>
							<div class="collapse-btn" @click="isOpen = !isOpen;">
								<i class="icon" :class="{ open:isOpen }"></i>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					频道消费明细
				</p>
				<p class="content">当前流量余额：<span class="text-bold">¥ 0.00</span></p>
			</Card>
		</div>
	</div>
</template>

<script>
	import dashboard from '../../components/item/dashboard.vue'
	export default {
		data () {
			return {
				isOpen: false,
				data: [
					{
						title: '流量时长',
						main: '1000分钟',
					},
					{
						title: '流量单价',
						main: '0.06',
					},
					{
						title: '媒体库',
						main: '100GB',
					},
					{
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '限一个',
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/correct.png'),
					},
					{
						title: '流量时长',
						titleList: { title1:'频道管理', title2:'频道创建' },
						main: '1000分钟',
						imgURL: require('../../assets/error.png'),
					},
				],
				max: 200,
				value: 101,
			}
		},
		mounted () {
		},
		methods: {
		},
		watch: {
		},
		components: {
			dashboard,
		},
		computed: {
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/overview.less";
</style>
