<template>
    <div>
        <div>
            <div class="button-group flex">
                <button class="btn-name">***站台门</button>
                <button class="btn-alarm" @click="warnChartFn">预警</button>
            </div>
            <div class="alarm-reason">
                <div class="alarm-reason-title">预警原因</div>
                <ul class="alarm-reason-body">
                    <li>1、苹果园南路站 A出入口下段PGN-FT-A-1 扶手带断裂</li>
                    <li>2、廖公庄站B端风道LGZ-FT-D-4数据中断</li>
                </ul>
            </div>
            <ul class="upDownTab clearfix">
                <li v-on:click="isUp = true" v-bind:class="{active:isUp==true}">上行</li>
                <li v-on:click="isUp = false" v-bind:class="{active:isUp==false}">下行</li>
            </ul>
            <div class="device-3d" v-on:click="goInfoFn" v-if="isUp">
                <v-tag v-for="(item, index) in doorUpInfo" name="number" :status="item.status" :x="item.x" :y="item.y" :number="item.name"></v-tag>
            </div>
            <div class="device-3d" v-on:click="goInfoFn" v-if="!isUp">
                <v-tag v-for="(item, index) in doorDownInfo" name="number" :status="item.status" :x="item.x" :y="item.y" :number="item.name"></v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日设备健康监测指标</button>
                <button class="device-healthy-monitor" v-on:click="monitorFn">监测</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-ring-diagram id="runIndex1" v-if="showValue.yxsj" title="运行时间" :time="showValue.yxsj+'小时'" :showData="test1" :size="size" :setStyle="style"></v-ring-diagram>
                        <v-monthly-reliability v-if="ringInfo.value" v-bind:ringInfo="ringInfo"></v-monthly-reliability>
                        <v-ring-diagram id="runIndex2" v-if="showValue.yjsj" title="预警事件" :time="showValue.yjsj+'次'" :showData="test2" :size="size" :setStyle="style"></v-ring-diagram>
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
                doorUpInfo: [{
                    fixedId: '1',
                    status: "1",
                    name: '1',
                    x: '0.85',
                    y: '0.05'
                }, {
                    fixedId: '2',
                    status: "1",
                    name: '2',
                    x: '1.85',
                    y: '0.05'
                }, {
                    fixedId: '3',
                    status: "1",
                    name: '3',
                    x: '2.85',
                    y: '0.05'
                }, {
                    fixedId: '4',
                    status: "1",
                    name: '4',
                    x: '3.85',
                    y: '0.05'
                }, {
                    fixedId: '5',
                    status: "1",
                    name: '5',
                    x: '4.85',
                    y: '0.05'
                }, {
                    fixedId: '6',
                    status: "1",
                    name: '6',
                    x: '5.85',
                    y: '0.05'
                }, {
                    fixedId: '7',
                    status: "4",
                    name: '7',
                    x: '6.85',
                    y: '0.05'
                }, {
                    fixedId: '8',
                    status: "1",
                    name: '8',
                    x: '7.85',
                    y: '0.05'
                }, {
                    fixedId: '9',
                    status: "1",
                    name: '9',
                    x: '0.85',
                    y: '1.28'
                }, {
                    fixedId: '10',
                    status: "1",
                    name: '10',
                    x: '1.85',
                    y: '1.28'
                }, {
                    fixedId: '11',
                    status: "1",
                    name: '11',
                    x: '2.85',
                    y: '1.28'
                }, {
                    fixedId: '12',
                    status: "5",
                    name: '12',
                    x: '3.85',
                    y: '1.28'
                }, {
                    fixedId: '13',
                    status: "1",
                    name: '13',
                    x: '4.85',
                    y: '1.28'
                }, {
                    fixedId: '14',
                    status: "1",
                    name: '14',
                    x: '5.85',
                    y: '1.28'
                }, {
                    fixedId: '15',
                    status: "1",
                    name: '15',
                    x: '6.85',
                    y: '1.28'
                }, {
                    fixedId: '16',
                    status: "1",
                    name: '16',
                    x: '7.85',
                    y: '1.28'
                }, {
                    fixedId: '17',
                    status: "2",
                    name: '17',
                    x: '0.85',
                    y: '2.55'
                }, {
                    fixedId: '18',
                    status: "1",
                    name: '18',
                    x: '1.85',
                    y: '2.55'
                }, {
                    fixedId: '19',
                    status: "1",
                    name: '19',
                    x: '2.85',
                    y: '2.55'
                }, {
                    fixedId: '20',
                    status: "3",
                    name: '20',
                    x: '3.85',
                    y: '2.55'
                }, {
                    fixedId: '21',
                    status: "1",
                    name: '21',
                    x: '4.85',
                    y: '2.55'
                }, {
                    fixedId: '22',
                    status: "1",
                    name: '22',
                    x: '5.85',
                    y: '2.55'
                }, {
                    fixedId: '23',
                    status: "1",
                    name: '23',
                    x: '6.85',
                    y: '2.55'
                }, {
                    fixedId: '24',
                    status: "1",
                    name: '24',
                    x: '7.85',
                    y: '2.55'
                }, {
                    fixedId: '25',
                    status: "1",
                    name: '25',
                    x: '0.85',
                    y: '3.76'
                }, {
                    fixedId: '26',
                    status: "2",
                    name: '26',
                    x: '1.85',
                    y: '3.76'
                }, {
                    fixedId: '27',
                    status: "4",
                    name: '27',
                    x: '2.85',
                    y: '3.76'
                }, {
                    fixedId: '28',
                    status: "1",
                    name: '28',
                    x: '3.85',
                    y: '3.76'
                }, {
                    fixedId: '29',
                    status: "1",
                    name: '29',
                    x: '4.85',
                    y: '3.76'
                }, {
                    fixedId: '30',
                    status: "1",
                    name: '30',
                    x: '5.85',
                    y: '3.76'
                }, {
                    fixedId: '31',
                    status: "5",
                    name: '29',
                    x: '6.85',
                    y: '3.76'
                }, {
                    fixedId: '32',
                    status: "1",
                    name: '30',
                    x: '7.85',
                    y: '3.76'
                }],
                doorDownInfo: [{
                    fixedId: '1',
                    status: "2",
                    name: '1',
                    x: '0.85',
                    y: '0.05'
                }, {
                    fixedId: '2',
                    status: "1",
                    name: '2',
                    x: '1.85',
                    y: '0.05'
                }, {
                    fixedId: '3',
                    status: "1",
                    name: '3',
                    x: '2.85',
                    y: '0.05'
                }, {
                    fixedId: '4',
                    status: "1",
                    name: '5',
                    x: '3.85',
                    y: '0.05'
                }, {
                    fixedId: '5',
                    status: "1",
                    name: '5',
                    x: '4.85',
                    y: '0.05'
                }, {
                    fixedId: '6',
                    status: "1",
                    name: '6',
                    x: '5.85',
                    y: '0.05'
                }, {
                    fixedId: '7',
                    status: "4",
                    name: '7',
                    x: '6.85',
                    y: '0.05'
                }, {
                    fixedId: '8',
                    status: "1",
                    name: '8',
                    x: '7.85',
                    y: '0.05'
                }, {
                    fixedId: '9',
                    status: "1",
                    name: '9',
                    x: '0.85',
                    y: '1.28'
                }, {
                    fixedId: '10',
                    status: "1",
                    name: '10',
                    x: '1.85',
                    y: '1.28'
                }, {
                    fixedId: '11',
                    status: "1",
                    name: '11',
                    x: '2.85',
                    y: '1.28'
                }, {
                    fixedId: '12',
                    status: "5",
                    name: '12',
                    x: '3.85',
                    y: '1.28'
                }, {
                    fixedId: '13',
                    status: "1",
                    name: '13',
                    x: '4.85',
                    y: '1.28'
                }, {
                    fixedId: '14',
                    status: "1",
                    name: '14',
                    x: '5.85',
                    y: '1.28'
                }, {
                    fixedId: '15',
                    status: "1",
                    name: '15',
                    x: '6.85',
                    y: '1.28'
                }, {
                    fixedId: '16',
                    status: "1",
                    name: '16',
                    x: '7.85',
                    y: '1.28'
                }, {
                    fixedId: '17',
                    status: "2",
                    name: '17',
                    x: '0.85',
                    y: '2.55'
                }, {
                    fixedId: '18',
                    status: "1",
                    name: '18',
                    x: '1.85',
                    y: '2.55'
                }, {
                    fixedId: '19',
                    status: "1",
                    name: '19',
                    x: '2.85',
                    y: '2.55'
                }, {
                    fixedId: '20',
                    status: "3",
                    name: '20',
                    x: '3.85',
                    y: '2.55'
                }, {
                    fixedId: '21',
                    status: "1",
                    name: '21',
                    x: '4.85',
                    y: '2.55'
                }, {
                    fixedId: '22',
                    status: "1",
                    name: '22',
                    x: '5.85',
                    y: '2.55'
                }, {
                    fixedId: '23',
                    status: "1",
                    name: '23',
                    x: '6.85',
                    y: '2.55'
                }, {
                    fixedId: '24',
                    status: "1",
                    name: '24',
                    x: '7.85',
                    y: '2.55'
                }, {
                    fixedId: '25',
                    status: "1",
                    name: '25',
                    x: '0.85',
                    y: '3.76'
                }, {
                    fixedId: '26',
                    status: "1",
                    name: '26',
                    x: '1.85',
                    y: '3.76'
                }, {
                    fixedId: '27',
                    status: "1",
                    name: '27',
                    x: '2.85',
                    y: '3.76'
                }, {
                    fixedId: '28',
                    status: "1",
                    name: '28',
                    x: '3.85',
                    y: '3.76'
                }, {
                    fixedId: '29',
                    status: "1",
                    name: '29',
                    x: '4.85',
                    y: '3.76'
                }, {
                    fixedId: '30',
                    status: "1",
                    name: '30',
                    x: '5.85',
                    y: '3.76'
                }, {
                    fixedId: '31',
                    status: "1",
                    name: '29',
                    x: '6.85',
                    y: '3.76'
                }, {
                    fixedId: '32',
                    status: "1",
                    name: '30',
                    x: '7.85',
                    y: '3.76'
                }],
                isShowPopup: false,
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
                    value: '',
                    size: {
                        width: '2.2rem',
                        height: '2.2rem'
                    },
                    id: 'health2'
                },
                isUp: true,
                activeIndex: '',
                alarmTable: {
                    label: [{
                        'label': '序号',
                        'width': 10,
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
                        'value': 'testName'
                    }, {
                        'label': '当前值',
                        'width': 9,
                        'value': 'currentValue'
                    }, {
                        'label': '高限',
                        'width': 9,
                        'value': 'highLimit'
                    }, {
                        'label': '高高限',
                        'width': 9,
                        'value': 'highestLimit'
                    }, {
                        'label': '测点状态',
                        'width': 9,
                        'value': 'statusValue',
                        'status': 'status'
                    }, {
                        'label': '更新时间',
                        'width': 10,
                        'value': 'updateTime'
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
                }
            };
        },
        created() {
            this.getEquRuninfoFn();
            this.getEventInfoFn();
        },
        computed: {
            ...mapState(['deviceInfo'])
        },
        methods: {
            ...mapActions(['_getInfo', '_getList']),
            ...mapMutations(['_equInfo', '_warnChart']),
            //点击列表进入设备详情页
            goInfoFn() {
                this._getList({
                    ops: { 'id': this.deviceInfo.deviceId.toString() },
                    api: 'infoDetail',
                    callback: res => {
                        this._equInfo(res);
                        this.$router.push({ path: '/equInfoOther', query: { 'id': this.deviceInfo.deviceId, 'isShow': true } });
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
            }
        }
    };
</script>

<style lang="less" scoped>
    .upDownTab {
        position: absolute;
        left: 0.5rem;
        top: 2rem;
        li {
            width: 1.2rem;
            float: left;
            height: 0.46rem;
            line-height: 0.46rem;
            text-align: center;
            background: #414455;
            color: #fff;
            margin-right: 0.2rem;
            border-radius: 5px;
            font-size: 0.2rem;
            cursor: pointer;
        }
        li.active {
            background: #54596e;
        }
    }
    .button-group {
        position: absolute;
        left: 1.2rem;
        top: 0.6rem;
        .btn-name {
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.3rem;
            background-color: #373f5b;
            padding: 0.08rem 0.4rem;
        }
        .btn-alarm {
            margin-left: 0.2rem;
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.24rem;
            background-color: #fa0000;
            padding: 0.08rem 0.4rem;
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
        left: 0.5rem;
        top: 2.66rem;
        width: 9rem;
        height: 5rem;
        background: url('~assets/siteInfo/bg_door.png') no-repeat;
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
                    background-color: #deff00;
                }
                &.normal {
                    background-color: #36ff00;
                }
            }
        }
    }
</style>