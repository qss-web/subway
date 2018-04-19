<template>
    <div>
        <div>
            <div class="button-group flex">
                <button class="btn-name" style="margin-left: 0;">{{alarmOtherInfos.deviceName}}</button>
                <button class="btn-name">{{alarmOtherInfos.deviceType}}</button>
                <button class="btn-alarm" @click="warnChartFn" v-bind:class="colorStatus[alarmOtherInfos.deviceStatus-1]">{{statusShow[alarmOtherInfos.deviceStatus-1]}}</button>
            </div>
            <div class="alarm-reason">
                <div class="alarm-reason-title">预警原因</div>
                <ul class="alarm-reason-body">
                    <li v-for="(item,index) in alarmInfos">{{index+1}}、{{item}}</li>
                </ul>
            </div>
            <div class="device-3d" v-on:click="goInfoFn">
                <v-tag v-for="(item,index) in escalatorInfo" name="line" :type="item.type" :status="item.status" :x="item.x" :y="item.y">{{item.name}}</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日设备健康监测指标</button>
                <button class="device-healthy-monitor" v-on:click="monitorFn">监测</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-ring-diagram id="runIndex1" v-if="showValue.yxsj" title="运行时间" :time="showValue.yxsj+'小时'" :showData="test1" :size="size" :setStyle="style"></v-ring-diagram>
                        <span v-if="!showValue.yxsj">暂无数据</span>
                        <v-monthly-reliability v-if="ringInfo.value" v-bind:ringInfo="ringInfo"></v-monthly-reliability>
                        <span v-if="!ringInfo.value">暂无数据</span>
                        <v-ring-diagram id="runIndex2" v-if="showValue.yjsj" title="预警事件" :time="showValue.yjsj+'次'" :showData="test2" :size="size" :setStyle="style"></v-ring-diagram>
                        <span v-if="!showValue.yjsj">暂无数据</span>
                    </div>
                    <div class="healthy-table">
                        <div class="tabs flex">
                            <button class="tab" :class="{active: !activeIndex}" @click="tabListFn(0)">事件信息</button>
                            <button class="tab" :class="{active: activeIndex}" @click="tabListFn(1)">测点状态</button>
                        </div>
                        <div class="tables">
                            <v-search-list v-show="!activeIndex" :other="alarmTable.other" :label="alarmTable.label" :list="alarmTable.list"></v-search-list>
                            <v-search-list v-show="activeIndex" :other="testTable.other" :label="testTable.label" :list="testTable.list"></v-search-list>
                        </div>
                    </div>
                </div>
            </div>
            <v-train></v-train>
        </div>
        <v-goback></v-goback>
        <el-dialog :visible.sync="isShowPopup">
            <v-alarm-popup></v-alarm-popup>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 8, //每页显示数量
                //预警信息
                alarmInfos: [],
                statusShow: ['二级预警', '一级预警', '运行', '断网', '停机'],
                colorStatus: ['bg-error', 'bg-warn', 'bg-normal', 'bg-stop', 'bg-offline'],
                alarmOtherInfos: {
                    deviceName: '',
                    deviceStatus: '',
                    deviceType: ''
                },
                showValue: {
                    'yxsj': '',
                    'yjsj': ''
                },
                test1: [{
                    y: 360,
                    color: '#32b16c'
                }],
                size: {
                    width: '2.2rem',
                    height: '2.2rem'
                },
                style: {
                    color: '#fff',
                    fontSize: '0.18rem',
                    font: '0.24rem'
                },
                test2: [{
                    y: 360,
                    color: '#13b5b1'
                }],
                ringInfo: {
                    showInfo: {
                        title: '健康指数',
                        color: '#63869e',
                        fontSize: '0.18rem'
                    },
                    value: '99.8',
                    size: {
                        width: '2.2rem',
                        height: '2.2rem'
                    },
                    id: 'health2'
                },
                isShowPopup: false,
                activeIndex: '',
                alarmTable: {
                    label: [{
                        'label': '序号',
                        'width': 20,
                        'value': 'index'
                    }, {
                        'label': '设备名称',
                        'width': 25,
                        'value': 'equName'
                    }, {
                        'label': '时间',
                        'width': 20,
                        'value': 'time'
                    }, {
                        'label': '事件描述',
                        'width': 20,
                        'value': 'eventDesc'
                    }, {
                        'label': '当前状态',
                        'width': 20,
                        'value': 'statusValue',
                        'status': 'status'
                    }],
                    list: [],
                    other: {
                        style: 5,
                        isSubShowColor: true
                    }
                },
                testTable: {
                    label: [{
                        'label': '序号',
                        'width': 9,
                        'value': 'index'
                    }, {
                        'label': '设备名称',
                        'width': 9,
                        'value': 'equName'
                    }, {
                        'label': '测点名称',
                        'width': 9,
                        'value': 'detectName'
                    }, {
                        'label': '当前值',
                        'width': 9,
                        'value': 'currentValue'
                    }, {
                        'label': '高限',
                        'width': 9,
                        'value': 'hLimit'
                    }, {
                        'label': '高高限',
                        'width': 9,
                        'value': 'hhighLimit'
                    }, {
                        'label': '测点状态',
                        'width': 9,
                        'value': 'statusValue',
                        'status': 'status'
                    }, {
                        'label': '更新时间',
                        'width': 10,
                        'value': 'time'
                    }, {
                        'label': '预警原因',
                        'width': 18,
                        'value': 'alarmCause'
                    }, {
                        'label': '检维修建议',
                        'width': 18,
                        'value': 'suggest'
                    }],
                    list: [],
                    other: {
                        style: 5,
                        isSubShowColor: true
                    }
                },
                //请求风机设备状态给后台传的参数
                fixedIds: '',
                //风机的信息
                escalatorInfo: [{
                    fixedId: '右扶手带',
                    status: "1",
                    name: '右扶手带',
                    x: '1.8',
                    y: '1.4',
                    type: 1
                }, {
                    fixedId: '左扶手带',
                    status: "3",
                    name: '左扶手带',
                    x: '2',
                    y: '2.5',
                    type: 1
                }, {
                    fixedId: '梯级链涨紧轮',
                    status: "4",
                    name: '梯级链涨紧轮',
                    x: '1',
                    y: '3.5',
                    type: 1
                }, {
                    fixedId: '主驱动轮',
                    status: "5",
                    name: '主驱动轮',
                    x: '8.6',
                    y: '1.4',
                    type: 3
                }, {
                    fixedId: '电梯振动',
                    status: "2",
                    name: '电梯振动',
                    x: '8.5',
                    y: '2.6',
                    type: 4
                }, {
                    fixedId: '齿轮箱振动',
                    status: "3",
                    name: '齿轮箱振动',
                    x: '8.3',
                    y: '3',
                    type: 5
                }, {
                    fixedId: '地脚振动',
                    status: "4",
                    name: '地脚振动',
                    x: '7.7',
                    y: '3.4',
                    type: 2
                }]
            };
        },
        created() {
            this.getEquRuninfoFn();
            this.getEventInfoFn();
            this.getStatusFn();
        },
        computed: {
            ...mapState(['deviceInfo'])
        },
        methods: {
            ...mapActions(['_getInfo', '_getList']),
            ...mapMutations(['_equInfo', '_warnChart']),
            goInfoFn() {
                this._getList({
                    ops: { 'id': this.deviceInfo.deviceId.toString() },
                    api: 'infoDetail',
                    callback: res => {
                        this._equInfo(res);
                        this.$router.push({ path: '/equInfo', query: { 'id': this.deviceInfo.deviceId, 'isShow': true } });
                    }
                });
            },
            monitorFn() {
                this.$router.push({ path: 'monitor' });
            },
            getEquRuninfoFn() {
                this._getInfo({
                    ops: {
                        // "deviceInLineId": "6号线西延线",  //线路
                        // "deviceInStationId": "苹果园站",  //站点
                        "deviceId": this.deviceInfo.deviceId  //设备id
                    },
                    api: 'equRuninfo',
                    callback: res => {
                        this.showValue.yxsj = res.yxsj;
                        this.showValue.yjsj = res.yjsj;
                        this.ringInfo.value = res.jkzs;
                    }
                });
            },
            //切换选项卡
            tabListFn(value) {
                this.activeIndex = value;
                if(value) {
                    this.getPointStatusFn();
                } else {
                    this.getEventInfoFn();
                }
            },
            //获取事件信息
            getEventInfoFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'deviceUuid': this.deviceInfo.deviceUuid
                };

                this._getList({
                    ops: ops,
                    api: 'eventInfo',
                    callback: res => {
                        this.alarmTable.list = res.rows;
                    }
                });
            },
            //获取测点信息
            getPointStatusFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'deviceUuid': this.deviceInfo.deviceUuid
                };

                this._getList({
                    ops: ops,
                    api: 'pointStatus',
                    callback: res => {
                        this.testTable.list = res.rows;
                    }
                });
            },
            //预警信息
            warnChartFn() {
                this._getList({
                    ops: {},
                    api: 'warnData',
                    callback: res => {
                        this._warnChart(res);
                        this.isShowPopup = true;
                    }
                });
            },
            //获取车站设备fixedIds
            getStatusFn() {

                this.escalatorInfo.forEach(item => {
                    this.fixedIds += item.fixedId + ',';
                });
                this.fixedIds = this.fixedIds.substr(0, this.fixedIds.length - 1);
                this.getEquStatusFn();
            },
            getEquStatusFn() {
                const ops = {
                    sectionIndex: this.fixedIds, //"振动监测值X",
                    deviceUuid: this.deviceInfo.deviceUuid//'34301c3bb7aa27c16ead4841a2f11512'
                };

                this._getList({
                    ops: ops,
                    api: 'pointOfEquiment',
                    callback: res => {
                        res.sections.forEach(item => {
                            this.escalatorInfo.filter(item1 => {
                                if(item.sectionIndex == item1.fixedId) {
                                    item1.status = item.status;
                                }
                            });
                        });
                        //预警信息
                        this.alarmInfos = res.alarmInfos;
                        this.alarmOtherInfos.deviceName = res.deviceName;
                        this.alarmOtherInfos.deviceStatus = res.deviceStatus;
                        this.alarmOtherInfos.deviceType = res.deviceType;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .button-group {
        position: absolute;
        left: 0.6rem;
        top: 0.6rem;
        .btn-name {
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.3rem;
            background-color: #373f5b;
            padding: 0.08rem 0.2rem;
            margin-left: 0.2rem;
        }
        .btn-alarm {
            margin-left: 0.2rem;
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.24rem;
            padding: 0.08rem 0.2rem;
            box-shadow: 0 1px 0.1rem 0.01rem #fff;
        }
    }

    .alarm-reason {
        width: 4.68rem;
        background-color: #6d7389;
        color: #fff;
        font-size: 0.16rem;
        position: absolute;
        left: 5.2rem;
        top: 0.26rem;
        &-title {
            background-color: #64697f;
            height: 0.35rem;
            line-height: 0.35rem;
            padding: 0 0.14rem;
        }
        &-body {
            height: 1.32rem;
            overflow: auto;
            padding: 0.14rem;
            li {
                padding: 0.02rem 0;
            }
        }
    }

    .device-3d {
        position: absolute;
        left: 0rem;
        bottom: 0.4rem;
        width: 10.88rem;
        height: 7.08rem;
        background: url('~assets/siteInfo/bg_escalator.png') no-repeat;
        background-size: 100% 100%;
    }

    .device-healthy {
        position: absolute;
        top: 0.26rem;
        right: 0.26rem;
        width: 8.9rem;
        height: 8.95rem;
        background: url('~assets/siteInfo/bg_healthy.png') no-repeat;
        background-size: 100% 100%;
        &-title {
            background: url('~assets/siteInfo/bg_title.png') no-repeat;
            background-size: 100%;
            width: 2.7rem;
            height: 0.44rem;
            color: #cfd6f0;
            font-size: 0.22rem;
            position: absolute;
            left: 0.34rem;
            top: 0.12rem;
            padding-bottom: 0.04rem;
        }
        &-monitor {
            background: #373f5b;
            width: 0.8rem;
            height: 0.4rem;
            line-height: 0.4rem;
            color: #fff;
            font-size: 0.2rem;
            position: absolute;
            right: 0.44rem;
            top: 0.12rem;
            padding-bottom: 0.04rem;
            border-radius: 6px;
        }
        &-body {
            width: 8.24rem;
            height: 7.9rem;
            position: absolute;
            left: 0.31rem;
            top: 0.6rem;
            .healthy-charts {
                height: 2.68rem;
                justify-content: space-around;
                padding: 0 0.3rem;
                span {
                    color: #ffffff;
                }
            }
            .healthy-table {
                width: 100%;
                height: 5.26rem;
                flex-direction: column;
                .tabs {
                    height: 0.4rem;
                    width: 100%;
                    align-items: flex-end;
                    padding-left: 0.2rem;
                    .tab {
                        background-color: #7b8398;
                        color: #fff;
                        height: 0.4rem;
                        border-radius: 0.1rem 0.1rem 0 0;
                        padding: 0 0.1rem;
                        margin: 0 0.04rem;
                        line-height: 0.4rem;
                        width: 2rem;
                        text-align: center;
                        font-size: 0.16rem;
                        &.active {
                            background-color: #414455;
                        }
                    }
                }
                .tables {
                    width: 100%;
                    height: 4.86rem;
                    background-color: #414455;
                    border-radius: 0.2rem;
                    box-shadow: 0px 2px 4px 2px #333;
                }
            }
        }
    }

    .fans {
        position: absolute;
        flex-wrap: wrap;
        width: 6rem;
        height: 2rem;
        bottom: 1.6rem;
        left: 4.8rem;
        .fan {
            padding: 0 0.4rem;
            &-icon {
                width: 0.52rem;
                height: 0.52rem;
                margin-right: 0.2rem;
            }
            &-name {
                color: #fff;
                font-size: 0.16rem;
                box-shadow: 0 0 0.1rem 0.01rem #000;
                width: 0.94rem;
                height: 0.45rem;
                &.error {
                    background-color: #ff0000;
                }
                &.warn {
                    background-color: #f9af00;
                }
                &.normal {
                    background-color: #36ff00;
                }
            }
        }
    }
</style>