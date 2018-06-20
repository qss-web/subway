<template>
    <div class="popup-wrapper">
        {{testFull}}
        <v-chart v-if="this.isShow01 && this.testFull ==false && this.test.length != 0" :id="id" :option="option" :styleObject="styleObject01"></v-chart>
        <v-chart v-if="this.isShow02 &&this.testFull && this.test.length != 0" :id="id" :option="option" :styleObject="styleObject02"></v-chart>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                isShow01: false,
                isShow02: false,
                id: 'todayAlarm',
                styleObject01: {
                    width: 100 + '%',
                    height: 100 + '%'
                },
                styleObject02: {
                    width: 100 + '%',
                    height: 600 + 'px'
                },
                option: {
                    chart: {
                        type: 'spline', //指定图表的类型
                        backgroundColor: '#e5e8f7', //背景色
                        margin: [100, 100, 80, 100]
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: '工艺数据' //指定图表标题
                    },
                    xAxis: {
                        tickInterval: 66,
                        labels: {
                            x: 50,//调节x偏移
                            formatter: function() {
                                return this.value.substring(0, 10);
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: null //指定y轴的标题
                        },
                        gridLineColor: '#7281a3',
                        labels: {
                            style: {
                                color: '#474740',
                                fontSize: '0.2rem'
                            },
                            align: 'center', //标签居中对齐
                            y: 5
                        },
                        lineColor: '#7281a3',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#7281a3'
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
                        color: '#d06c6a',
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
            testFull() {
                if(this.testFull) {
                    debugger;
                    this.isShow01 = false;
                    this.isShow02 = true;
                } else {
                    debugger;
                    this.isShow01 = true;
                    this.isShow02 = false;
                }
            }
        },
        computed: {
            ...mapState(['warnChart', 'itemObj'])
        },
        props: ['testFull'],
        created() {
            this.option.title.text = this.itemObj.pointName + '历史趋势图';
            this.warnChart.forEach(item => {
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
