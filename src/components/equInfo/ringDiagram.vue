<template>
    <div class="txt-center">
        <v-chart v-bind:id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        props: ['id', 'title', 'time', 'showData', 'size', 'setStyle'],
        data() {
            return {
                styleObject: this.size,
                option: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: this.title,
                        verticalAlign: 'bottom',
                        style: this.setStyle,
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
                                y: -16,
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
                            format: `<div style="text-align:center;">
                                        <span style="font-size:`+ this.setStyle.font + ` ;font-weight:normal; color:` + this.setStyle.color + `">` + this.time + `</span>
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

