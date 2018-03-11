<template>
    <div class="alarm-event">
        <v-chart :id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                id: 'mineAlarmEvent',
                styleObject: {
                    width: '100%',
                    height: '100%'
                },
                option: {
                    chart: {
                        type: 'area', //指定图表的类型
                        backgroundColor: '#85919a' //背景色
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
                        type: 'category',
                        // categories: ['自动扶梯', '风机', '站台门'],
                        labels: {
                            style: {
                                color: '#474740',
                                fontSize: '0.2rem'
                            },
                            align: 'center', //标签居中对齐
                            y: 30
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
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            maxPointWidth: 46
                        }
                    },
                    series: [{
                        color: '#d06c6a',
                        name: '本月',
                        data: [2, 2, 1, 2, 1, 5, 4]
                    }, {
                        color: '#8dbac0',
                        name: '上月',
                        data: [30, 100, 26, 87, 44, 67, 11, 32, 110, 235, 369, 640]
                    }],
                    legend: {
                        enabled: false
                    },
                    labels: {
                        style: {
                            color: "#474740",
                            fontSize: '0.2rem',
                            fontWeight: 'normal'
                        }
                    }
                }

            };
        },
        methods: {
        }
    };
</script>

<style lang="less" scoped>
    .alarm-event {
        border: 1px solid #aaa;
        position: absolute;
        top: 0;
        left: 0.1rem;
        right: 0.1rem;
        bottom: 0.1rem;
    }
</style>
