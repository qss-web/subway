<template>
    <div class="mine">
        <div class="cards">
            <v-card-container class="card-userinfo" title="用户信息" light="true">
                <v-userinfo @edit="userinfoType = 0" v-if="userinfoType"></v-userinfo>
                <v-edit-userinfo @save="userinfoType = 1" v-if="!userinfoType"></v-edit-userinfo>
            </v-card-container>
            <v-card-container class="card-todolist" title="待办事项" goKey="unfinished" light="true">
                <v-mine-todolist></v-mine-todolist>
            </v-card-container>
            <v-card-container class="card-qualification" goKey="qualification" title="设备关注度" light="true">
                <v-mine-qualification></v-mine-qualification>
            </v-card-container>
            <v-card-container class="card-alarm-event" goKey="alarmEvent" title="预警事件" light="true">
                <v-mine-alarm-event></v-mine-alarm-event>
            </v-card-container>
            <v-card-container class="card-alarm-reason" goKey="alarmReason" title="故障原因分析" light="true">
                <v-mine-alarm-reason></v-mine-alarm-reason>
            </v-card-container>
            <div class="tabs-wrapper">
                <div class="tabs flex">
                    <button class="tab" :class="{active: activeIndex == 0}" @click="activeIndex = 0">今日预警信息</button>
                    <button class="tab" :class="{active: activeIndex == 1}" @click="activeIndex = 1">当前设备故障</button>
                    <button class="tab" :class="{active: activeIndex == 2}" @click="activeIndex = 2">今日巡检</button>
                </div>
                <div class="tables">
                    <div v-show="activeIndex == 0">
                        <el-table :data="alarmInfo.row" style="width: 100%; background-color: #eff0f2;" stripe height="2.5rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column prop="index" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="station" label="车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="device" label="设备名称" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="time" label="时间" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="desc" label="事件描述" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="system" label="操作" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn1">更多</a>
                        </div>
                        <!-- <el-pagination :page-size="alarmInfo.page.offset" @current-change="alarmChangePage" class="pagination" layout="prev, slot, next" :total="alarmInfo.page.total" prev-text="上一页" next-text="下一页">
                            <span>{{alarmInfo.page.current}}/{{Math.ceil(alarmInfo.page.total / alarmInfo.page.offset)}}</span>
                        </el-pagination> -->
                    </div>
                    <div v-show="activeIndex == 1">
                        <el-table :data="deviceInfo.row" width="100" style="width: 100%; background-color: #eff0f2;" stripe height="2.6rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column prop="index" width="80" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultNo" width="150" label="故障单号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="line" width="120" label="线路" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="station" width="100" label="车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceLocation" label="设备安装位置" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceNo" width="110" label="设备编号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceNo" width="110" label="设备名称" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultSys" width="110" label="故障系统" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultDesc" width="110" label="故障现象" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn2">更多</a>
                        </div>
                        <!-- <el-pagination :page-size="deviceInfo.page.offset" @current-change="deviceChangePage" class="pagination" layout="prev, slot, next" :total="deviceInfo.page.total" prev-text="上一页" next-text="下一页">
                            <span>{{deviceInfo.page.current}}/{{Math.ceil(deviceInfo.page.total / deviceInfo.page.offset)}}</span>
                        </el-pagination> -->
                    </div>
                    <div v-show="activeIndex == 2">
                        <el-table :data="checkInfo.row" style="width: 100%; background-color: #eff0f2;" stripe height="2.6rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column prop="index" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="type" label="类别" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="stationName" label="安装车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceNo" label="设备编号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="date" label="日期" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="arriveTime" label="到达时间" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="checkStatus" label="巡检状态" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceStatus" label="设备状态" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="operator" label="执行人" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn3">更多</a>
                        </div>
                        <!-- <el-pagination :page-size="checkInfo.page.offset" @current-change="checkChangePage" class="pagination" layout="prev, slot, next" :total="checkInfo.page.total" prev-text="上一页" next-text="下一页">
                            <span>{{checkInfo.page.current}}/{{Math.ceil(checkInfo.page.total / checkInfo.page.offset)}}</span>
                        </el-pagination> -->
                    </div>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                userinfoType: 1, // 0展示 1编辑
                alarmTotal: {
                    page: {
                        current: 1,
                        offset: 4,
                        total: 7
                    },
                    row: [{
                        index: '1',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '2',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '3',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '4',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '1',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '2',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }, {
                        index: '3',
                        time: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        device: '风机',
                        system: '无',
                        desc: '今日预警信息',
                        status: '正常'
                    }]
                },
                deviceTotal: {
                    page: {
                        current: 1,
                        offset: 4,
                        total: 7
                    },
                    row: [{
                        index: '1',
                        faultNo: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        deviceLocation: '位置',
                        deviceNo: 'A111',
                        faultSys: '风机',
                        faultDesc: '无法运行'
                    }, {
                        index: '2',
                        faultNo: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        deviceLocation: '位置',
                        deviceNo: 'A111',
                        faultSys: '风机',
                        faultDesc: '无法运行'
                    }, {
                        index: '3',
                        faultNo: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        deviceLocation: '位置',
                        deviceNo: 'A111',
                        faultSys: '风机',
                        faultDesc: '无法运行'
                    }, {
                        index: '4',
                        faultNo: '2018-01-01',
                        line: '6',
                        station: '田村站',
                        deviceLocation: '位置',
                        deviceNo: 'A111',
                        faultSys: '风机',
                        faultDesc: '无法运行'
                    }]
                },
                checkTotal: {
                    page: {
                        current: 1,
                        offset: 4,
                        total: 7
                    },
                    row: [{
                        index: '1',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '2',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '3',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '4',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '1',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '2',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }, {
                        index: '3',
                        type: '风机',
                        stationName: '田村站',
                        deviceNo: 'A111',
                        date: '2018-01-01',
                        arriveTime: '03:02',
                        checkStatus: '正常',
                        deviceStatus: '正常',
                        operator: 'LINTAO'
                    }]
                }
            };
        },
        computed: {
            alarmInfo() {
                return {
                    page: {
                        current: this.alarmTotal.page.current,
                        offset: this.alarmTotal.page.offset,
                        total: this.alarmTotal.page.total
                    },
                    row: this.alarmTotal.row.slice((this.alarmTotal.page.current - 1) * this.alarmTotal.page.offset, this.alarmTotal.page.current * this.alarmTotal.page.offset)
                };
            },
            deviceInfo() {
                return {
                    page: {
                        current: this.deviceTotal.page.current,
                        offset: this.deviceTotal.page.offset,
                        total: this.deviceTotal.page.total
                    },
                    row: this.deviceTotal.row.slice((this.deviceTotal.page.current - 1) * this.deviceTotal.page.offset, this.deviceTotal.page.current * this.deviceTotal.page.offset)
                };
            },
            checkInfo() {
                return {
                    page: {
                        current: this.checkTotal.page.current,
                        offset: this.checkTotal.page.offset,
                        total: this.checkTotal.page.total
                    },
                    row: this.checkTotal.row.slice((this.checkTotal.page.current - 1) * this.checkTotal.page.offset, this.checkTotal.page.current * this.checkTotal.page.offset)
                };
            }
        },
        methods: {
            rowClassName({ rowIndex }) {
                if(rowIndex % 2 == 1) {
                    return 'even';
                }
                return '';
            },
            alarmChangePage(page) {
                this.alarmTotal.page.current = page;
            },
            deviceChangePage(page) {
                this.deviceTotal.page.current = page;
            },
            checkChangePage(page) {
                this.checkTotal.page.current = page;
            },
            goToMoreFn1() {
                this.$router.push('/alarmListDay');
            },
            goToMoreFn2() {
                this.$router.push('/backlog');
            },
            goToMoreFn3() {
                this.$router.push('/inspect');
            }
        }
    };
