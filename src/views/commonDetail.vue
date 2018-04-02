<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="content">
                <dt class="flex title">
                    <span>海淀五路</span>
                    <span>2017年12月</span>
                    <span>&nbsp;</span>
                </dt>
                <dd class="listShow">
                    <ul class="flex">
                        <li>
                            <span>总运行时间</span>
                            <span>0小时</span>
                        </li>
                        <li>
                            <span>故障维修次数</span>
                            <span>0次</span>
                        </li>
                        <li>
                            <span>预警次数</span>
                            <span>0次</span>
                        </li>
                    </ul>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart id="test1" :option="option" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>设备可靠度</dt>
                            <dd>
                                <ul class="flex">
                                    <li>设备月可靠度</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>设备工作总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>故障停用总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最低设备月可靠度</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高故障月停用时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高月设备工作总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart id="test2" :option="option" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>设备故障平均每日恢复时间</dt>
                            <dd>
                                <ul class="flex">
                                    <li>故障平均每日恢复时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>月故障总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>故障次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高故障平均每日修复时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高故障月停用时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高月设备故障次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart id="test3" :option="option" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>接报修超时率</dt>
                            <dd>
                                <ul class="flex">
                                    <li>接报修超时30分钟到场</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>未按时到达的次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>总报修次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高接报修超时30分钟到场</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高未按时到达的次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高月总报修次数</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </dd>
            </div>
        </div>
        <div class="footer flex" @click.prevent="goBack">
            <img class="bg" src="../assets/other/footer-border.png" />
            <img class="back" src="~assets/common/icon_goback.png" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchData: {
                    'btnShow': {
                        'add': false,
                        'export': true,
                        'delete': false,
                        'edit': false,
                        'download': false,
                        'import': false
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '金安桥站'
                        }, {
                            value: '2',
                            label: '苹果园站'
                        }, {
                            value: '3',
                            label: '苹果园南路站'
                        }, {
                            value: '4',
                            label: '西黄村站'
                        }, {
                            value: '5',
                            label: '廖公庄站'
                        }, {
                            value: '6',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 4,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }]
                },
                id: 'todayAlarm',
                styleObject: {
                    width: 100 + '%',
                    height: 3.6 + 'rem'
                },
                option: {
                    chart: {
                        type: 'column', //指定图表的类型
                        backgroundColor: '#e5e8f7', //背景色
                        margin: [60, 40, 60, 60]
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
                        type: 'category',
                        // categories: ['自动扶梯', '风机', '站台门'],
                        labels: {
                            style: {
                                color: '#474740',
                                fontSize: '0.16rem'
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
                                fontSize: '0.16rem'
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
                            maxPointWidth: 20
                        }
                    },
                    series: [{
                        name: ' ',
                        color: '#006599',
                        data: [{
                            y: 4,
                            name: '2017.04'
                        }, {
                            y: 5,
                            name: '2017.05'
                        }, {
                            y: 4,
                            name: '2017.06'
                        }, {
                            y: 2,
                            name: '2017.07'
                        }, {
                            y: 5,
                            name: '2017.08'
                        }, {
                            y: 7,
                            name: '2017.09'
                        }, {
                            y: 3,
                            name: '2017.10'
                        }, {
                            y: 6,
                            name: '2017.11'
                        }, {
                            y: 5,
                            name: '2017.12'
                        }, {
                            y: 4,
                            name: '2018.01'
                        }, {
                            y: 5,
                            name: '2018.02'
                        }, {
                            y: 4,
                            name: '2018.03'
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
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped lang="less">
    .wholeWrap {
        padding-top: 0.16rem;
    }
    .equWrap {
        width: 99.4%;
        margin: 0 auto;
        padding: 0.18rem 0 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
        .content {
            width: 98.5%;
            margin: 0px auto;
            border: 1px solid #8195a7;
            border-top: none;
            dt.title {
                background: #54596d;
                span {
                    flex: 1;
                    height: 0.78rem;
                    line-height: 0.78rem;
                    text-align: center;
                    font-size: 0.4rem;
                    color: #fff;
                }
            }
            dd.listShow {
                padding: 0 0.2rem;
                background: #e5e8f7;
                ul {
                    li {
                        flex: 1;
                        margin: 0 0.22rem;
                        text-align: center;
                        span {
                            display: block;
                        }
                        span:nth-child(1) {
                            font-size: 0.38rem;
                            height: 1rem;
                            line-height: 1rem;
                            background: #fff;
                        }
                        span:nth-child(2) {
                            font-size: 0.62rem;
                            height: 1.94rem;
                            line-height: 1.94rem;
                            background: #54596d;
                            color: #fff;
                        }
                    }
                }
                .chartList {
                    margin-top: 0.12rem;
                    padding-bottom: 0.1rem;
                    .chart {
                        width: 10.2rem;
                        height: 3.64rem;
                        float: left;
                        border: 1px solid #8195a7;
                    }
                    .list {
                        width: 7.55rem;
                        float: right;
                        border: 1px solid #8195a7;
                        dt {
                            height: 0.74rem;
                            line-height: 0.74rem;
                            text-align: center;
                            font-size: 0.32rem;
                            background: #54596d;
                            color: #ffffff;
                        }
                        dd {
                            ul {
                                line-height: 0.48rem;
                                li {
                                    flex: 1;
                                    font-size: 0.22rem;
                                }
                                li:nth-child(1) {
                                    flex: 2;
                                    text-align: left;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
    .footer {
        height: 0.95rem;
        // position: absolute;
        // bottom: 0;
        margin-top: 0.2rem;
        width: 100%;
        background-color: #474b5c;
        justify-content: center;
        .bg {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .back {
            width: 1rem;
            height: 0.62rem;
            cursor: pointer;
        }
    }
</style>


