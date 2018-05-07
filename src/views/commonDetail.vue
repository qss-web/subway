<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="content">
                <dt class="flex title">
                    <!-- <span></span> -->
                    <span>{{detailInfo.selectDate}}</span>
                    <!-- <span>&nbsp;</span> -->
                </dt>
                <dd class="listShow">
                    <ul class="flex">
                        <li>
                            <span>总运行时间</span>
                            <span v-if="rightValue01.length!=0">{{rightValue01[1].col3}}小时</span>
                        </li>
                        <li>
                            <span>故障维修次数</span>
                            <span v-if="rightValue02.length!=0">{{rightValue02[2].col3}}次</span>
                        </li>
                        <li>
                            <span>预警次数</span>
                            <span>{{detailInfo.yjcs}}次</span>
                        </li>
                    </ul>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart v-if="leftValue01.length!=0" id="test1" :option="option01" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>设备可靠度</dt>
                            <dd>
                                <ul class="flex" v-for="(item, index) in rightValue01">
                                    <li>{{item.col1}}</li>
                                    <li>{{item.col2}}</li>
                                    <li>{{item.col3}}</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart v-if="leftValue02.length!=0" id="test2" :option="option02" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>设备故障平均每日恢复时间</dt>
                            <dd>
                                <ul class="flex" v-for="(item, index) in rightValue02">
                                    <li>{{item.col1}}</li>
                                    <li>{{item.col2}}</li>
                                    <li>{{item.col3}}</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div class="chartList clearfix">
                        <div class="chart">
                            <v-chart v-if="leftValue03.length!=0" id="test3" :option="option03" :styleObject="styleObject"></v-chart>
                        </div>
                        <dl class="list">
                            <dt>接报修超时率</dt>
                            <dd>
                                <ul class="flex" v-for="(item, index) in rightValue03">
                                    <li>{{item.col1}}</li>
                                    <li>{{item.col2}}</li>
                                    <li>{{item.col3}}</li>
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
    import { mapActions } from 'vuex';
    import { formatDate } from '../utils';

    export default {
        data() {
            return {
                detailInfo: {},
                leftValue01: [],
                leftValue02: [],
                leftValue03: [],
                rightValue01: [],
                rightValue02: [],
                rightValue03: [],
                currentDate: formatDate('', '4'),
                searchData: {
                    'btnShow': [
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'lineId'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stationId'
                    }, {
                        'status': 4,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    defaultReq: {
                        lineId: '6号线西延线',
                        stationId: '',
                        startTime: '',
                        endTime: formatDate('', 4)
                    }
                },
                id: 'todayAlarm',
                styleObject: {
                    width: 100 + '%',
                    height: 3.6 + 'rem'
                },
                option01: {
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
                            maxPointWidth: 20,
                            cursor: 'pointer',
                            events: {}
                        }
                    },
                    series: [{
                        name: ' ',
                        color: '#006599',
                        data: []
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
                },
                option02: {
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
                            maxPointWidth: 20,
                            cursor: 'pointer',
                            events: {}
                        }
                    },
                    series: [{
                        name: ' ',
                        color: '#006599',
                        data: []
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
                },
                option03: {
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
                            maxPointWidth: 20,
                            cursor: 'pointer',
                            events: {}
                        }
                    },
                    series: [{
                        name: ' ',
                        color: '#006599',
                        data: []
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
                },
                isReq: {}
            };
        },
        created() {
            this.isReq = this.searchData.defaultReq;
            this.getCommonDetailFn(this.isReq);
            this.getCommonLeft01Fn(this.isReq);
            this.getCommonLeft02Fn(this.isReq);
            this.getCommonLeft03Fn(this.isReq);
        },
        methods: {
            ...mapActions(['_getInfo', '_getList']),
            btnsFn(fn) {
                this[fn]();
            },
            //导出
            exportFn() {

            },
            goBack() {
                this.$router.go(-1);
            },
            getCommonDetailFn(req) {
                const ops = {
                    'selectDate': this.currentDate
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getInfo({
                    ops: ops,
                    api: 'commonDetail',
                    callback: res => {
                        this.detailInfo = res;
                        this.currentDate = res.selectDate;
                    }
                });
            },
            getCommonLeft01Fn(req) {
                const ops = {
                    'selectDate': this.currentDate
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'commonLeft01',
                    callback: res => {
                        this.leftValue01 = res.kkdArrayMap;
                        this.option01.series[0].data = this.leftValue01;
                        this.rightValue01 = res.kkdmap[this.currentDate];
                        var that = this;

                        this.option01.plotOptions.series.events.click = function(event) {
                            var date = event.point.name.replace('.', '-');

                            that.rightValue01 = res.kkdmap[date];
                            that.$set(that.rightValue01, res.kkdmap[date]);
                        };
                    }
                });
            },
            getCommonLeft02Fn(req) {
                const ops = {
                    'selectDate': this.currentDate
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'commonLeft02',
                    callback: res => {
                        this.leftValue02 = res.kkdArrayMap;
                        this.option02.series[0].data = this.leftValue02;
                        this.rightValue02 = res.kkdmap[this.currentDate];
                        var that = this;

                        this.option02.plotOptions.series.events.click = function(event) {
                            var date = event.point.name.replace('.', '-');

                            that.rightValue02 = res.kkdmap[date];
                            that.$set(that.rightValue02, res.kkdmap[date]);
                        };
                    }
                });
            },
            getCommonLeft03Fn(req) {
                const ops = {
                    'selectDate': this.currentDate
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'commonLeft03',
                    callback: res => {
                        this.leftValue03 = res.kkdArrayMap;
                        this.option03.series[0].data = this.leftValue03;
                        this.rightValue03 = res.kkdmap[this.currentDate];
                        var that = this;

                        this.option03.plotOptions.series.events.click = function(event) {
                            var date = event.point.name.replace('.', '-');

                            that.rightValue03 = res.kkdmap[date];
                            that.$set(that.rightValue02, res.kkdmap[date]);
                        };
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                this.leftValue01 = [];
                this.leftValue02 = [];
                this.leftValue03 = [];
                this.getCommonDetailFn(req);
                this.getCommonLeft01Fn(req);
                this.getCommonLeft02Fn(req);
                this.getCommonLeft03Fn(req);
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


