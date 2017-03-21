<template>
	<div>
		<Modal
			className="albumModal"
			v-model="visible"
			:mask-closable="false"
			:closable="false"
			:width="830"
			:title="find.length ? `已选择${find.length}张图片` : '我的图库'"
		>
			<div class="content">
				<div class="loading" v-if="lock">
					<Spin fix>
						<Icon type="load-c" size=18 class="spin-icon-load"></Icon>
						<p>{{ lock }}</p>
					</Spin>
				</div>
				<Menu class="album__menu" theme="dark" :activeName="menu" width="110px" @on-select="onSelectMenu">
					<MenuItem v-for="(value, key) in typeClass" :key="key" :name="key | number">{{ value }}</MenuItem>
				</Menu>
				<ul
					ref="list"
					@scroll="onScroll"
					class="list"
					v-if="data.length > 0"
				>
					<li
						v-for="item of data"
						:title="item.name"
						@click="onSelect(item.id, !select[item.id])"
						:class="{ select: select[item.id] }"
					>
						<img :src="item.url">
						<span>{{ item.name }}</span>
						<div class="icon">
							<Icon type="checkmark-circled"></Icon>
						</div>
					</li>
				</ul>
				<div v-else class="empty">
					<div v-if="empty">
						<Icon type="images" :size="40"></Icon>
						<p>还没有图片呢，点击左下角上传吧。</p>
					</div>
					<div v-else>
						<Icon type="load-c" :size="24" class="spin-icon-load"></Icon>
						<p>图片加载中</p>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="left">
		 			<upload
		 				:type="menu"
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
				<div class="right">
					<iButton @click="close">取 消</iButton>
					<iButton :disabled="find.length == 0" type="primary" @click="onSubmit">选择</iButton>
				</div>
			</span>
		</Modal>
		<slot></slot>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex';
	import upload from './upload'
	import { MULTIMEDIA_UPLOAD } from '../../store/api'
	import multimediaModule from '../../store/modules/multimedia/'
	import { registerModule } from '../../store'
	import { MULTIMEDIA_TYPE } from '../../options'
	registerModule('multimedia', multimediaModule);

	export default {
		components: {
			upload
		},
		props: {
			type: {
				type: Number,
				default: 1,
			},
			value: {
				type: Boolean,
				default: false,
			},
			multiple: {
				type: Number,
				default: 0,
			},
		},
		data () {
			return {
				visible: this.value,
				option: MULTIMEDIA_UPLOAD,
				find: [],
				lock: false,
				menu: this.type,
				typeClass: MULTIMEDIA_TYPE
			}
		},
		computed : {
			...mapState ('multimedia', ['data', 'empty']),
			select () {
				let select = [];
				for (let obj of this.find) {
					select[obj] = true;
				}
				return select;
			}
		},
		methods: {
			...mapActions('multimedia', {
				getMultimedia: 'MULTIMEDIA_FIND_REQUEST'
			}),
			...mapMutations('multimedia', {
				multimediaInsert: 'MULTIMEDIA_FIND_INSERT',
			}),
			success (data) {
				this.multimediaInsert(data);
				this.lock = false;
				this.$refs.list.scrollTop = 0;
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
			onSubmit () {
				this.$emit('submit', this.find);
				this.close();
			},
			onSelect (id, selected) {
				if (selected) {
					if (this.multiple) {
						if (this.find.length >= this.multiple) {
							this.$message(`最多只能选择${this.multiple}张`)
						} else {
							this.find.push(id);
						}
					} else {
						this.find = [];
						this.find.push(id);
					}
				} else {
					const index = this.find.indexOf(id);
					if (index > -1) {
						this.find.splice(index, 1);
					}
				}
			},
			onScroll (e) {
				const el = e.target;
				if (el.scrollHeight - el.scrollTop - el.offsetHeight < 100) {
					this.getImages();
				}
			},
			onSelectMenu (val) {
				this.menu = val;
			},
			getImages (type) {
				this.getMultimedia(type);
			},
			close () {
				this.visible = false;
				this.$emit('input', false);
			}
		},
		watch: {
			value (val) {
				if (val) {
					this.find = [];
					this.getImages(this.menu);
				}
				this.visible = val;
			},
			menu (val) {
				this.find = [];
				this.getImages(this.menu);
			}
		},
		filters: {
			number (val) {
				return parseInt(val);
			}
		},
    }
</script>
<style lang="less">
	@import url('../../assets/styles/components/album.less');
</style>
