<template>
    <div class="txt-center">
        <v-chart v-bind:id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'chartData'],
        data() {
            return {
                styleObject: {
                    width: '4rem',
                    height: '2rem'
                },
                option: {
                    chart: {
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        backgroundColor: 'transparent',
                        marginRight: 100
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: '' //指定图表标题
                    },
                    legend: {
                        layout: 'vertical',
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        squareSymbol: false,
                        symbolWidth: 24,
                        symbolHeight: 12,
                        symbolRadius: 4,
                        x: 0,
                        y: 0,
                        symbolPadding: 3,
                        itemStyle: {
                            color: '#0f263c',
                            fontWeight: 'normal',
                            fontSize: '14'
                        }
                    },
                    xAxis: {
                        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    series: this.chartData,
                    plotOptions: {
                        series: {
                            allowPointSelect: false,
                            borderColor: 'none'
                        },
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    }
                }
            };
        }
    };
</script>

<style lang="less" scoped>
    .title {
        text-align: center;
        color: #fff;
        font-size: 0.18rem;
    }
</style>

