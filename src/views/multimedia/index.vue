<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<Menu :activeName="menu" @on-select="onStatusChange" width="135px">
					<li class="title">
						<i class="iconfont icon-video"></i>素材管理
					</li>
					<MenuItem v-for="(value, key) in typeClass" :key="key" :name="key | number">{{ value }}</MenuItem>
				</Menu>
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
						<iButton :loading="lock ? true : false" type="primary">上传图片</iButton>
					</upload>
				</div>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<!-- <Spin fix v-if="loading"></Spin> -->
			<ul class="list" v-show="data.length">
				<li class="item" v-for="item of data">
					<!-- <div class="head" :style="`background-image: url(${item.url})`"> -->
					<div class="head">
						<img :src="item.url">
						<div class="name">{{ item.name }}</div>
					</div>
					<div class="bottom">
						<span>1</span>
						<span>2</span>
					</div>
				</li>
			</ul>
			<div v-show="!loading && !data.length" class="tips">
				没有数据啦QAQ
			</div>
		</div>


	</div>
</template>

<script>
	import iscroll from 'iscroll'
	import { mapState, mapActions, mapMutations } from 'vuex';
	import upload from '../../components/item/upload'
	import { MULTIMEDIA_UPLOAD } from '../../store/api'
	import multimediaModule from '../../store/modules/multimedia/'
	import { registerModule } from '../../store'
	import { MULTIMEDIA_TYPE } from '../../options'
	registerModule('multimedia', multimediaModule);

	export default {
		components: {
			upload,
		},
		data () {
			return {
				option: MULTIMEDIA_UPLOAD,
				lock: false,
				loading: true,
				menu: parseInt(this.$route.params.type) || 1,
				typeClass: MULTIMEDIA_TYPE,
			}
		},
		computed: {
			...mapState ('multimedia', ['data']),
		},
		mounted () {
			this.getImages(true);
		},
		methods: {
			...mapActions('multimedia', {
				getMultimedia: 'MULTIMEDIA_FIND_REQUEST'
			}),
			...mapMutations('multimedia', {
				multimediaInsert: 'MULTIMEDIA_FIND_INSERT',
			}),
			onStatusChange (val) {
				this.menu = parseInt(val);
				this.$router.push({ name: this.$route.name, params: { type: this.menu } })
				this.getImages(true);
			},
			getImages (reload) {
				// const msg = this.$Message.loading('正在加载中...', 0);
				this.loading = true;
				const type = this.menu;
				this.getMultimedia({ type, reload }).then(data => {
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
						this.listScroll.on('scrollEnd', () => {
							this.getImages();
						});
					} else {
						if (reload) {
							this.listScroll.scrollTo(0, 0);
						}
						this.listScroll.refresh();
					}
				}).catch(() => {
					this.loading = false;
				})
			},
			success (data) {
				this.multimediaInsert(data);
				this.lock = false;
				this.listScroll.scrollTo(0, 0, 100);
				this.listScroll.refresh();
			},
			fail () {
				this.lock = false;
			},
			queue (files, length) {
				this.lock = `分析中${files.length}/${length}`;
			},
			progress (p) {
				this.lock = `上传中${Math.floor(p.percent)}%`;
			},
		},
		filters: {
			number (val) {
				return parseInt(val);
			}
		},
	}
</script>


<style lang="less" scoped>
	@import "../../assets/styles/views/multimedia/index";
</style>
