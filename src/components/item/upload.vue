<template>
	<div :class="{ disabled: length > 0 }" class="rb-upload" @click="openBrowse">
		<slot></slot>
		<input :accept="accept" :multiple="multiple && 'multiple'" @change="onChange" ref="fileInput" type="file" class="rb-upload__input">
	</div>
</template>
<style lang="less" scoped>
	.rb-upload {
		display: inline-block;
		text-align: center;
		cursor: pointer;
		&.disabled {
			cursor: default;
		}
		.rb-upload__input {
			display: none;
		}
	}
</style>
<script>
	import { onResponse, onResponseError } from '../../store/api'

	function getBody(xhr) {
		const text = xhr.responseText || xhr.response;
		if (!text) {
			return text;
		}
		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	}

	function getError(action, xhr) {
		let msg;
		msg = `Network Error ${xhr.status}`;
		// if (xhr.response) {
		// 	msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
		// } else if (xhr.responseText) {
		// 	msg = `${xhr.status} ${xhr.responseText}`;
		// } else {
		// 	msg = `fail to post ${action} ${xhr.status}'`;
		// }
		const err = new Error(msg);
		err.status = xhr.status;
		err.url = action;
		// fail to post ${action} ${xhr.status}
		return err;
	}

	export default {
		props: {
			accept: {
				type: String,
				default: 'image/jpeg, image/x-png, image/gif'
			},
			action: {
				type: String,
				default: 'http://localhost:8080'
			},
			multiple: {
				type: Boolean,
				default: true,
			},
			method: {
				type: String,
				default: 'post'
			}
		},
		data () {
			return {
				files: [],
				length: 0
			}
		},
		methods: {
			openBrowse () {
				if (this.length == 0) this.$refs.fileInput.click();
			},
			clearQueue () {
				this.$refs.fileInput.value = '';
				this.length = 0;
				this.files = [];
			},
			snedImages () {
				const xhr = new XMLHttpRequest();
				xhr.open(this.method, this.action, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader('Authorization', this.$store.getters.auth);
				xhr.upload.onprogress = e => {
					if (e.total > 0) {
						e.percent = e.loaded / e.total * 100;
					}
					this.$emit('progress', e);
				}
				xhr.onload = e => {
					this.clearQueue();
					if (xhr.status < 200 || xhr.status >= 300) {
						onResponseError(getError(this.action, xhr));
						return this.$emit('fail', xhr);
					}
					return this.$emit('success', getBody(xhr));
				};
				xhr.onerror = e => {
					this.$emit('fail');
				}
				xhr.send(JSON.stringify(this.files));
			},
			onChange () {
				const input = this.$refs.fileInput;
				const files = input.files;
				this.length = files.length;
				const self = this;
				for (const file of files) {
					const reader = new FileReader();
					reader.onload = (function (file){
						self.$emit('queue', self.files.length, self.length);
						return function (e) {
							self.files.push({
								body: this.result,
								name: file.name,
								type: file.type
							});
							if (self.files.length == self.length) {
							  self.snedImages();
							}
						};
					})(file);

					reader.onerror = (function (file){
						return function (e) {
							self.clearQueue();
						};
					})(file);

					reader.readAsDataURL(file);
				}
			}
		}
	}
</script>
