<template>
	<div class="album">
		<el-dialog title="我的图库" v-model="openAlbum" size="small">
			<div class="list">
				<ul @scroll="scroll">
					<li v-for="n in 100" @click="onSelect(n)" :class="{ select: select[n] }">
						<img src="../../assets/qrcode.png">
						<span>777 x 777</span>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer">
				<div class="left">
					<el-upload
						action="//jsonplaceholder.typicode.com/posts/"
						:multiple="true"
						:show-upload-list="false"
					>
						<el-button type="primary">上传图片</el-button>
					</el-upload>
				</div>
				<div class="right">
					<el-button @click="openAlbum = false">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</div>
			</span>
		</el-dialog>
	</div>
</template>


<script>
	export default {
		props: {
			openDialog: {
				type: Boolean,
				default: false,
			},
			multiple: {
				type: Boolean,
				default: false,
			},
		},
		data () {
			return {
				openAlbum: this.openDialog,
				select: []
			}
		},
		methods: {
			submit () {
				this.openAlbum = false;
				this.$emit('submit', this.select);
			},
			onSelect (index) {
				this.$set(this.select, index, !this.select[index])
			},
			scroll (e) {
				const el = e.target
				if(el.scrollHeight - el.scrollTop - el.offsetHeight < 100) {
					console.log(123)
					// 获取数据了
				}
			}
		}
    }
</script>
<style lang="less" scoped>
	.dialog-footer {
		display: flex;
		justify-content: space-between;
	}
	.el-upload {
		width: auto;
	}
	.album {
		.list {
			display: flex;
			ul {
				display: flex;
				flex-wrap: wrap;
				height: 400px;
				overflow: auto;
				justify-content: center;
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
					img {;
						width: 85px;
						height: 85px;
					}
					span {
						position: absolute;
						width: 100%;
						height: 20px;
						line-height: 20px;
						bottom: 0;
						left: 0;
						background: rgba(0, 0, 0, .3);
						color: white;
						text-align: center;
					}
				}
			}
		}
	}
</style>
