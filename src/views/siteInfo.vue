<template>
    <div>
        <div>
            <div class="device-3d">
                <v-tag v-for="(item, index) in stationInfo" name="triangle" v-bind:status="item.status" v-bind:x="item.x" v-bind:y="item.y" @onclick="goToDevice(item.type,item.deviceId,item.deviceUuid)">{{item.name}}</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日车站健康监测完好率</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-monthly-reliability v-if="ringInfo1.value" v-bind:ringInfo="ringInfo1"></v-monthly-reliability>
                        <span v-if="!ringInfo1.value">暂无数据</span>
                        <v-monthly-reliability v-if="ringInfo2.value" v-bind:ringInfo="ringInfo2"></v-monthly-reliability>
                        <span v-if="!ringInfo2.value">暂无数据</span>
                        <v-monthly-reliability v-if="ringInfo3.value" v-bind:ringInfo="ringInfo3"></v-monthly-reliability>
                        <span v-if="!ringInfo3.value">暂无数据</span>
                    </div>
                    <div class="healthy-table">
                        <div class="tabs flex">
                            <button class="tab" :class="{active: !activeIndex}" @click="tabListFn(0)">事件信息</button>
                            <button class="tab" :class="{active: activeIndex}" @click="tabListFn(1)">测点状态</button>
                        </div>
                        <div class="tables">
                            <v-search-list v-show="!activeIndex" :other="alarmTable.other" :label="alarmTable.label" :list="alarmTable.list" v-on:receive="btnFn"></v-search-list>
                            <v-search-list v-show="activeIndex" :other="testTable.other" :label="testTable.label" :list="testTable.list"></v-search-list>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fans flex">
                <div class="fan flex" v-for="(item,index) in fanInfo">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name" v-bind:class="stationStatus[item.status-1]" @click="goToDevice(item.type,item.deviceId,item.deviceUuid)">{{item.name}}</button>
                </div>
            </div>
            <v-train :select="true"></v-train>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 8, //每页显示数量
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
                        'width': 15,
                        'value': 'statusValue',
                        'status': 'status'
                    }, {
                        'label': '操作',
                        'width': 25,
                        'btn': [{ 'workOrder': true, 'name': '工单', 'fn': 'goToOrderFn' }, { 'more': true, 'name': '更多事件', 'fn': 'goToMoreFn' }]
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
                        'label': '时间',
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
                ringInfo1: {
                    showInfo: {
                        title: '自动扶梯',
                        color: '#32b16c',
                        fontSize: '0.18rem'
                    },
                    value: '',
                    size: {
                        width: '2.2rem',
                        height: '2.2rem'
                    },
                    id: 'health1'
                },
                ringInfo2: {
                    showInfo: {
                        title: '风机',
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
                ringInfo3: {
                    showInfo: {
                        title: '站台门',
                        color: '#13b5b1',
                        fontSize: '0.18rem'
                    },
                    value: '',
                    size: {
                        width: '2.2rem',
                        height: '2.2rem'
                    },
                    id: 'health3'
                },
                //车站状态
                stationStatus: ['bg-error', 'bg-warn', 'bg-normal', 'bg-stop', 'bg-offline'],
                //请求车站设备状态给后台传的参数
                uuidStr: '',
                //扶梯和站台门的信息 type==2站台门   type==3 扶梯
                stationInfo: [{
                    type: 2,
                    deviceUuid: '7b93ec3c0975ad43bbb431dba268123d',
                    deviceId: '602',
                    x: '2.9',
                    y: '4.82',
                    status: "",
                    name: 'PGYPBM501'
                }, {
                    type: 2,
                    deviceUuid: '7b93ec3c0975ad43bbb431dba268123d',
                    deviceId: '602',
                    x: '5.5',
                    y: '3.2',
                    status: "",
                    name: 'PGYPBM501'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '5.8',
                    y: '2.53',
                    status: "3",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '4.8',
                    y: '2.2',
                    status: "4",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '4.2',
                    y: '1.8',
                    status: "5",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '2.2',
                    y: '3',
                    status: "1",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '7.3',
                    y: '1.5',
                    status: "4",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '8.2',
                    y: '1.7',
                    status: "3",
                    name: '22-2'
                }, {
                    type: 3,
                    deviceUuid: 'a97cb605136d5bf01e9bcf428ef6c484',
                    deviceId: '334',
                    x: '6.6',
                    y: '1',
                    status: "2",
                    name: '22-2'
                }],
                //风机的信息 type==1风机
                fanInfo: [{
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "1",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "3",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "2",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "5",
                    name: 'PGYFJ601'
                }]
            };
        },
        computed: {
            ...mapState(['stationId'])
        },
        watch: {
            stationId() {
                this.getAvailabilityFn();
                this.getEventInfoFn();
            }
        },
        created() {
            this.getAvailabilityFn();
            this.getEventInfoFn();
            this.getStatusFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_deviceInfo']),
            goToDevice(deviceType, deviceId, deviceUuid) {
                this._deviceInfo({ 'deviceId': deviceId, 'deviceUuid': deviceUuid });
                if(deviceType == 1) {
                    //风机
                    this.$router.push('faninfo');
                } else if(deviceType == 2) {
                    //站台门
                    this.$router.push('shielddoorinfo');
                } else {
                    //扶梯
                    this.$router.push('escalatorinfo');
                }
            },
            getAvailabilityFn() {
                this._getList({
                    ops: { id: this.stationId },
                    api: 'availability',
                    callback: res => {
                        this.ringInfo1.value = res.ft;
                        this.ringInfo2.value = res.fj;
                        this.ringInfo3.value = res.ztm;
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
            btnFn(val) {
                this[val]();
            },
            //工单点击事件
            goToOrderFn() {
                this.$router.push('backlog');
            },
            //更多事件 点击事件
            goToMoreFn() {
                this.$router.push('alarmListDay');
            },
            //获取事件信息
            getEventInfoFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'stationId': this.stationId
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
                    'stationId': this.stationId
                };

                this._getList({
                    ops: ops,
                    api: 'pointStatus',
                    callback: res => {
                        this.testTable.list = res.rows;
                    }
                });
            },
            //获取车站设备uuid
            getStatusFn() {
                let uuid01 = '';
                let uuid02 = "";

                this.stationInfo.forEach(item => {
                    uuid01 += item.deviceUuid + ',';
                });
                this.fanInfo.forEach(item => {
                    uuid02 += item.deviceUuid + ',';
                });
                this.uuidStr = (uuid01 + uuid02).substr(0, (uuid01 + uuid02).length - 1);
                this.getStationsStatusFn();
            },
            getStationsStatusFn() {
                const ops = {
                    deviceUuids: this.uuidStr
                };

                this._getList({
                    ops: ops,
                    api: 'equimentOfStation',
                    callback: res => {
                        res.forEach(item => {
                            this.stationInfo.filter(item1 => {
                                if(item.uuid == item1.deviceUuid) {
                                    item1.status = item.status;
                                }
                            });
                            this.fanInfo.filter(item1 => {
                                if(item.uuid == item1.deviceUuid) {
                                    item1.status = item.status;
                                }
                            });
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .device-3d {
        position: absolute;
        left: -0.1rem;
        top: 0.75rem;
        width: 10.88rem;
        height: 7.08rem;
        background: url('~assets/siteInfo/bg_station.png') no-repeat;
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
        &-body {
            width: 8.24rem;
            height: 7.9rem;
            // border-radius: 0.2rem;
            // background-color: #404455;
            position: absolute;
            left: 0.31rem;
            top: 0.6rem;
            .healthy-charts {
                height: 2.68rem;
                justify-content: space-around;
                padding: 0 0.3rem;
                span {
                    color: #fff;
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
                // &.error {
                //     background-color: #ff0000;
                // }
                // &.warn {
                //     background-color: #f9af00;
                // }
                // &.normal {
                //     background-color: #13c613;
                // }
            }
        }
    }
</style>