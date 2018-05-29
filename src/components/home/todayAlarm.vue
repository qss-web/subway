<template>
    <v-chart :id="id" v-if="todayInspectionRate.length != 0" :option="option" :styleObject="styleObject"></v-chart>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                id: 'todayAlarm',
                styleObject: {
                    width: 4.3 + 'rem',
                    height: 2.7 + 'rem'
                },
                todayInspectionRate: [],
                nameShow: [],
                valueShow: [],
                option: {
                    chart: {
                        type: 'column', //指定图表的类型
                        backgroundColor: '#575b6c', //背景色
                        margin: [60, 10, 40, 50]
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: null //指定图表标题
                    },
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: [],
                        labels: {
                            style: {
                                color: '#d4af33'
                            },
                            align: 'center' //标签居中对齐
                        },
                        lineWidth: 0, //轴线宽度
                        tickWidth: 0, //刻度线宽度
                        showFirstLabel: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: null //指定y轴的标题
                        },
                        gridLineColor: '#7281a3',
                        // labels: {
                        //     style: {
                        //         color: '#d4af33'
                        //     },
                        //     align: 'center' //标签居中对齐
                        // },
                        labels: {
                            enabled: false
                        },
                        lineColor: '#7281a3',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#7281a3'
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            maxPointWidth: 26,
                            dataLabels: {
                                align: 'center',
                                enabled: true,
                                color: '#fff'
                            },
                            cursor: 'pointer',
                            events: {}
                        }
                    },
                    series: [
                        // {
                        //     //指定数据列
                        //     name: '本月',
                        //     color: '#88abda',
                        //     data: [25, 12.5, 12] //数据
                        // },
                        {
                            //指定数据列
                            name: '今日',
                            color: '#006699',
                            data: [] //数据
                        }
                    ],
                    legend: {
                        // verticalAlign: 'top',
                        // symbolRadius: 0,
                        // itemStyle: {
                        //     color: '#fff'
                        // },
                        // align: 'right'
                        enabled: false
                    },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#fff",
                            fontSize: '12px',
                            fontWeight: 'normal'
                        },
                        items: [{                       // items 数组，可以设置多个标签
                            html: '( 次 )',
                            style: {                    // 标签样式，会继承和重写上层全局样式
                                left: -35,
                                top: -40,
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: 'normal',
                                textShadow: '1px 1px 1px black'
                            }
                        }]
                    }
                },
                timeOut: ''
            };
        },
        computed: {
            ...mapState(['isTimeOut'])
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getTodayAlarmTopFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getTodayAlarmTopFn() {
                this._getInfo({
                    ops: {},
                    api: 'todayAlarmTop',
                    callback: res => {
                        this.todayInspectionRate = res;
                        this.todayInspectionRate.forEach(item => {
                            this.nameShow.push(item.name);
                            this.valueShow.push(item.value);
                        });
                        this.option.xAxis.categories = this.nameShow;
                        this.option.series[0].data = this.valueShow;
                        var _this = this;

                        this.option.plotOptions.series.events.click = function(event) {
                            if(event.point.index == 0) {
                                //自动扶梯
                                _this.$router.push({ path: 'alarmStatistics', query: { 'equKey': '7' } });
                            } else if(event.point.index == 1) {
                                //风机
                                _this.$router.push({ path: 'alarmStatistics', query: { 'equKey': '8' } });
                            } else {
                                //站台门
                                _this.$router.push({ path: 'alarmStatistics', query: { 'equKey': '0' } });
                            }
                        };
                        if(this.isTimeOut) {
                            this.timeOut = setTimeout(() => {
                                this.getTodayAlarmTopFn();
                            }, 2000);
                        } else {
                            clearTimeout(this.timeOut);
                        }

                    }
                });
            }

        }
    };
</script>

<style lang="less" scoped>
</style>

