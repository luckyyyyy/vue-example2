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
	import { mapGetters } from 'vuex'
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
			type: {
				type: Number,
				default: 2
			},
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
				length: 0,
				size: 0
			}
		},
		computed: {
			...mapGetters('user', ['auth']),
			...mapGetters('channel', ['channelID'])
		},
		methods: {
			openBrowse () {
				if (this.length == 0) this.$refs.fileInput.click();
			},
			clearQueue () {
				this.$refs.fileInput.value = '';
				this.length = 0;
				this.size = 0;
				this.files = [];
			},
			snedImages () {
				if (this.size > 1024e3 * 20) {
					this.$Message.error('您一次性上传的图片总大小超过最大限制，请控制在15MB。');
					console.log(this.size / 1024e3);
					this.$emit('fail');
					return this.clearQueue();
				}
				const xhr = new XMLHttpRequest();
				xhr.open(this.method, this.action, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader('Authorization', this.auth);
				xhr.setRequestHeader('ChannelID',     this.channelID);
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
					const data = getBody(xhr);
					onResponse({ data }).then(res => {
						return this.$emit('success', res.data);
					}).catch(() => {
						return this.$emit('fail');
					})
				};
				xhr.onerror = e => {
					this.$emit('fail');
				}
				xhr.send(JSON.stringify(this.files));
			},
			onChange () {
				const input = this.$refs.fileInput;
				const files = input.files;
				if (files.length > 20) {
					this.$Message.error(`一次最多只能同时上传20张图片，您选择了${files.length}张照片。`, 5);
					// this.clearQueue();
				} else {
					this.length = files.length;
					for (let i = 0; i < this.length; i++) {
						const file = files.item(i);
						const reader = new FileReader();
						reader.onload = e => {
							this.files.push({
								body: e.target.result,
								name: file.name,
								type: this.type,
							});
							this.size = this.size + e.target.result.length;
							this.$emit('queue', this.files, this.length);
							if (this.files.length == this.length) {
							  this.snedImages();
							}
						}
						reader.onerror = e => {
							this.clearQueue();
						}
						reader.readAsDataURL(file);
					}
				}
			}
		}
	}
</script>
