<template>
    <div>
        <div>
            <div class="button-group flex">
                <button class="btn-name" v-on:click="goInfoFn" style="margin-left: 0;">{{alarmOtherInfos.deviceName}}</button>
                <button class="btn-name" style="cursor: default;">{{alarmOtherInfos.deviceType}}</button>
                <button class="btn-alarm" style="cursor: default;" v-bind:class="colorStatus[alarmOtherInfos.deviceStatus-1]">{{statusShow[alarmOtherInfos.deviceStatus-1]}}</button>
            </div>
            <div class="alarm-reason" v-if="alarmInfos.length!=0">
                <div class="alarm-reason-title">预警原因</div>
                <ul class="alarm-reason-body">
                    <li v-for="(item,index) in alarmInfos">{{index+1}}、{{item}}</li>
                </ul>
            </div>
            <div class="device-3d bg-3d-02">
                <v-tag v-on:onclick="escalatorFilterFn(item.fixedId)" v-for="(item,index) in escalatorInfo" name="line" :type="item.type" :status="item.status" :x="item.x" :y="item.y">{{item.name}}</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日设备健康监测指标</button>
                <button class="device-healthy-monitor" v-on:click="monitorFn" v-if="isMonitor">监测</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-ring-diagram id="runIndex1" v-if="showValue.yxsj" title="运行时间" :time="showValue.yxsj+'小时'" :showData="test1" :size="size" :setStyle="style"></v-ring-diagram>
                        <span v-if="!showValue.yxsj">0小时<i>运行时间</i></span>
                        <v-monthly-reliability v-if="ringInfo.value" v-bind:ringInfo="ringInfo"></v-monthly-reliability>
                        <span v-if="!ringInfo.value">0%<i>{{ringInfo.showInfo.title}}</i></span>
                        <v-ring-diagram id="runIndex2" v-if="showValue.yjsj" title="预警事件" :time="showValue.yjsj+'次'" :showData="test2" :size="size" :setStyle="style"></v-ring-diagram>
                        <span v-if="!showValue.yjsj">0次<i>预警事件</i></span>
                    </div>
                    <div class="healthy-table">
                        <div class="tabs flex">
                            <button class="tab" :class="{active: !activeIndex}" @click="tabListFn(0)">事件信息</button>
                            <button class="tab" :class="{active: activeIndex}" @click="tabListFn(1)">测点状态</button>
                        </div>
                        <div class="tables">
                            <div v-show="!activeIndex">
                                <v-search-list :other="alarmTable.other" :label="alarmTable.label" :list="alarmTable.list"></v-search-list>
                                <div class=" pagination ">
                                    <el-pagination :page-size=" pageSize01 " @current-change="changePages01 " :current-page="currentPage01" layout="prev, slot, next " :total="pageNumber01" prev-text="上一页 " next-text="下一页 ">
                                        <span>{{currentPage01}}/{{totalPage01}}</span>
                                    </el-pagination>
                                </div>
                            </div>
                            <div v-show="activeIndex">
                                <v-search-list v-on:receive="warnChartFn" :other="testTable.other" :label="testTable.label" :list="testTable.list"></v-search-list>
                                <div class=" pagination ">
                                    <el-pagination :page-size=" pageSize02 " @current-change="changePages02 " :current-page="currentPage02" layout="prev, slot, next " :total="pageNumber02" prev-text="上一页 " next-text="下一页 ">
                                        <span>{{currentPage02}}/{{totalPage02}}</span>
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <v-train></v-train>
        </div>
        <v-goback></v-goback>
        <el-dialog class="g-box-el" :visible.sync="isShowPopup" width="98%" :fullscreen="isFullscreen" :show-close="false">
            <a class="g-isZoom" href="javascript:;" v-on:click="maximizationFn" v-if="isFullscreen">
                <i class="el-icon-minus" style="font-size: 0.22rem;"></i>
            </a>
            <a class="g-isZoom" href="javascript:;" v-on:click="maximizationFn" v-else>
                <img src="~assets/siteInfo/max.png" />
            </a>
            <a class="g-isClose" href="javascript:;" v-on:click="closeFn">
                <i class="el-icon-close" style="font-size: 0.26rem;"></i>
            </a>
            <v-alarm-popup v-bind:isFull="isFullscreen" v-if="isShowPopup"></v-alarm-popup>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                isFullscreen: false,
                currentPage01: 1, //当前页数
                pageSize01: 7, //每页显示数量
                totalPage01: 0,//总页数
                pageNumber01: 0,//总条目数
                currentPage02: 1, //当前页数
                pageSize02: 7, //每页显示数量
                totalPage02: 0,//总页数
                pageNumber02: 0,//总条目数
                //预警信息
                alarmInfos: [],
                statusShow: ['一级预警', '二级预警', '运行', '断网', '停机'],
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
                    value: '',
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
                        'width': 10,
                        'value': 'index'
                    }, {
                        'label': '设备名称',
                        'width': 15,
                        'value': 'equName',
                        'clickFn': true
                    }, {
                        'label': '时间',
                        'width': 25,
                        'value': 'time'
                    }, {
                        'label': '事件描述',
                        'width': 35,
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
                        'value': 'repairAdvice'
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
                    status: "",
                    name: '右扶手带',
                    x: '1.8',
                    y: '1.4',
                    type: 1
                }, {
                    fixedId: '左扶手带',
                    status: "",
                    name: '左扶手带',
                    x: '2',
                    y: '2.5',
                    type: 1
                }, {
                    fixedId: '梯级链涨紧轮',
                    status: "",
                    name: '梯级链涨紧轮',
                    x: '1',
                    y: '3.5',
                    type: 1
                }, {
                    fixedId: '主驱动轮',
                    status: "",
                    name: '主驱动轮',
                    x: '8.6',
                    y: '1.4',
                    type: 3
                }, {
                    fixedId: '电梯振动',
                    status: "",
                    name: '电梯振动',
                    x: '8.5',
                    y: '2.6',
                    type: 4
                }, {
                    fixedId: '齿轮箱振动',
                    status: "",
                    name: '齿轮箱振动',
                    x: '8.3',
                    y: '3',
                    type: 5
                }, {
                    fixedId: '地脚振动',
                    status: "",
                    name: '地脚振动',
                    x: '7.7',
                    y: '3.4',
                    type: 2
                }],
                sectionName: '',//部位名称
                isMonitor: true,
                timeOut: ''
            };
        },
        computed: {
            ...mapState(['deviceInfo', 'itemObj', 'isPowerShow'])
        },
        destroyed() {
            clearTimeout(this.timeOut);
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getEquRuninfoFn();
            this.getEventInfoFn();
            this.getStatusFn();
            if(this.isPowerShow && this.isPowerShow.length > 3) {
                this.powerControl = eval(this.isPowerShow)[4];
                //监测
                if(!this.powerControl[4].flag) {
                    this.isMonitor = false;
                }
            }
        },
        methods: {
            ...mapActions(['_getInfo', '_getList']),
            ...mapMutations(['_warnChart', '_equInfo', '_currentIndex']),
            maximizationFn() {
                if(this.isFullscreen) {
                    this.isFullscreen = false;
                } else {
                    this.isFullscreen = true;
                }
            },
            monitorFn() {
                this.$router.push({ path: 'monitor' });
            },
            getEquRuninfoFn() {
                this._getInfo({
                    ops: {
                        // "deviceInLineId": "6号线西延",  //线路
                        // "deviceInStationId": "苹果园站",  //站点
                        "deviceUuid": this.deviceInfo.deviceUuid  //设备uuid
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
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
                this.activeIndex = value;
                if(value) {
                    this.sectionName = "";
                    this.getPointStatusFn();
                } else {
                    this.getEventInfoFn();
                }
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
                    'deviceUuid': this.deviceInfo.deviceUuid
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
            //部位点击筛选测点状态列表
            escalatorFilterFn(item) {
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
                this.sectionName = item;
                this.activeIndex = 1;
                this.getPointStatusFn(item);
            },
            //测点信息翻页
            changePages02(val) {
                if(this.timeOut) {
                    clearTimeout(this.timeOut);
                }
                this.currentPage02 = val;
                if(this.sectionName) {
                    this.getPointStatusFn(this.sectionName);
                } else {
                    this.getPointStatusFn();
                }
            },
            //获取测点信息
            getPointStatusFn(item) {
                const ops = {
                    'curPage': this.currentPage02,
                    'pageSize': this.pageSize02,
                    'deviceUuid': this.deviceInfo.deviceUuid
                };

                this._currentIndex(ops);

                if(item) {
                    Object.assign(ops, { 'sectionName': item });
                }

                this._getList({
                    ops: ops,
                    api: 'pointStatus',
                    callback: res => {
                        res.rows.forEach(item => {
                            if(item.currentValue) {
                                item.currentValue = parseFloat(item.currentValue).toFixed(2);
                            }
                        });
                        this.testTable.list = res.rows;
                        this.totalPage02 = res.total;//总页数
                        this.pageNumber02 = res.records;//总条目数

                        this.timeOut = setTimeout(() => {
                            this.getPointStatusFn(this.sectionName);
                        }, 3000);
                    }
                });
            },
            //预警信息
            warnChartFn() {
                this._getList({
                    ops: {
                        'pointUuid': this.itemObj.pouuid //'ca663ccdb90728a49daba918b172ebee'
                    },
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
            },
            //点击进入设备详情页
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
            closeFn() {
                this.isShowPopup = false;
                this.isFullscreen = false;
            }
        }
    };
</script>
<style lang="less" scoped>
    .button-group {
        position: absolute;
        left: 0.2rem;
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
        width: 3.68rem;
        background-color: #6d7389;
        color: #fff;
        font-size: 0.16rem;
        position: absolute;
        left: 5.8rem;
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
    .pagination {
        margin-top: -0.12rem;
        text-align: center;
        span {
            color: #fff;
        }
    }
</style>