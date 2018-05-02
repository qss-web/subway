<template>
    <v-chart :id="id" v-if="todayInspectionRate.length != 0" :option="option" :styleObject="styleObject"></v-chart>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                id: 'todayPatrol',
                styleObject: {
                    width: 4.3 + 'rem',
                    height: 2.7 + 'rem'
                },
                todayInspectionRate: [],
                nameShow: [],
                valueShow: [],
                option: {
                    chart: {
                        type: 'bar', //指定图表的类型
                        backgroundColor: '#575b6c' //背景色
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
                        categories: '',
                        labels: {
                            style: {
                                color: '#fff'
                            },
                            align: 'center' //标签居中对齐
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
                        // categories: [],
                        gridLineColor: '#2f4554',
                        labels: {
                            // style: {
                            //     color: '#fff'
                            // },
                            // align: 'center' //标签居中对齐
                            enabled: false
                        },
                        lineColor: '#2f4554',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#2f4554',
                        showLastLabel: false,
                        tickPositions: [0, 50, 100]
                    },
                    plotOptions: {
                        bar: {
                            borderWidth: 0,
                            maxPointWidth: 30
                        },
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}%',
                                color: '#fff',
                                fontWeight: 'normal'
                            },
                            cursor: 'pointer',
                            events: {}
                        }
                    },
                    series: [
                        {
                            //指定数据列
                            name: ' ',
                            color: '#2f4554',
                            data: ''//数据
                        }
                    ],
                    legend: {
                        enabled: false
                    },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#fff",
                            fontSize: '12px',
                            fontWeight: 'normal'
                        },
                        items: [{                       // items 数组，可以设置多个标签
                            // html: '(%)',
                            style: {                    // 标签样式，会继承和重写上层全局样式
                                top: 228,
                                left: 300,
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: 'normal',
                                textShadow: '1px 1px 1px black'
                            }
                        }]
                    }
                },
                timeOut: ''
            };
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getBacklogCountFn();
        },
        destroyed() {
            clearTimeout(this.timeOut);
        },
        methods: {
            ...mapActions(['_getInfo']),
            getBacklogCountFn() {
                this._getInfo({
                    ops: {},
                    api: 'checkRatio',
                    callback: res => {
                        this.todayInspectionRate = res;
                        this.todayInspectionRate.forEach(item => {
                            this.nameShow.push(item.name);
                            this.valueShow.push(item.value);
                        });
                        this.option.xAxis.categories = this.nameShow;
                        this.option.series[0].data = this.valueShow;
                        this.timeOut = setTimeout(() => {
                            this.getBacklogCountFn();
                        }, 60000);

                        var _this = this;

                        this.option.plotOptions.series.events.click = function(event) {
                            if(event.point.index == 0) {
                                //77为自定义的
                                _this.$router.push({ path: 'inspect', query: { 'equKey': '77' } });
                            } else if(event.point.index == 1) {
                                //自动扶梯
                                _this.$router.push({ path: 'inspect', query: { 'equKey': '7' } });
                            } else if(event.point.index == 2) {
                                //站台门
                                _this.$router.push({ path: 'inspect', query: { 'equKey': '0' } });
                            } else {
                                //风机
                                _this.$router.push({ path: 'inspect', query: { 'equKey': '8' } });
                            }
                        };
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>

</style>

