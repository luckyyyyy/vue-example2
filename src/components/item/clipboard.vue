<template>
	<div @click="copy" :class="cls" :data-clipboard-text="text">
		<slot></slot>
	</div>
</template>

<script>
import clipboard from 'clipboard'

export default {
	props: {
		text: '',
	},
	methods: {
		copy () {
			const obj = new clipboard(`.${this.cls}`);
			obj.on('success', e => {
				console.log(123)
				e.clearSelection();
				this.$message({
					 message: '复制成功',
					 type: 'success'
				})
			});
		}
	},
	data () {
		return {
			cls: 'clipboard'
		}
	},
}
</script>
