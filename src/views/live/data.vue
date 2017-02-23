<template>
    <div class="container">
        <div class="overview-box">
            <h2>直播概况</h2>
            <div class="overview-wrapper">
                <div>
                    <p>观看人次（PV）：1560人</p>
                    <p>直播时长：65分钟</p>
                </div>
                <div>
                    <p>用户量（UV）：1000人</p>
                    <p>新增粉丝数：1234人</p>
                </div>
                <div>
                    <p>最高在线人数：1000人</p>
                    <p>新增订单数：345笔</p>
                </div>
                <div>
                    <p>观看时长：65分钟</p>
                    <p>成交金额：¥ 23456.78</p>
                </div>
            </div>
        </div>
        <div class="online-box">
            <h2>在线人数分布曲线</h2>
            <highcharts :options="count_data" ref="highcharts"></highcharts>
        </div>
        <div class="territory-box">
            <h2>观众地域分布</h2>
            <highmaps :options="territory_data"></highmaps>
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
import cn_map from '../../assets/cn-all.json'
import translate_zn from '../../assets/hignmap-map-zh.json'

export default {
    mounted() {},
        data() {
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
                        // enabled: true
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
<style scoped lang='less'>
.container {
    padding: 30px;
    h2 {
        font-size: 12px;
        color: #333;
        background-color: #f7f8fa;
        padding: 4px 16px;
    }
    .overview-wrapper {
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        p {
            color: #666;
        }
    }
    .online-box {
        margin-top: 30px;
    }
    .territory-box {
        margin-top: 30px;
        height: 1000px;
    }
}
</style>
