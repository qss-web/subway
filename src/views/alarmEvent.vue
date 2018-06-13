<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-on:getEquName="getEquNameFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <v-chart v-if="currentMonth.length!=0" :id="id" :option="option" :styleObject="styleObject"></v-chart>
            </div>
        </div>
        <v-goback></v-goback>
        <span class="g-titleName">预警事件</span>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentMonth: [],
                lastMonth: [],
                searchData: {
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'line'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请输入内容',
                        'val': 'equSys'
                    }, {
                        'status': 6,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }, {
                        'status': 5,
                        'title': '时间',
                        'placeholder': '选择月',
                        'val1': 'startDate'
                    }],
                    defaultReq: {
                        line: '6号线西延线',
                        station: '',
                        equSys: '',
                        equName: ''
                    }
                },
                id: 'todayAlarm',
                styleObject: {
                    width: 100 + '%',
                    height: 7.6 + 'rem'
                },
                option: {
                    chart: {
                        type: 'area', //指定图表的类型
                        backgroundColor: '#e5e8f7', //背景色
                        margin: [100, 100, 80, 100]
                    },
                    credits: {
                        enabled: false //去掉地址
                    },
                    title: {
                        text: '' //指定图表标题
                    },
                    xAxis: {
                        title: {
                            text: null
                        },
                        // type: 'category',
                        categories: [],
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
                        color: '#d06c6a',
                        name: '上月',
                        data: []
                    }, {
                        color: '#8dbac0',
                        name: '本月',
                        data: []
                    }],
                    legend: {
                        verticalAlign: 'top',
                        symbolRadius: 0,
                        itemStyle: {
                            color: '#141413',
                            // fontSize: "0.2rem",
                            fontWeight: "normal"
                        },
                        align: 'right'
                    },
                    labels: {
                        style: {                         // 标签全局样式
                            color: "#474740",
                            fontSize: '0.2rem',
                            fontWeight: 'normal'
                        }
                    }
                },
                isReq: {},
                getEquNameArr: [],
                days: []
            };
        },
        created() {
            this.isReq = this.searchData.defaultReq;
            this.getWarningEventsFn(this.isReq);
            this.getEquNameFn({ 'line': this.isReq.line });
        },
        methods: {
            ...mapActions(['_getInfo', '_getList']),
            ...mapMutations(['_equNameList']),
            getWarningEventsFn(req) {
                this._getInfo({
                    ops: req,
                    api: 'warningEvents',
                    callback: res => {
                        this.days = [];
                        res.current.forEach(item => {
                            this.currentMonth.push(item[1]);
                            this.days.push(item[0]);
                        });
                        res.last.forEach(item => {
                            this.lastMonth.push(item[1]);
                        });
                        //本月
                        this.option.series[1].data = this.currentMonth;
                        //上月
                        this.option.series[0].data = this.lastMonth;
                        //天数
                        this.option.xAxis.categories = this.days;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                this.lastMonth = [];
                this.currentMonth = [];
                this.getWarningEventsFn(req);
            },
            //获取设备名称
            getEquNameFn(req) {
                this._getList({
                    ops: req,
                    api: 'selectlist2',
                    callback: res => {
                        this.getEquNameArr = [];
                        res.forEach(item => {
                            this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.deviceUuid });
                        });
                        this._equNameList(this.getEquNameArr);
                    }
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .wholeWrap {
        padding: 0.16rem 0 0.24rem 0;
    }
    .equWrap {
        width: 99.4%;
        margin: 0 auto;
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


