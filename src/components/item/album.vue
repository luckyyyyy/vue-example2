<template>
	<div>
		<el-dialog
			v-model="openDialog"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:show-close="false"
			custom-class="albumDialog"
		>
			<template slot="title">我的图库 {{ find.length ? `已选择${find.length}张图片` : '请选择图片' }}</template>
			<div class="loading" v-loading="lock" element-loading-text="图片上传中">
				<ul
					ref="list"
					@scroll="onScroll"
					class="list"
				>
					<li v-for="item in data" :title="item.name" @click="onSelect(item.id, !select[item.id])" :class="{ select: select[item.id] }">
						<img :src="item.url">
						<span>{{ item.name }}</span>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="left">
		 			<upload
		 				:type="type"
						:method="option.method"
						:action="option.action"
						:acceptn="option.acceptn"
						@success="success"
						@queue="queue"
						@fail="fail"
						@progress="progress"
					>
						<el-button :loading="lock ? true : false" type="primary">{{ lock ? lock : '上传图片' }}</el-button>
					</upload>
				</div>
				<div class="right">
					<el-button @click="pushClose">取 消</el-button>
					<el-button :disabled="find.length == 0" type="primary" @click="onSubmit">确 定</el-button>
				</div>
			</span>
		</el-dialog>
		<slot></slot>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import upload from './upload'
	import { MULTIMEDIA_UPLOAD } from '../../store/api'
	export default {
		components: {
			upload
		},
		props: {
			type: {
				type: Number,
				default: 3,
			},
			openAlbum: {
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
				option: MULTIMEDIA_UPLOAD,
				find: [],
				lock: false,
			}
		},
		computed : {
			openDialog () {
				if (this.openAlbum) {
					this.getImages();
					this.find = [];
				}
				return this.openAlbum;
			},
			...mapState ({
				data: state => state.multimedia_find.data,
			}),
			select () {
				let select = [];
				for (let obj of this.find) {
					select[obj] = true;
				}
				return select;
			}
		},
		methods: {
			success (data) {
				this.$store.commit('MULTIMEDIA_FIND_INSERT', data);
				this.lock = false;
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
				this.$emit('close');
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
			getImages () {
				this.$store.dispatch('MULTIMEDIA_FIND_REQUEST');
			},
			pushClose () {
				this.$emit('close');
			}
		}
    }
</script>
<style lang="less" scoped>
	.dialog-footer {
		display: flex;
		justify-content: space-between;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		max-height: 410px;
		height: auto;
		overflow: auto;
		// justify-content: center;
		// align-items: center;
		&.lock {
			overflow: hidden;
		}
		li {
			margin: 8px;
			position: relative;
			width: 85px;
			height: 85px;
			&:after {
				position: absolute;
				content: "";
				height: 100%;
				left: 0;
				top: 0;
				width: 100%;
				border: 2px solid red;
				visibility: hidden;
				box-sizing: border-box;
				cursor: pointer;
			}
			&:hover, &.select {
				&:after {
					visibility: visible;
				}
			}
			&.select {
				&:after {
					border: 3px solid red;
				}
			}
			img {;
				width: 85px;
				height: 85px;
			}
			span {
				position: absolute;
				width: 100%;
				height: 20px;
				line-height: 20px;
				padding: 0 10px;
				box-sizing: border-box;
				text-overflow: ellipsis;
				overflow: hidden;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, .3);
				color: white;
				text-align: center;
			}
		}
	}
</style>
<style lang="less">
	.albumDialog {
		width: 848px;
		.el-dialog__body {
			height: 400px;
			border-box: box-sizing;
			padding: 10px;
		}
	}
</style>
