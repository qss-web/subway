<template>
    <div class="flex todolist">
        <v-chart v-if="backlogInfo.warnInfo" :id="chart1.id" :option="chart1.option" :styleObject="styleObject"></v-chart>
        <v-chart v-if="backlogInfo.faultInfo" :id="chart2.id" :option="chart2.option" :styleObject="styleObject"></v-chart>
        <v-chart v-if="backlogInfo.checkInfo" :id="chart3.id" :option="chart3.option" :styleObject="styleObject"></v-chart>
    </div>

</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                backlogInfo: {},
                // id: 'mineTodoList1',
                styleObject: {
                    width: '100%',
                    height: '100%'
                },
                option: {
                    // 图标配置
                    chart: {
                        type: 'column', // 指定图表的类型
                        backgroundColor: 'transparent' // 背景色
                    },
                    // 面板配置项
                    pane: {},
                    // 版权信息
                    credits: { enabled: false }, // 去掉地址
                    // 图表标题
                    title: {
                        // text: `<div class="chart-title">
                        //             <span>今日预警信息</span><br />
                        //             <span class="count">21</span>
                        //             <span class="unit">条</span>
                        //         </div>`, // 指定图表标题
                        useHTML: true
                    },
                    // x轴
                    xAxis: {
                        visible: true, // 是否显示x轴
                        title: { text: null }, // 标题
                        categories: ['电梯系统', '风机系统', '站台门系统'], //分类
                        labels: {
                            enalbed: true, // 是否显示轴标签
                            style: { // label样式
                                color: '#000',
                                fontSize: '0.12rem'
                            },
                            useHTML: true,
                            align: 'center' // 标签对齐方式
                        },
                        lineWidth: 0, // 轴线宽度
                        tickWidth: 0, // 刻度线宽度
                        showFirstLabel: true, // 是否显示第一个label
                        showLastLabel: true // 是否显示最后一个label
                    },
                    // y轴
                    yAxis: {
                        visible: false, // 是否显示y轴
                        title: { text: null }, // 指定y轴的标题
                        gridLineColor: '#7281a3', // 网格线颜色
                        labels: { // label样式
                            style: {
                                color: '#d4af33'
                            },
                            align: 'center' // 标签居中对齐
                        },
                        lineWidth: 0, // 轴线宽度
                        lineColor: '#7281a3', // 轴线颜色
                        tickWidth: 0, // 刻度线宽度
                        tickColor: '#7281a3' // 刻度线颜色
                    },
                    // 数据列配置
                    plotOptions: {
                        column: {
                            maxPointWidth: 40, // 每条数据项的宽度
                            borderWidth: 0, // 数据项边框宽度
                            shadow: {// 数据项阴影
                                offsetX: 0
                            },
                            groupPadding: 0.08,
                            dataLabels: { //数据项文本
                            }
                        }
                    },
                    // 数据提示框
                    tooltip: {
                        followPointer: true // 跟随鼠标
                    },
                    // 图例
                    legend: {
                        enabled: false, // 是否显示图例
                        verticalAlign: 'top', // 图例垂直上对齐
                        symbolRadius: 0, // 图标圆角
                        itemStyle: { // 图例项样式
                            color: '#fff'
                        },
                        align: 'right' // 图例水平右对齐
                    }
                }
            };
        },
        computed: {
            chart1() {
                return {
                    id: 'mineTodolist1',
                    option: {
                        ...this.option,
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    format: '{y}条',
                                    enabled: true,
                                    align: 'center',
                                    borderWidth: 0,
                                    useHTML: true,
                                    style: {
                                        fontSize: '0.18rem'
                                    }
                                }
                            },
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: () => {
                                        this.$router.push('/alarmListDay');
                                    }
                                }
                            }
                        },
                        title: {
                            ...this.option.title,
                            text: `<div class="chart-title today-alarm">
                                    <span>今日预警信息</span><br />
                                    <span class="count">`+ this.backlogInfo.warnInfo.total + `</span>
                                    <span class="unit">条</span>
                                </div>` // 指定图表标题
                        },
                        series: [
                            {
                                //指定数据列
                                name: '电梯系统',
                                color: '#2f4554',
                                data: [{
                                    name: '电梯系统',
                                    y: this.backlogInfo.warnInfo.data[0],
                                    color: '#2f4554',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#2f4554'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.warnInfo.data[1],
                                    name: '风机系统',
                                    color: '#737f9d',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#737f9d'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.warnInfo.data[2],
                                    name: '站台门系统',
                                    color: '#cfa972',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#cfa972'
                                        },
                                        overflow: true
                                    }
                                }]
                            }
                        ],
                        // 数据提示框
                        tooltip: {
                            ...this.option.tooltip,
                            headerFormat: '今日预警信息<br />',
                            pointFormat: '{point.name}{point.y}条'
                        }
                    }
                };
            },
            chart2() {
                return {
                    id: 'mineTodolist2',
                    option: {
                        ...this.option,
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    format: '{y}台',
                                    enabled: true,
                                    align: 'center',
                                    borderWidth: 0,
                                    useHTML: true,
                                    style: {
                                        fontSize: '0.18rem'
                                    }
                                }
                            },
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: () => {
                                        this.$router.push('/backlog');
                                    }
                                }
                            }
                        },
                        title: {
                            ...this.option.title,
                            text: `<div class="chart-title device-failure">
                                    <span>当前设备故障</span><br />
                                    <span class="count">`+ this.backlogInfo.faultInfo.total + `</span>
                                    <span class="unit">台</span>
                                </div>` // 指定图表标题
                        },
                        // 数据列
                        series: [
                            {
                                //指定数据列
                                name: '电梯系统',
                                color: '#2f4554',
                                data: [{
                                    y: this.backlogInfo.faultInfo.data[0],
                                    name: '电梯系统',
                                    color: '#2f4554',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#2f4554'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.faultInfo.data[1],
                                    name: '风机系统',
                                    color: '#737f9d',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#737f9d'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.faultInfo.data[2],
                                    name: '站台门系统',
                                    color: '#cfa972',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#cfa972'
                                        },
                                        overflow: true
                                    }
                                }]
                            }
                        ],
                        // 数据提示框
                        tooltip: {
                            ...this.option.tooltip,
                            headerFormat: '当前设备故障<br />',
                            pointFormat: '{point.name}{point.y}台'
                        }
                    }
                };
            },
            chart3() {
                return {
                    id: 'mineTodolist3',
                    option: {
                        ...this.option,
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    format: '{y}%',
                                    enabled: true,
                                    align: 'center',
                                    borderWidth: 0,
                                    useHTML: true,
                                    style: {
                                        fontSize: '0.18rem'
                                    }
                                }
                            },
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: () => {
                                        this.$router.push('/inspect');
                                    }
                                }
                            }
                        },
                        title: {
                            ...this.option.title,
                            text: `<div class="chart-title today-patrol">
                                    <span>今日巡检比例</span><br />
                                    <span class="count">`+ this.backlogInfo.checkInfo.total + `</span>
                                </div>` // 指定图表标题
                        },
                        // 数据列
                        series: [
                            {
                                //指定数据列
                                name: '电梯系统',
                                color: '#2f4554',
                                data: [{
                                    y: this.backlogInfo.checkInfo.data[0],
                                    name: '电梯系统',
                                    color: '#2f4554',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#2f4554'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.checkInfo.data[1],
                                    name: '风机系统',
                                    color: '#737f9d',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#737f9d'
                                        },
                                        overflow: true
                                    }
                                }, {
                                    y: this.backlogInfo.checkInfo.data[2],
                                    name: '站台门系统',
                                    color: '#cfa972',
                                    dataLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#cfa972'
                                        },
                                        overflow: true
                                    }
                                }]
                            }
                        ],
                        // 数据提示框
                        tooltip: {
                            ...this.option.tooltip,
                            headerFormat: '今日巡检比例<br />',
                            pointFormat: '{point.name}{point.y}%'
                        }
                    }
                };
            }
        },
        created() {
            this.getBacklogInfoFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getBacklogInfoFn() {
                this._getInfo({
                    ops: {},
                    api: 'mineCount',
                    callback: res => {
                        this.backlogInfo = res;
                    }
                });
            },
            testFn() {
                alert(1);
            }
        }
    };
</script>

<style lang="less" scoped>
    .todolist {
        box-shadow: 0 0.02rem 0.1rem 0.02rem #828282;
        border-top: 1px solid #aaa;
        position: absolute;
        top: 0;
        left: 0.1rem;
        right: 0.1rem;
        bottom: 0.1rem;
        border-radius: 0.05rem;
    }
</style>

<style lang="less">
    .todolist {
        .chart-title {
            font-family: 'Arial';
            text-align: center;
            font-size: 0.26rem;
            color: #cc5404;
            &.device-failure {
                color: #cc04a4;
            }
            &.today-patrol {
                color: #0475cc;
            }
            .count {
                font-weight: bold;
                font-size: 0.64rem;
            }
            .unit {
                font-size: 0.3rem;
                color: #000;
            }
        }
    }
</style>