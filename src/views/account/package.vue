<template>
	<div>
		<div class="container">
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					账户版本
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前账户版本：<span class="focus">基础版</span></p>
						<p>有效期：<span class="focus">有效期至：2017-03-31  23:59:59</span></p>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					升级版本选择
				</p>
				<div class="content">
					<div class="select-box">
						<div @click="selectPackage(lowGrade)" class="version-wrap low-grade" :class="{ active: form.name == '普通版' }">
							<p class="title">普通版 <span>4990元/年</span></p>
							<ul class="main">
								<li>+ 10W分钟流量</li>
								<li>+ 流量单价0.05</li>
								<li>+ 媒体库200GB</li>
								<li>+ 频道创建不限</li>
								<li>+ 直播间模版</li>
								<li>+ 付费观看</li>
								<li>+ 关注观看</li>
							</ul>
							<p class="footer">(包含免费版所有功能)</p>
						</div>
						<div @click="selectPackage(highGrade)" class="version-wrap high-grade" :class="{ active: form.name == '高级版' }">
							<p class="title">普通版 <span>4990元/年</span></p>
							<ul class="main">
								<li>+ 10W分钟流量</li>
								<li>+ 流量单价0.05</li>
								<li>+ 媒体库200GB</li>
								<li>+ 频道创建不限</li>
								<li>+ 直播间模版</li>
								<li>+ 付费观看</li>
								<li>+ 关注观看</li>
							</ul>
							<p class="footer">(包含免费版所有功能)</p>
						</div>
					</div>
					<div class="form">
						<div class='message'>
							<p></p>
						</div>
						<div class='message'>

						</div>
						<div class='message'>

						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				lowGrade:{
					name: '普通版',
					price: 4990,
				},
				highGrade:{
					name: '高级版',
					price: 12990,
				},
				form:{
					name: '普通版',
					price: 4990,
				}
			}
		},
		mounted () {
		},
		methods: {
			selectPackage(version) {
				for(let key in version){
					this.form[key] = version[key];
				}
				console.log(this.form);
			},
		},
		watch: {
		},
		computed: {
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/package.less";
</style>

