<template>
	<el-dialog
		title="我的图库"
		v-model="openAlbum"
		size="small"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		custom-class="albumDialog"
	>
		<div class="list" v-loading.lock="lock" element-loading-text="图片上传中">
			<ul @scroll="scroll">
				<li v-for="item in data" :title="item.name" @click="onSelect(item.id)" :class="{ select: select[item.id] }">
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
					<el-button :loading="lock" type="primary">{{ lock ? `上传中${lock}%` : '上传图片' }}</el-button>
				</upload>
			</div>
			<div class="right">
				<el-button @click="openAlbum = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</span>
	</el-dialog>
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
			openDialog: {
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
				openAlbum: this.openDialog,
				find: [],
				lock: false,
			}
		},
		computed : {
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
		mounted () {
			this.getImages();
		},
		methods: {
			success (data) {
				this.$store.commit('MULTIMEDIA_FIND_INSERT', data);
				this.lock = false;
			},
			fail () {
				this.lock = false;
			},
			queue () {

			},
			progress (p) {
				this.lock = Math.floor(p.percent);

			},
			submit () {
				this.openAlbum = false;
				this.$emit('submit', this.find);
			},
			onSelect (index) {
				if (this.multiple) {
					if (this.find.length >= this.multiple) {
						this.$message(`最多只能选择${this.multiple}张`)
					} else {
						this.find.push(index);
					}
				} else {
					this.find = [];
					this.find.push(index);
				}
			},
			scroll (e) {
				const el = e.target;
				if (el.scrollHeight - el.scrollTop - el.offsetHeight < 100) {
					this.getImages();
				}
			},
			getImages () {
				this.$store.dispatch('MULTIMEDIA_FIND_REQUEST');
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
		ul {
			display: flex;
			flex-wrap: wrap;
			max-height: 400px;
			overflow: auto;
			// justify-content: center;
			// align-items: center;
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
	}
</style>
<style lang="less">
	.albumDialog {
		width: 850px;
		.el-dialog__body {
			height: 400px;
		}
	}
</style>
