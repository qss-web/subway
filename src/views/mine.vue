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
                    <button class="tab" :class="{active: activeIndex == 0}" @click="tabFn(0)">今日预警信息</button>
                    <button class="tab" :class="{active: activeIndex == 1}" @click="tabFn(1)">当前设备故障</button>
                    <button class="tab" :class="{active: activeIndex == 2}" @click="tabFn(2)">今日巡检</button>
                </div>
                <div class="tables">
                    <div v-show="activeIndex == 0">
                        <el-table :data="equList0" style="width: 100%; background-color: #eff0f2;" stripe height="2.5rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column type="index" width="50" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="station" label="车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equName" label="设备名称" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="time" label="时间" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="alarmEvent" label="预警事件" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="statusValue" label="状态" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="system" label="操作" align="center" show-overflow-tooltip>
                                <template scope="scope">
                                    <span style="cursor: pointer" v-on:click="editBtn(scope.row.keyId)">【监测】</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn1">更多</a>
                        </div>
                    </div>
                    <div v-show="activeIndex == 1">
                        <el-table :data="equList1" width="100" style="width: 100%; background-color: #eff0f2;" stripe height="2.6rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column type="index" width="50" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultNum" width="150" label="故障单号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="line" width="120" label="线路" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="station" width="100" label="车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equPos" label="设备安装位置" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equNum" width="110" label="设备编号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equName" width="110" label="设备名称" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultSys" width="110" label="故障系统" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="faultDis" width="110" label="故障现象" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn2">更多</a>
                        </div>
                    </div>
                    <div v-show="activeIndex == 2">
                        <el-table :data="equList2" style="width: 100%; background-color: #eff0f2;" stripe height="2.6rem" :row-class-name="rowClassName" header-row-class-name="header-row">
                            <el-table-column type="index" width="50" label="序号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="line" label="线路" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="station" label="安装车站" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equNum" label="设备编号" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="date" label="日期" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="arriveTime" label="到达时间" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="status" label="巡检状态" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equStatus" label="巡视巡检情况记录" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="执行人" align="center" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="moreShow">
                            <a href="javascript:;" v-on:click="goToMoreFn3">更多</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
    </div>

</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import { formatDate } from '../utils';
    export default {
        data() {
            return {
                equList0: [], //今日预警信息
                equList1: [], //当前设备故障
                equList2: [], //今日巡检
                activeIndex: 0,
                userinfoType: 1, // 0展示 1编辑
                currentPage: 1,
                pageSize: 4
            };
        },
        computed: {},
        created() {
            this.getTimelyAlarmListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_itemObj']),
            rowClassName({ rowIndex }) {
                if(rowIndex % 2 == 1) {
                    return 'even';
                }
                return '';
            },
            tabFn(val) {
                this.activeIndex = val;
                if(val == '0') {
                    this.getTimelyAlarmListFn();
                } else if(val == '1') {
                    this.getBacklogFn();
                } else if(val == '2') {
                    this.getCheckRatioListFn();
                }
            },
            goToMoreFn1() {
                this._itemObj('');
                this.$router.push('/alarmListDay');
            },
            goToMoreFn2() {
                this.$router.push('/backlog');
            },
            goToMoreFn3() {
                this.$router.push('/inspect');
            },
            getTimelyAlarmListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'startTime': formatDate('', 2) + ' 00:00:00',
                    'endTime': formatDate('', 2) + ' 23:59:59'
                };

                this._getList({
                    ops: ops,
                    api: 'timelyAlarmList',
                    callback: res => {
                        this.equList0 = res.rows;
                    }
                });
            },
            getBacklogFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    // 'startTime': formatDate('', 2) + ' 00:00:00',
                    // 'endTime': formatDate('', 2) + ' 23:59:59',
                    'isTodo': '1'
                };

                this._getList({
                    ops: ops,
                    api: 'backlogList',
                    callback: res => {
                        this.equList1 = res.rows;
                    }
                });
            },
            getCheckRatioListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'startTime': formatDate('', 2) + ' 00:00:00',
                    'endTime': formatDate('', 2) + ' 23:59:59'
                };

                this._getList({
                    ops: ops,
                    api: 'checkRatioList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList2 = res.rows;
                    }
                });
            },
            editBtn() {
                this.$router.push({ path: 'monitor' });
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



