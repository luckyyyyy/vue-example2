<template>

	<div>
		<h1>todo</h1>
		<h1>{{ count }}</h1>
		<h1>{{ count2 }}</h1>
		<el-button @click="a">click</el-button>

		<p v-for="item in list">{{ item.name }}</p>
		<el-button @click="append">append</el-button>
	</div>
</template>


<script>
	export default {
		data () {
			return {
				count: 1,
				count2: 9999,
				list: [
					{ name: 'a' },
					{ name: 'b' },
					{ name: 'c' },
					{ name: 'd' },
					{ name: 'e' },
					{ name: 'f' },
				]
			}
		},
		mounted () {
			console.log('loaded');
			setInterval(() => {
				this.count2--;
			}, 1000);
		},
		methods: {
			a () {
				this.count++;
			},
			append () {
				this.list.push({ name: 'append' })
			}
		}
	}
</script>
