<template>
	<div>
		<Modal
			v-model="visible"
			className="albumDialog"
			:mask-closable="false"
			:closable="false"
			:width="848"
			:title="find.length ? `已选择${find.length}张图片` : '我的图库'"
		>
			<div class="content">
				<div class="loading" v-if="lock">
					<Spin fix>
						<Icon type="load-c" size=18 class="spin-icon-load"></Icon>
						<p>{{ lock }}</p>
					</Spin>
				</div>
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
	import { mapState } from 'vuex';
	import upload from './upload'
	import { MULTIMEDIA_UPLOAD } from '../../store/api'
	import multimedia_find from '../../store/modules/multimedia/find'
	import { registerModule } from '../../store'
	registerModule('multimedia_find', multimedia_find);

	export default {
		components: {
			upload
		},
		props: {
			type: {
				type: Number,
				default: 3,
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
		methods: {
			success (data) {
				this.$store.commit('MULTIMEDIA_FIND_INSERT', data);
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
			getImages () {
				this.$store.dispatch('MULTIMEDIA_FIND_REQUEST');
			},
			close () {
				this.visible = false;
				this.$emit('input', false);
			}
		},
		watch: {
			value (val) {
				if (val) {
					this.getImages();
					this.find = [];
				}
				this.visible = val;
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
		.content {
			position: relative;
			.loading {
				position: absolute;
				// background: #fff;
				height: 100%;
				width: 100%;
				z-index: 1;
				.spin-icon-load {
					animation: ani-spin 1s linear infinite;
				}
				@keyframes ani-spin {
					from { transform: rotate(0deg);}
					50%  { transform: rotate(180deg);}
					to   { transform: rotate(360deg);}
				}
			}

		}
	}
</style>
