<template>
    <div>
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <v-chart :id="id" :option="option" :styleObject="styleObject"></v-chart>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                searchData: {
                    'options': [{
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    popSave() { }
                },
                id: 'todayAlarm',
                styleObject: {
                    width: 100 + '%',
                    height: 7.6 + 'rem'
                },
                option: {
                    chart: {
                        type: 'column', //指定图表的类型
                        backgroundColor: '#e5e8f7', //背景色
                        margin: [100, 100, 80, 100]
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        align: 'center',
                        text: '报警统计', //指定图表标题
                        style: {
                            color: '#131313',
                            fontSize: '0.4rem'
                        },
                        y: 44
                    },
                    xAxis: {
                        title: {
                            text: null
                        },
                        type: 'category',
                        // categories: ['自动扶梯', '风机', '站台门'],
                        labels: {
                            style: {
                                color: '#474740',
                                fontSize: '0.2rem'
                            },
                            align: 'center', //标签居中对齐
                            y: 30
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
                        gridLineColor: '#7281a3',
                        labels: {
                            style: {
                                color: '#474740',
                                fontSize: '0.2rem'
                            },
                            align: 'center', //标签居中对齐
                            y: 5
                        },
                        lineColor: '#7281a3',
                        lineWidth: 1,
                        tickWidth: 1,
                        tickColor: '#7281a3'
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            maxPointWidth: 46
                        }
                    },
                    series: [{
                        color: '#006599',
                        name: ' ',
                        data: [{
                            y: 4,
                            name: '2018.3.11'
                        }, {
                            y: 5,
                            name: '2018.3.12'
                        }, {
                            y: 4,
                            name: '2018.3.13'
                        }, {
                            y: 2,
                            name: '2018.3.14'
                        }, {
                            y: 5,
                            name: '2018.3.15'
                        }, {
                            y: 7,
                            name: '2018.3.16'
                        }, {
                            y: 3,
                            name: '2018.3.17'
                        }, {
                            y: 6,
                            name: '2018.3.18'
                        }, {
                            y: 5,
                            name: '2018.3.19'
                        }, {
                            y: 4,
                            name: '2018.3.20'
                        }]
                    }],
                    legend: {
                        enabled: false
                    },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#474740",
                            fontSize: '0.2rem',
                            fontWeight: 'normal'
                        }
                    }
                }
            };
        },
        props: ['list', 'label', 'checked'],
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            }
        }
    };
</script>

<style scoped lang="less">
    .equWrap {
        width: 99.4%;
        margin: 0.16rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        min-height: 7.8rem;
        border-top: 1px solid #587386;
        .title {
            background: #e5e8f7;
            position: relative;
            height: 0.52rem;
            border: 1px solid #587386;
            border-bottom: none;
            .notice {
                position: absolute;
                right: 1rem;
                top: 0;
                dd {
                    flex: auto;
                    font-size: 0.2rem;
                    margin-left: 0.26rem;
                    height: 0.52rem;
                    line-height: 0.52rem;
                }
            }
        }
    }
</style>


