<template>
    <div class="txt-center">
        <v-chart v-bind:id="ringInfo.id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                styleObject: this.ringInfo.size,
                option: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: this.ringInfo.showInfo.title,
                        verticalAlign: 'bottom',
                        style: {
                            color: '#fff',
                            fontSize: this.ringInfo.showInfo.fontSize
                        },
                        y: 10
                    },
                    pane: {
                        center: ['50%', '45%'],
                        size: '100%',
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
                                y: -18,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        data: [{
                            y: this.ringInfo.value / 100 * 360,
                            color: this.ringInfo.showInfo.color
                        }],
                        dataLabels: {
                            format: `<div style="text-align:center">
                                        <span style="font-size:0.24rem;color:#fff">`+ this.ringInfo.value + `%</span>
                                    </div>`,
                            borderWidth: 0
                        },
                        innerRadius: 60,
                        radius: 90
                    }],
                    legend: {
                        enabled: false
                    }
                }
            };
        },
        props: ['ringInfo']
    };
</script>

<style lang="less" scoped>
    .title {
        text-align: center;
        color: #fff;
        font-size: 0.18rem;
    }
</style>

