<template>
	<el-upload
		:on-error="option.onError"
		:on-progress="option.onProgress"
		:on-success="option.onSuccess"
		:show-upload-list="false"
		:action="option.action"
		:headers="option.headers"
		:name="option.name"
		:accept="option.accept"
	>
		<slot></slot>
	</el-upload>
</template>

<script>
	import { onResponse, onResponseError } from '../../store/api'
	export default {
		props: {
			upload: Object
		},
		data () {
			return {
				default_option: {
					headers: {
						Authorization: this.$store.getters.auth
					}
				}
			}
		},
		computed: {
			option () {
				this.default_option.onError = (err, response, file) => {
					this.$emit('fail');
					onResponseError(err);
				}
				this.default_option.onProgress = (...args) => {
					this.$emit('progress', ...args);
				}
				this.default_option.onSuccess = (res, file, fileList) => {
					onResponse({ data: res }).then(res => {
						this.$emit('success', res, file, fileList);
					}).catch(err => {
						this.$emit('fail');
					})
				}
				return Object.assign(this.default_option, this.upload);
			}
		}
	}

</script>
