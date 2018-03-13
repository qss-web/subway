<template>
    <div class="txt-center">
        <v-chart v-bind:id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'time', 'showData'],
        data() {
            return {
                styleObject: {
                    width: '3rem',
                    height: '3rem'
                },
                option: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: this.title,
                        verticalAlign: 'bottom',
                        style: {
                            color: '#63869e',
                            fontSize: '0.2rem'
                        },
                        y: 10
                    },
                    pane: {
                        center: ['50%', '50%'],
                        size: '80%',
                        startAngle: -10,
                        endAngle: 350,
                        background: {
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                            innerRadius: '70%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    yAxis: {
                        lineWidth: 0,
                        minorTickInterval: null,
                        minorTickWidth: 1,
                        tickWidth: 0,
                        labels: {
                            enabled: false
                        },
                        min: 0,
                        max: 360
                    },
                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: -25,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        data: this.showData,
                        dataLabels: {
                            format: `<div style="text-align:center">
                                        <span style="font-size:0.28rem; font-weight:normal; color:#63869e">`+ this.time + `</span>
                                    </div>`,
                            borderWidth: 0
                        },
                        innerRadius: 70,
                        radius: 90
                    }],
                    legend: {
                        enabled: false
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

