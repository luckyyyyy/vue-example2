<template>
	<div class="container">
		<div class="container-wrap">
			<div class="overview-box">
				<Card :bordered="false" dis-hover class="border-r">
					<p slot="title" class="title">直播概况</p>
					<div class="content">
							<p>观看人次（PV）：<span>1560人</span></p>
							<p>用户量（UV）：<span>1000人</span></p>
							<p>直播时长：<span>65分钟</span></p>
							<p>观看时长：<span>65分钟</span></p>
					</div>
				</Card>
			</div>
			<div class="overview-box">
				<Card :bordered="false" dis-hover class="border-r">
					<p slot="title" class="title">在线人数分布曲线</p>
					<div>
						<highcharts :options="count_data" ref="highcharts"></highcharts>
					</div>
				</Card>
			</div>
			<div class="overview-box">
				<Card :bordered="false" dis-hover class="border-r">
					<p slot="title" class="title">观众地域分布</p>
					<div>
						<highmaps :options="territory_data"></highmaps>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock'
import loadMap from 'highcharts/modules/map';
loadMap(Highcharts);
Vue.use(VueHighcharts, {
	Highcharts: Highcharts
});
import cn_map from '../../options/cn-all.json'
import translate_zn from '../../options/hignmap-map-zh.json'
export default {

		data () {
			return {
				count_data: {
					title: {
						text: '在线人数分布曲线',
						x: -20 //center
					},
					xAxis: {
						categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
							'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
						]
					},
					yAxis: {
						title: {
							text: 'count (个)'
						},
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						valueSuffix: '个'
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle',
						borderWidth: 0
					},
					series: [{
						name: '人数',
						data: [1900, 4220, 7120, 4033, 3300, 2230, 8900, 1280, 390]
					}]
				},
				territory_data: {
					chart: {
						// borderWidth: 1,
						height: 700
					},
					title: {
						text: '地域分布'
					},
					legend: {
						layout: 'vertical',
						borderWidth: 0,
						backgroundColor: 'rgba(255, 255, 255, 0)',
						floating: true,
						verticalAlign: 'right',
						y: 200,
						x: 500
					},
					mapNavigation: {
						enabled: true
					},
					colorAxis: {
						min: 1,
						type: 'logarithmic',
						stops: [
							[0, '#EFEFFF'],
							[0.5, '#76B3E2'],
							[1, '#5789D7']
						]
					},
					series: [{
						animation: {
							duration: 1000
						},
						data: [
							['cn-yn', 10],
							['cn-gd', 40],
							['cn-zj', 1000],
							['cn-js', 320],
							['cn-jl', 20],
							['cn-fj', 50],
							['cn-bj', 200],
							['cn-xj', 2],
							['cn-sx', 10],
							['cn-cq', 200]
						],
						joinBy: 'hc-key',
						states: {
							hover: {
								color: '#a4edba'
							}
						},
						mapData: cn_map,
						dataLabels: {
							enabled: true,
							color: '#000',
							formatter: function() {
								if (this.point.value) {
									return translate_zn[this.point.name];
								}
							}
						},
						tooltip: {
							headerFormat: '',
							pointFormat: '{point.value}'
						}
					}]
				}
			}
		},
		components: {

		},
		computed: {

		},
		methods: {}
}
</script>
<style scoped lang="less">
	@import "../../assets/styles/views/live/data.less";
</style>
