<template>
	<div class="copy-box">
		<input :class="btn_class" type="text" name="" readonly="readonly" v-model="copy_str">
		<el-button :data-clipboard-target="`.${btn_class}`" :class="btn_class">复制</el-button>
	</div>
</template>
<script>
import Clipboard from 'clipboard'

export default {
	mounted() {
        let clipboard = new Clipboard(`.${this.btn_class}`);
        clipboard.on('success', (e) => {
        	alert(`复制了${e.text}`)
            e.clearSelection();
        });
	},
	props: {
		copy_str: '',
		btn_class: ''
	},
	methods: {
	}
}
</script>

<style lang='less'>
	.copy-box {
		/*height: 30px;*/
		margin-top: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		input {
			height: 30px;
			border: solid 1px #d9d9d9;
			border-radius: 4px 0 0 4px;
			padding-left: 10px;
			color: #666666;
			cursor: not-allowed;
			user-select: none;
			outline: none;
		}
		.el-button {
			color: #666666;
			border-radius: 0 4px 4px 0;
			height: 34px;
			border: solid 1px #d9d9d9;
			border-left: 0;
			font-size: 12px;
			width: 48px;
			display: flex;
			justify-content: center;
			cursor: pointer;
			&:avtive {
				opacity: .6;
			}
		}
	}
</style>















