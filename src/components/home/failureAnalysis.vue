<template>
    <v-chart v-if="pointData.length != 0" :id="id" :option="option" :styleObject="styleObject"></v-chart>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                pointData: [],//点
                id: 'failureAnalysis',
                styleObject: {
                    width: 4.3 + 'rem',
                    height: 2.7 + 'rem'
                },
                option: {
                    chart: {
                        type: 'scatter', //指定图表的类型
                        backgroundColor: '#000', //背景色
                        plotBackgroundColor: '#000', //绘图背景色
                        margin: [10, 10, 40, 50],
                        borderWidth: 50,
                        borderColor: '#575b6c'
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
                        labels: {
                            format: '{value} h', //标签格式化
                            style: {
                                fontSize: 10,
                                color: '#fff'
                            },
                            align: 'center' //标签居中对齐
                        },
                        gridLineWidth: 1, //网格线宽度
                        lineWidth: 0, //轴线宽度
                        tickWidth: 0, //刻度线宽度
                        showFirstLabel: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: null //指定y轴的标题
                        },
                        labels: {
                            style: {
                                fontSize: 10,
                                color: '#fff'
                            },
                            align: 'center' //标签居中对齐
                        }
                    },
                    // 数据列配置
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 6
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '{series.name} {point.code}<br>故障平均发生时间：{point.x}h<br>故障发生次数：{point.y}次'
                            }
                        }
                    },
                    series: [
                        {
                            //指定数据列
                            name: '站台门',
                            color: 'red',
                            data: [] //数据
                        },
                        {
                            //指定数据列
                            name: '自动扶梯',
                            color: 'yellow',
                            data: [], //数据
                            marker: {
                                symbol: 'circle'
                            }
                        },
                        {
                            //指定数据列
                            name: '风机',
                            color: 'green',
                            data: [], //数据
                            marker: {
                                symbol: 'circle'
                            }
                        }
                    ],
                    legend: { enabled: false },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#fff",
                            fontSize: '12px',
                            fontWeight: 'normal'
                        },
                        items: [{                       // items 数组，可以设置多个标签
                            html: '',
                            style: {                    // 标签样式，会继承和重写上层全局样式
                                left: '0px',
                                top: '0px',
                                color: 'red',
                                fontSize: '12px',
                                fontWeight: 'normal',
                                fontFamily: '',
                                transform: 'rotate(90deg)'
                            }
                        }]
                    }
                }
            };
        },
        created() {
            this.getFailureAnalysisFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getFailureAnalysisFn() {
                this._getInfo({
                    ops: {},
                    api: 'failureAnalysis',
                    callback: res => {
                        this.pointData = res;
                        res.forEach(item => {
                            if(item.type == 0) {
                                //站台门
                                this.option.series[0].data = item.value;

                            } else if(item.type == 7) {
                                //自动扶梯
                                this.option.series[1].data = item.value;

                            } else {
                                //8 = 风机
                                this.option.series[2].data = item.value;
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>

