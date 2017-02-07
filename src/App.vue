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
			// console.log(this.$store.state)
			if (this.$route.name) {
				const requiresAuth = this.$route.meta.requiresAuth;
				if (!this.$store.state.token) {
					if (requiresAuth) {
						this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
					}
				} else {
					if (!requiresAuth) {
						if (this.$route.query.redirect) {
							this.$router.push({ path: this.$route.query.redirect })
						} else {
							this.$router.push({ name: 'index' })
						}
					}
				}
			}
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















