<template>
    <div class="txt-center">
        <v-chart :id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'percent'],
        data() {
            return {
                styleObject: {
                    width: '3.3rem',
                    height: '3.3rem'
                },
                option: {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: this.title,
                        verticalAlign: 'bottom',
                        style: {
                            color: '#fff',
                            fontSize: '0.24rem'
                        },
                        y: 0
                    },
                    tooltip: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    pane: {
                        center: ['50%', '45%'],
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: 'transparent',
                            borderWidth: 0
                        }]
                    },
                    yAxis: {
                        lineWidth: 0,
                        min: 0,
                        max: 24,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 4,
                        minorTickPosition: 'inside',
                        minorTickColor: '#ccc',
                        tickPixelInterval: 50,
                        tickWidth: 1,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#ccc',
                        labels: {
                            distance: -32,
                            style: {
                                fontSize: 12,
                                // padding: 8,
                                color: '#fff'
                            }
                        },
                        title: {
                            text: null
                        },
                        plotBands: [{
                            from: 0,
                            to: 2,
                            color: '#91c7ae',
                            innerRadius: '100%',
                            outerRadius: '86%'
                        }, {
                            from: 2,
                            to: 10,
                            color: '#63869e',
                            innerRadius: '100%',
                            outerRadius: '86%'
                        }, {
                            from: 10,
                            to: 24,
                            color: '#c23531',
                            innerRadius: '100%',
                            outerRadius: '86%'
                        }]
                    },
                    series: [{
                        name: 'Speed',
                        data: [this.percent],
                        dataLabels: {
                            format: `<div style="text-align:center;">
                                        <span style="font-size:0.24rem;color:#fff;">${this.percent}</span>
                                    </div>`,
                            borderWidth: 0
                        },
                        innerRadius: 76
                    }],
                    plotOptions: {
                        gauge: {
                            dataLabels: {
                                useHTML: true
                            },
                            dial: {
                                radius: '70%',
                                backgroundColor: '#63869e',
                                borderColor: 'red',
                                borderWidth: 0,
                                baseWidth: 5,
                                topWidth: 1,
                                baseLength: '0%',
                                rearLength: '10%'
                            },
                            pivot: {
                                radius: 5,
                                borderWidth: 0,
                                backgroundColor: '#63869e'
                            }
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

