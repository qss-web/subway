<template>
    <div class="popup-wrapper">
        <v-chart v-show="this.isFull ==false && this.test.length != 0" :id="id01" :option="option" :styleObject="styleObject01"></v-chart>
        <v-chart v-show="this.isFull && this.test.length != 0" :id="id02" :option="option" :styleObject="styleObject02"></v-chart>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                // isShow01: true,
                // isShow02: false,
                id01: 'todayAlarm01',
                id02: 'todayAlarm02',
                styleObject01: {
                    width: 100 + '%',
                    height: 100 + '%'
                },
                styleObject02: {
                    width: 100 + '%',
                    height: 9.9 + 'rem'
                },
                option: {
                    chart: {
                        type: 'spline', //指定图表的类型
                        backgroundColor: '#232427', //背景色
                        margin: [100, 120, 80, 120],
                        borderColor: '#007878',
                        borderWidth: '1'
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: '工艺数据', //指定图表标题
                        style: {
                            color: '#fff'
                        },
                        y: 30
                    },
                    xAxis: {
                        tickInterval: 66,
                        labels: {
                            x: 50,//调节x偏移
                            formatter: function() {
                                return this.value.substring(0, 10);
                            },
                            style: {
                                color: '#fff'
                            }
                        },
                        lineColor: '#007878',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#007878'
                    },
                    yAxis: {
                        title: {
                            text: '',
                            align: 'high',
                            style: { color: '#fff' },
                            offset: 0,
                            rotation: 0,
                            y: -16
                        },
                        gridLineColor: '#007878',
                        labels: {
                            style: {
                                color: '#fff',
                                fontSize: '0.2rem'
                            },
                            align: 'center', //标签居中对齐
                            y: 5
                        },
                        lineColor: '#007878',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#007878'
                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true
                        // 时间格式化字符
                        // 默认会根据当前的数据点间隔取对应的值
                        // 当前图表中数据点间隔为 1天，所以配置 day 值即可
                        // dateTimeLabelFormats: {
                        //     day: '%Y-%m-%d'
                        // }
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            maxPointWidth: 46
                        }
                    },
                    series: [{
                        color: '#007878',
                        data: [],
                        name: '测点值'
                    }],
                    legend: {
                        enabled: false
                    },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#474740",
                            fontSize: '0.2rem',
                            fontWeight: 'normal'
                        }
                    }
                },
                test: [],
                test2: []
            };
        },
        watch: {
        },
        computed: {
            ...mapState(['warnChart', 'itemObj'])
        },
        props: ['isFull'],
        created() {
            if(this.warnChart.unit) {
                this.option.yAxis.title.text = '[' + this.warnChart.unit + ']';
            } else {
                this.option.yAxis.title.text = '[ ]';
            }

            this.option.title.text = this.itemObj.pointName + '历史趋势图';
            this.warnChart.reslist.forEach(item => {
                this.test.push(parseFloat(item.value));
                this.test2.push(item.date);
            });
            this.option.series[0].data = this.test;
            this.option.xAxis.categories = this.test2;
        }
    };
</script>
>
<style lang="less" scoped>
    .popup-wrapper {
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        // .popup-content {
        //     position: absolute;
        //     top: 50%;
        //     left: 50%;
        //     transform: translate(-50%, -50%);
        // }
    }
</style>
