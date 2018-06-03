<template>
    <div>
        <div>
            <div class="device-3d bg-3d-01">
                <v-tag v-for="(item, index) in stationInfo" name="triangle" v-bind:status="item.status" v-bind:x="item.x" v-bind:y="item.y" @onclick="goToDevice(item.type,item.deviceId,item.deviceUuid)">{{item.name}}</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日车站健康监测完好率</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-monthly-reliability v-if="ringInfo1.value" v-bind:ringInfo="ringInfo1"></v-monthly-reliability>
                        <span v-if="!ringInfo1.value">0%<i>{{ringInfo1.showInfo.title}}</i></span>
                        <v-monthly-reliability v-if="ringInfo2.value" v-bind:ringInfo="ringInfo2"></v-monthly-reliability>
                        <span v-if="!ringInfo2.value">0%<i>{{ringInfo2.showInfo.title}}</i></span>
                        <v-monthly-reliability v-if="ringInfo3.value" v-bind:ringInfo="ringInfo3"></v-monthly-reliability>
                        <span v-if="!ringInfo3.value">0%<i>{{ringInfo3.showInfo.title}}</i></span>
                    </div>
                    <div class="healthy-table">
                        <div class="tabs flex">
                            <button class="tab" :class="{active: !activeIndex}" @click="tabListFn(0)">事件信息</button>
                            <button class="tab" :class="{active: activeIndex}" @click="tabListFn(1)">测点状态</button>
                        </div>
                        <div class="tables">
                            <div v-show="!activeIndex">
                                <v-search-list :other="alarmTable.other" :label="alarmTable.label" :list="alarmTable.list" v-on:receive="btnFn"></v-search-list>
                                <div class=" pagination ">
                                    <el-pagination :page-size=" pageSize01 " @current-change="changePages01 " layout="prev, slot, next " :total="pageNumber01" prev-text="上一页 " next-text="下一页 ">
                                        <span>{{currentPage01}}/{{totalPage01}}</span>
                                    </el-pagination>
                                </div>
                            </div>
                            <div v-show="activeIndex">
                                <dl class="notice flex">
                                    <dd class="error" v-on:click="statusFilter('1')">二级预警：{{equInfoCount[0]}}台</dd>
                                    <dd class="warn" v-on:click="statusFilter('2')">一级预警：{{equInfoCount[1]}}台</dd>
                                    <dd class="normal" v-on:click="statusFilter('3')">正常：{{equInfoCount[2]}}台</dd>
                                    <dd class="offline" v-on:click="statusFilter('5')">断网：{{equInfoCount[3]}}台</dd>
                                    <dd class="stop" v-on:click="statusFilter('4')">停机：{{equInfoCount[4]}}台</dd>
                                    <dd class="g-orange" v-on:click="statusFilter('')">全部：{{equTotal}}台</dd>
                                </dl>
                                <v-search-list :other="testTable.other" :label="testTable.label" :list="testTable.list"></v-search-list>
                                <div class=" pagination ">
                                    <el-pagination :page-size=" pageSize02 " @current-change="changePages02 " layout="prev, slot, next " :total="pageNumber02" prev-text="上一页 " next-text="下一页 ">
                                        <span>{{currentPage02}}/{{totalPage02}}</span>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fans flex">
                <div class="fan flex" v-for="(item,index) in fanInfo">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name" v-bind:class="stationStatus[item.status-1]" @click="goToDevice(item.type,item.deviceId,item.deviceUuid,item.status)">{{item.name}}</button>
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
                currentPage01: 1, //当前页数
                pageSize01: 7, //每页显示数量
                totalPage01: 0,//总页数
                pageNumber01: 0,//总条目数
                currentPage02: 1, //当前页数
                pageSize02: 6, //每页显示数量
                totalPage02: 0,//总页数
                pageNumber02: 0,//总条目数
                activeIndex: '',
                alarmTable: {
                    label: [{
                        'label': '序号',
                        'width': 10,
                        'value': 'index'
                    }, {
                        'label': '设备名称',
                        'width': 20,
                        'value': 'equName'
                    }, {
                        'label': '时间',
                        'width': 30,
                        'value': 'time'
                    }, {
                        'label': '事件描述',
                        'width': 25,
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
                        isSubShowColor: true,
                        btnCss: true
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
                        'value': 'repairAdvice'
                    }],
                    list: [],
                    other: {
                        style: 5,
                        isSubShowColor: true,
                        btnCss: true
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
                stationStatus: ['bg-error', 'bg-warn', 'bg-normal', 'bg-stop', 'bg-offline', 'bg-black'],
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
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '5.8',
                    y: '2.53',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '4.8',
                    y: '2.2',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '4.2',
                    y: '1.8',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '2.2',
                    y: '3',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '7.3',
                    y: '1.5',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '8.2',
                    y: '1.7',
                    status: "",
                    name: 'PGY501自动扶梯'
                }, {
                    type: 3,
                    deviceUuid: '89bde63589b192509119881cd6e962d5',
                    deviceId: '1030',
                    x: '6.6',
                    y: '1',
                    status: "",
                    name: 'PGY501自动扶梯'
                }],
                //风机的信息 type==1风机
                fanInfo: [{
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "",
                    name: 'PGYFJ601'
                }, {
                    type: 1,
                    deviceUuid: '34301c3bb7aa27c16ead4841a2f11512',
                    deviceId: '603',
                    status: "",
                    name: 'PGYFJ601'
                }],
                alarmVal: '',
                equInfoCount: [], //设备信息
                equTotal: 0, //设备信息全部
                timeOut:''
            };
        },
        computed: {
            ...mapState(['stationId'])
        },
        destroyed() {
            clearTimeout(this.timeOut);
        },
        watch: {
            stationId() {
                this.getAvailabilityFn();
                this.getEventInfoFn();
                this.getPointStatusFn();
            }
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getAvailabilityFn();
            this.getEventInfoFn();
            this.getStatusFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_deviceInfo', '_currentIndex']),
            goToDevice(deviceType, deviceId, deviceUuid, status) {
                if(status != 6) {
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
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
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
            //事件信息翻页
            changePages01(val) {
                this.currentPage01 = val;
                this.getEventInfoFn();
            },
            //获取事件信息
            getEventInfoFn() {
                const ops = {
                    'curPage': this.currentPage01,
                    'pageSize': this.pageSize01,
                    'stationId': this.stationId
                };

                this._currentIndex(ops);
                this._getList({
                    ops: ops,
                    api: 'eventInfo',
                    callback: res => {
                        this.alarmTable.list = res.rows;
                        this.totalPage01 = res.total;//总页数
                        this.pageNumber01 = res.records;//总条目数
                    }
                });
            },
            //测点信息翻页
            changePages02(val) {
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
                this.currentPage02 = val;
                this.getPointStatusFn(this.alarmVal);
            },
            //二级筛选
            statusFilter(val) {
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
                this.alarmVal = val;
                this.getPointStatusFn(this.alarmVal);
            },
            //获取测点信息
            getPointStatusFn(req) {
                const ops = {
                    'curPage': this.currentPage02,
                    'pageSize': this.pageSize02,
                    'stationId': this.stationId
                };

                this._currentIndex(ops);
                if(req) {
                    Object.assign(ops, { 'status': req });
                }

                this._getList({
                    ops: ops,
                    api: 'pointStatus',
                    callback: res => {
                        this.equTotal = 0;
                        this.equInfoCount = res.counts;
                        this.equInfoCount.forEach(item => {
                            this.equTotal += item;
                        });
                        this.testTable.list = res.rows;
                        this.totalPage02 = res.total;//总页数
                        this.pageNumber02 = res.records;//总条目数

                        this.timeOut = setTimeout(() => {
                            this.getPointStatusFn(this.alarmVal);
                        }, 3000);
                        
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
                            if(item.status == '-1') {
                                item.status = '6';
                            }
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
    .btn {
        a {
            background: none !important;
        }
    }
    .device-3d {
        position: absolute;
        left: -0.1rem;
        top: 0.75rem;
        width: 10.88rem;
        height: 7.08rem;
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
                    width: 2.2rem;
                    text-align: center;
                    line-height: 2.2rem;
                    display: block;
                    height: 2.2rem;
                    position: relative;
                    font-size: 0.24rem;
                    i {
                        height: 0.24rem;
                        line-height: 0.24rem;
                        font-style: normal;
                        font-size: 0.18rem;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
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
    .pagination {
        margin-top: -0.12rem;
        text-align: center;
        span {
            color: #fff;
        }
    }
    .notice {
        margin-bottom: -0.2rem;
        margin: 0 0.2rem -0.2rem 0.2rem;
        dd {
            flex: auto;
            font-size: 0.2rem;
            margin-left: 0.26rem;
            height: 0.54rem;
            line-height: 0.54rem;
            cursor: pointer;
            font-size: 0.16rem;
        }
    }
</style>