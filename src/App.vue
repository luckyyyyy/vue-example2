<template>
	<div v-if="token" class="main" v-loading="fullLoading" element-loading-text="拼命加载中">
		<MainPage></MainPage>
	</div>
	<FirstPage v-else></FirstPage>
</template>
<script>
import FirstPage from './components/main/first-page.vue'
import MainPage from './components/main/Main-page.vue'

export default {
	components: {
		MainPage,
		FirstPage
	},
	data () {
		return {
		}
	},
	computed: {
		fullLoading () {
			return this.$store.state.sign_out.lock;
		},
		token () {
			return this.$store.state.token;
		},
	},
	beforeCreate () {
		this.$store.dispatch('SIGNIN_CHECK');
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
	.main {
		height: 100%;
		position: relative;
	}
</style>















