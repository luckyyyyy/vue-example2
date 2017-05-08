<template>
	<div>
		<div class="container">
			<div class="body">
				<Icard>
					<p slot="title">频道主页</p>
					<div class="user">
						<div class="avatar-box">
							<img class="avatar" src="../../assets/images/live/share.jpeg" height="50" width="50">
						</div>
						<div class="content">
							<p class="user-name"><span>黑肥麻衣</span>的频道</p>
							<p class="create-time">创建时间：<span>2017.03.31</span></p>
						</div>
						<div class="button-box">
							<el-button class="btn">编辑</el-button>
							<el-popover :width="200">
								<el-button slot="reference" class="btn">频道地址</el-button>
								<div class="api">????</div>
							</el-popover>
						</div>
					</div>
				</Icard>
				<Icard>
					<p slot="title">选择模版</p>
					<el-radio-group class="wrap" v-model="template">
						<div class="template-box">
							<div class="template">
								<div class="header"></div>
							</div>
							<div class="settings">
								<el-radio :label="1">
									<span class="txt">BANNER模版</span>
								</el-radio>
								<el-button @click="selectTemplate(1)" class="btn" type="ghost" shape="circle">
									编辑
								</el-button>
							</div>
						</div>
						<div class="template-box">
							<div class="template">
								<div class="header"></div>
							</div>
							<div class="settings">
								<el-radio :label="2" disabled>
									<span class="txt">店招模版</span>
								</el-radio>
								<el-button @click="selectTemplate(2)" disabled class="btn" type="ghost" shape="circle">
									编辑
								</el-button>
							</div>
						</div>
					</el-radio-group>
				</Icard>
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