</script>


<style lang="less" scoped>
    .moreShow {
        a {
            display: block;
            float: right;
            width: 1rem;
            height: 0.38rem;
            line-height: 0.38rem;
            background: #54596d;
            text-align: center;
            border-radius: 3px;
            font-size: 0.18rem;
            color: #fff;
            margin-top: 0.24rem;
            margin-right: 0.4rem;
        }
    }
    .cards {
        .card-userinfo {
            left: 0.28rem;
            top: 0.14rem;
            width: 5.14rem;
            height: 4.87rem;
        }
        .card-todolist {
            top: 0.12rem;
            left: 5.54rem;
            width: 8.74rem;
            height: 4.87rem;
        }
        .card-qualification {
            top: 0.12rem;
            right: 0.14rem;
            width: 4.58rem;
            height: 3rem;
        }
        .card-alarm-event {
            top: 3.24rem;
            right: 0.14rem;
            width: 4.58rem;
            height: 3rem;
        }
        .card-alarm-reason {
            top: 6.34rem;
            right: 0.14rem;
            width: 4.58rem;
            height: 2.64rem;
        }
        .tabs-wrapper {
            left: 0.28rem;
            top: 5.18rem;
            width: 13.98rem;
            height: 3.8rem;
            position: absolute;
            font-size: 0.22rem;
            .tabs {
                height: 0.4rem;
                width: 100%;
                align-items: flex-end;
                padding-left: 0.2rem;
                .tab {
                    background-color: #2f4554;
                    color: #fff;
                    height: 0.4rem;
                    border-radius: 0.1rem 0.1rem 0 0;
                    padding: 0 0.1rem;
                    margin: 0 0.04rem;
                    line-height: 0.4rem;
                    width: 2rem;
                    text-align: center;

                    &.active {
                        background-color: #d7dbde;
                        color: #000;
                    }
                }
            }
            .tables {
                width: 100%;
                height: 3.4rem;
                background-color: #d7dbde;
                border-radius: 0.04rem;
                box-shadow: 0px 2px 4px 2px #333;
                padding: 0.06rem;
                box-shadow: 0 0.1rem 0.5rem 0.01rem rgba(0, 0, 0, 0.4);
                .pagination {
                    text-align: center;
                    padding-top: 0.3rem;
                }
            }
        }
    }
</style>

<style>
    .mine .tables td,
    .mine .tables th {
        height: 0.5rem;
        padding: 0;
        font-size: 0.22rem;
        color: #000;
        background: transparent !important;
    }

    .mine .tables .header-row {
        background-color: #bcc2da;
    }

    .mine .tables tr.even {
        background-color: #e4e8f7;
    }
</style>



