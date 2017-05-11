<template>
	<el-dialog
		custom-class="album-dialog"
		:visible.sync="visible"
		:close-on-press-escape="false"
		@close="onClose"
		:title="find.length ? `已选择${find.length}张图片` : '我的图库'"
	>
		<div class="album-content" v-loading="upload_lock" :element-loading-text="upload_lock">

			<div class="album-content__menu" ref="menu">
				<el-menu :default-active="menu" @select="onSelectMenu">
					<el-menu-item v-for="(value, key) in typeClass" :key="key" :index="key">{{ value }}</el-menu-item>
				</el-menu>
			</div>

			<div class="album-content__list" ref="list" v-show="data.length > 0">
				<ul>
					<li
						v-for="item of data"
						:title="item.name"
						@click="onSelect(item, !select[item.id])"
						:class="{ select: select[item.id] }"
					>
						<img :src="item.url + '/album'">
						<span>{{ item.name }}</span>
						<i class="el-icon-circle-check"></i>
					</li>
				</ul>
			</div>

			<div v-show="!data.length || loading" class="album-content__empty">
				<div v-if="!loading">
					<i class="el-icon-picture"></i>
					<p>还没有图片呢，点击左下角上传吧。</p>
				</div>
				<div v-else>
					<i class="el-icon-loading"></i>
					<p>图片加载中</p>
				</div>
			</div>
		</div>

		<div slot="footer" class="dialog-footer">
			<div class="left">
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
					<el-button :loading="upload_lock ? true : false" type="primary">上传图片</el-button>
				</upload>
			</div>
			<div class="right">
				<el-button @click="onClose">取 消</el-button>
				<el-button :disabled="find.length == 0" type="primary" @click="onSubmit">选择</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import iscroll from 'iscroll'
	import { mapState, mapActions, mapMutations } from 'vuex';
	import { store } from '@/store'
	import upload from '@/components/item/upload'
	import { MULTIMEDIA_UPLOAD } from '@/store/api'
	import { MULTIMEDIA_TYPE } from '@/options'

	export default {
		store,
		components: {
			upload
		},
		data () {
			return {
				multiple: false,
				visible: false,
				option: MULTIMEDIA_UPLOAD,
				find: [],
				upload_lock: false,
				loading: false,
				menu: '1',
				typeClass: MULTIMEDIA_TYPE,
				cb: null
			}
		},
		computed : {
			...mapState ('multimedia', ['data', 'lock']),
			select () {
				let images = [];
				let select = {};
				for (let item of this.data) {
					images[item.id] = item;
				}
				for (let id of this.find) {
					select[id] = images[id];
				}
				return select;
			}
		},
		methods: {
			...mapActions('multimedia', {
				getMultimedia: 'MULTIMEDIA_FIND_REQUEST'
			}),
			...mapMutations('multimedia', {
				multimediaInsert: 'MULTIMEDIA_INSERT',
			}),
			success (data) {
				this.multimediaInsert(data);
				this.upload_lock = false;
				this.listScroll.scrollTo(0, 0, 100);
				this.listScroll.refresh();
			},
			fail () {
				this.upload_lock = false;
			},
			queue (files, length) {
				this.upload_lock = `分析中${files.length}/${length}`;
			},
			progress (p) {
				this.upload_lock = `上传中${Math.floor(p.percent)}%`;
			},
			onSubmit () {
				if (this.multiple > 1) {
					if (this.cb) {
						this.cb(this.find, this.select);
					}
				} else {
					if (this.cb) {
						this.cb(...this.find, this.select[Object.keys(this.select)]);
					}
				}
				this.onClose();
			},
			onSelect (item, selected) {
				if (selected) {
					if (this.multiple > 1) {
						if (this.find.length >= this.multiple) {
							this.$message(`最多只能选择${this.multiple}张`)
						} else {
							this.find.push(item.id);
						}
					} else {
						this.find = [];
						this.find.push(item.id);
					}
				} else {
					const index = this.find.indexOf(item.id);
					if (index > -1) {
						this.find.splice(index, 1);
					}
				}
			},
			onSelectMenu (val) {
				this.menu = val;
			},
			getImages (reload) {
				if (!this.lock || reload && !this.loading) {
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
							this.listScroll.on('scrollStart', () => {
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
				}
			},
			onClose () {
				this.visible = false;
				this.$emit('input', false);
			}
		},
		watch: {
			visible (val) {
				if (val) {
					this.$nextTick(() => {
						if (!this.menuScroll) {
							this.menuScroll = new iscroll(this.$refs.menu, {
								mouseWheel: true,
								preventDefaultException: {
									tagName: /^(LI)$/
								},
								scrollbars: true,
								fadeScrollbars: true,
								interactiveScrollbars: true,
								shrinkScrollbars: 'clip'
							})
							this.menuScroll.refresh();
						}
					})
					this.find = [];
					this.getImages(true);
				}
				this.visible = val;
			},
			menu (val) {
				this.find = [];
				this.getImages(true);
			}
		},
	};
</script>
<style lang="less">
	@import url('../../../assets/styles/components/album.less');
</style>
