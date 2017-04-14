<template>
	<div>
		<div class="container">
			<div class="body">
				<Card class="commoon-card" :bordered="false" dis-hover>
					<p slot="title" class="commoon-card__title">频道主页</p>
					<div class="user">
						<div class="avatar-box">
							<img class="avatar" src="../../assets/images/live/share.jpeg" height="50" width="50">
						</div>
						<div class="content">
							<p class="user-name"><span>黑肥麻衣</span>的频道</p>
							<p class="create-time">创建时间：<span>2017.03.31</span></p>
						</div>
						<div class="button-box">
							<Button class="btn" type="ghost" shape="circle">编辑</Button>
							<Poptip title="提示标题" content="提示内容" width="200">
								<Button class="btn" type="ghost" shape="circle">频道地址</Button>
								<div class="api" slot="content">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
									proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		        		</div>
							</Poptip>
						</div>
					</div>
				</Card>
				<Card class="commoon-card" :bordered="false" dis-hover>
					<p slot="title" class="commoon-card__title">选择模版</p>
					<Radio-group class="wrap" v-model="template">
						<div class="template-box">
							<div class="template">
								<div class="header"></div>
							</div>
							<div class="settings">
								<Radio :label="1">
									<span class="txt">BANNER模版</span>
								</Radio>
								<Button @click="selectTemplate(1)" class="btn" type="ghost" shape="circle">
									编辑
								</Button>
							</div>
						</div>
						<div class="template-box">
							<div class="template">
								<div class="header"></div>
							</div>
							<div class="settings">
								<Radio :label="2" disabled>
									<span class="txt">店招模版</span>
								</Radio>
								<Button @click="selectTemplate(2)" disabled class="btn" type="ghost" shape="circle">
									编辑
								</Button>
							</div>
						</div>
					</Radio-group>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				template: 1,
			}
		},
		watch: {
			template () {
				console.log("选择模板：" + this.template);
			}
		},
		methods: {
			selectTemplate (id){
				this.$router.push({ name: 'channel_template', params: { templateID: id } })
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/channel/index.less";
</style>
