<template>
    <div v-bind:class="clickNext?'txt-center':''" v-on:click="goInfoFn">
        <v-chart v-bind:id="ringInfo.id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>

<script>
    export default {
        data() {
            let _this = this;

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
                        enabled: !!this.str,
                        followPointer: true,
                        borderColor: '#000000',
                        formatter: function() {
                            return _this.str;
                        }
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
                            format: `<div style="text-align:center;">
                                        <span style="font-size:0.24rem;color:#fff">`+ this.ringInfo.value + `%</span>
                                    </div>`,
                            borderWidth: 0
                        },
                        innerRadius: 66,
                        radius: 90
                    }],
                    legend: {
                        enabled: false
                    }
                }
            };
        },
        props: ['ringInfo', 'clickNext', 'str'],
        methods: {
            goInfoFn() {
                if(this.clickNext) {
                    this.$router.push('commonDetail');
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .title {
        text-align: center;
        color: #fff;
        font-size: 0.18rem;
    }
    .txt-center {
        cursor: pointer;
    }
</style>

