<template>
	<div class="edit">
		<div class="card-wrap">
			<Card class="border-r" :bordered="false" dis-hover>
					<p slot="title" class="title">频道编辑</p>
					<div class="body">
						<div class="model-box">
							<!-- 顶部 -->
							<div class="header">

							</div>
							<!-- 频道名称 -->
							<div class="name">

							</div>
							<!-- 当前 直播封面 -->
							<div class="live-page">
								<h2 class="head">－ 正在直播 －</h2>
								<div class="live-body">
									<div class="live-title">直播昵称</div>
									<div class="live-main">
										<div class="txt">
											<p>直播中</p>
											<span>3232人 在看</span>
										</div>
									</div>
								</div>
							</div>
							<!-- 预告 直播封面 -->
							<div class="fornotice"></div>
							<!-- 回放 直播封面 -->
							<div class="playback"></div>
						</div>
					</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/channel/edit.less";
</style>
