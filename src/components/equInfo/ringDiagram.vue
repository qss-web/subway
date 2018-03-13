<template>
    <div class="txt-center">
        <v-chart :id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'time'],
        data() {
            return {
                styleObject: {
                    width: '1.8rem',
                    height: '1.8rem'
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
                            fontSize: '0.2rem'
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
                        startAngle: -135,
                        endAngle: 135,
                        background: [{
                            backgroundColor: 'transparent',
                            borderWidth: 0
                        }]
                    },
                    yAxis: {
                        lineWidth: 0,
                        min: 0,
                        max: 100,
                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 4,
                        minorTickPosition: 'inside',
                        minorTickColor: '#ccc',
                        tickPixelInterval: 30,
                        tickWidth: 1,
                        tickPosition: 'inside',
                        tickLength: 10,
                        tickColor: '#ccc',
                        labels: {
                            style: {
                                fontSize: 8,
                                padding: 1
                            }
                        },
                        title: {
                            text: null
                        },
                        plotBands: [{
                            from: 0,
                            to: 20,
                            color: '#91c7ae'
                        }, {
                            from: 20,
                            to: 80,
                            color: '#63869e'
                        }, {
                            from: 80,
                            to: 100,
                            color: '#c23531'
                        }]
                    },
                    series: [{
                        name: 'Speed',
                        data: [this.time],
                        dataLabels: {
                            format: `<div style="text-align:center;">
                                        <span style="font-size:0.12rem;color:#63869e;">${this.time}%</span>
                                    </div>`,
                            borderWidth: 0
                        }
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

