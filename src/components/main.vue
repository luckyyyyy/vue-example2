<template>
	<div>
		<router-view class="commoon"></router-view>
<!-- 		<div class="help">
			<div class="head">
				<div class="logo">
					<img src="../assets/helpLogo.png" height="20" alt="彩虹云直播"/>
				</div>
				<p class="title">庆祝彩虹云直播新版本上线</p>
				<p class="content"><a href="#">点击了解更多新版本信息</a></p>
			</div>
			<div class="body">
				<ul>
					<li class="wrap">
						<div class="entry-head">
							<h3 class="title">帮助中心</h3>
							<a href="#">进入</a>
						</div>
						<ul class="list">
							<li>
								<span class="tag">登录</span>
								<p class="text">登陆有问题请尝试刷新，或联系客服人员进行解决。</p>
							</li>
							<li>
								<span class="tag">专题</span>
								<p class="text"><a href="#">如何做一场炒鸡火爆的直播。</a></p>
							</li>
						</ul>
					</li>
					<li class="wrap">
						<div class="entry-head">
							<h3 class="title">使用手册</h3>
							<a href="#">进入</a>
						</div>
						<ul class="list">
							<li>
								<span class="tag">热点</span>
								<p class="text">《彩虹云直播－直播使用流程手册》正式发布了。</p>
							</li>
						</ul>
					</li>
					<li class="wrap">
						<div class="entry-head">
							<h3 class="title">火爆直播公告／案例</h3>
							<a href="#">进入</a>
						</div>
						<ul class="list">
							<li>
								<span class="tag">热点</span>
								<p class="text">《彩虹云直播－直播使用流程手册》正式发布了。</p>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div> -->
	</div>
</template>
<script>
	import { store } from '@/store'

	const verifyParams = async (to, from, next) => {
		let params;
		if (to.params.liveid) {
			 await store.dispatch('live/LIVE_QUERY', { id: to.params.liveid }).then(res => {
				// success
			}).catch(err => {
				if (from.matched.some(record => record.name == 'live')) {
					params = false;
				} else {
					params =  { name: 'index' };
					// TODO 根据服务器来源判断
				}
			})
		} else if (to.params.videoid) {
			 await store.dispatch('video/VIDEO_QUERY', { id: to.params.videoid }).then(res => {
				// success
			}).catch(err => {
				if (from.matched.some(record => record.name == 'video')) {
					params = false;
				} else {
					params =  { name: 'index' };
					// TODO 根据服务器来源判断
				}
			})
		}
		next(params);
	}

	export default{
		beforeRouteEnter: verifyParams,
		beforeRouteUpdate: verifyParams
	}
</script>
<style scoped lang="less">
	@import "../assets/styles/main";
</style>
