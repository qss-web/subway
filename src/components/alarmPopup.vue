<template>
    <div class="popup-wrapper">
        <v-chart :id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                id: 'todayAlarm',
                styleObject: {
                    width: 100 + '%',
                    height: 100 + '%'
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
                        text: '' //指定图表标题
                    },
                    xAxis: {
                        title: {
                            text: null
                        },
                        type: 'category',
                        categories: ['哈哈', '嘿嘿', 3, 4, 5, 6, 7],
                        labels: {
                            // style: {
                            //     color: '#474740',
                            //     fontSize: '0.2rem'
                            // },
                            // align: 'center', //标签居中对齐
                            // y: 30
                            enabled: false
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
                        data: [10, 12, 12, 13, 14, 51, 61]
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
                }
            };
        },
        computed: {
            ...mapState(['warnChart'])
        },
        created() {
            this.option.series[0].data = this.warnChart;
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
