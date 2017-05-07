<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-menu :default-active="menu" @select="onStatusChange">
					<li class="title">
						<i class="iconfont icon-video"></i>素材管理
					</li>
					<el-menu-item v-for="(value, key) in typeClass" :key="key" :index="key">{{ value }}</el-menu-item>
				</el-menu>
				<div class="button">
		 			<upload
		 				:classType="menu"
						:method="option.method"
						:action="option.action"
						:acceptn="option.acceptn"
						@success="success"
						@queue="queue"
						@fail="fail"
						@progress="progress"
					>
						<el-button :loading="!!upload" type="primary">上传图片</el-button>
					</upload>
				</div>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<el-row class="list" v-show="data.length">
				<el-col class="item" v-for="item of data" :key="item.id" :title="item.name" :xs="8" :sm="8" :md="6" :lg="4">
					<div class="head">
						<img :src="item.url">
						<div class="delete">
							<i @click="onDelete(item.id)" title="删除" class="el-icon-delete"></i>
							<div class="name">{{ item.name }}</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="tips" v-if="loading || upload || !loading && !data.length" v-loading="!!upload" :element-loading-text="upload">
			<template v-if="loading">
				正在加载中
			</template>
			<template v-else-if="!loading && !data.length">
				没有数据啦
			</template>
		</div>
	</div>
</template>

<script>
	import iscroll from 'iscroll'
	import { mapState, mapActions, mapMutations } from 'vuex';
	import upload from '@/components/item/upload'
	import { MULTIMEDIA_UPLOAD } from '@/store/api'
	import { MULTIMEDIA_TYPE } from '@/options'

	export default {
		components: {
			upload,
		},
		data () {
			return {
				option: MULTIMEDIA_UPLOAD,
				upload: false,
				loading: false,
				menu: this.$route.params.type || '1',
				typeClass: MULTIMEDIA_TYPE,
				delete: false,
			}
		},
		computed: {
			...mapState ('multimedia', ['data', 'lock']),
		},
		mounted () {
			this.getImages(true);
		},
		methods: {
			...mapActions('multimedia', {
				getMultimedia: 'MULTIMEDIA_FIND_REQUEST',
				deleteMultimedia: 'MULTIMEDIA_DELETE'
			}),
			...mapMutations('multimedia', {
				multimediaInsert: 'MULTIMEDIA_INSERT',
			}),
			onStatusChange (val) {
				this.menu = val;
				this.$router.push({ name: this.$route.name, params: { type: this.menu } })
				this.getImages(true);
			},
			async getImages (reload) {
				if (!this.lock || reload && !this.loading) {
					const type = this.menu;
					this.loading = true;
					await this.getMultimedia({ type, reload }).then(data => {
						this.loading = false;
						if (!this.listScroll) {
							this.listScroll = new iscroll(this.$refs.list, {
								mouseWheel: true,
								preventDefaultException: {
									tagName: /^(LI)$/
								},
								scrollbars: true,
								fadeScrollbars: true,
								interactiveScrollbars: true,
								shrinkScrollbars: 'clip',
							})
							this.listScroll.on('scrollStart', () => {
								this.getImages();
							});
						}
						this.$nextTick(() => {
							console.log(123)
							if (reload) {
								this.listScroll.scrollTo(0, 0);
							}
							this.listScroll.refresh();
						})
					})
					this.loading = false;
				}
			},
			success (data) {
				this.multimediaInsert(data);
				this.upload = false;
				this.$nextTick(() => {
					this.listScroll.scrollTo(0, 0, 100);
					this.listScroll.refresh();
				})
			},
			fail () {
				this.upload = false;
			},
			queue (files, length) {
				this.upload = `分析中${files.length}/${length}`;
			},
			progress (p) {
				this.upload = `上传中${Math.floor(p.percent)}%`;
			},
			onDelete (id) {
				this.$confirm('确定要删除这张图片吗？', '删除', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						try {
							instance.confirmButtonLoading = true;
							if (action === 'confirm') {
								await this.deleteMultimedia(id);
							}
							instance.confirmButtonLoading = false;
							done();
						} catch(e) {
							instance.confirmButtonLoading = false;
							done();
						}
					}
				})
			}
		},
	}
</script>


<style lang="less" scoped>
	@import "../../assets/styles/views/multimedia/index";
</style>
