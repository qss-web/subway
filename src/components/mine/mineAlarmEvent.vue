<template>
    <div class="alarm-event">
        <v-chart v-if="lastMonth.length!=0" :id="id" :option="option" :styleObject="styleObject"></v-chart>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentMonth: [],
                lastMonth: [],
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
                        categories: [1, 2, 3, 4, 5, 6, 7],
                        labels: {
                            style: {
                                fontSize: 10,
                                color: '#fff'
                            },
                            align: 'center' //标签居中对齐
                        },
                        lineWidth: 1, //轴线宽度
                        lineColor: '#5f666b',
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
                        },
                        lineWidth: 1,
                        lineColor: '#5f666b',
                        tickWidth: 0,
                        gridLineColor: 'rgba(255,255,255,0.5)'
                    },
                    plotOptions: {
                        area: {
                            marker: {
                                symbol: 'circle',
                                radius: 1,
                                fillColor: '#fff'
                            }
                        }
                    },
                    series: [{
                        color: '#8dbac0',
                        name: '本月',
                        data: []
                    }, {
                        color: '#d06c6a',
                        name: '上月',
                        data: []
                    }],
                    // 数据提示框
                    tooltip: {
                        // pointFormatter: function() {
                        //     return this.y;
                        // }
                        headerFormat: ''
                    },
                    legend: {
                        enabled: false
                    }
                }

            };
        },
        created() {
            this.getWarningEventsFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getWarningEventsFn() {
                this._getInfo({
                    ops: {},
                    api: 'warningEvents',
                    callback: res => {
                        res.current.forEach(item => {
                            this.currentMonth.push(item[1]);
                        });
                        res.last.forEach(item => {
                            this.lastMonth.push(item[1]);
                        });
                        this.option.series[1].data = this.lastMonth;
                        this.option.series[0].data = this.currentMonth;
                    }
                });
            }
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
