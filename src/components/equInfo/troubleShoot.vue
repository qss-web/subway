<template>
    <div class="txt-center">
        <div class="flex">
            <div class="showChart">
                <v-pie-chart id="test1" v-bind:chartData="test1"></v-pie-chart>
            </div>
            <div class="showChart">
                <v-pie-chart id="test2" v-bind:chartData="test2"></v-pie-chart>
            </div>
            <div class="showChart">
                <v-pie-chart id="test3" v-bind:chartData="test3"></v-pie-chart>
            </div>
        </div>
        <v-search-list :other="otherInfo" :label="info1" :list="equList.data"></v-search-list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                test1: [{
                    name: '故障维修',
                    data: [{ name: '驱动电机', color: '#c23531', y: 29.9 },
                    { name: '齿轮箱', color: '#2f4554', y: 70 },
                    { name: '主驱动轮', color: '#61a0a8', y: 45 },
                    { name: '从驱动轮', color: '#d48265', y: 69 },
                    { name: '扶手带', color: '#749f83', y: 19 }]
                }],
                test2: [{
                    name: '故障维修',
                    data: [{ name: '轴承滚动体', color: '#c23531', y: 29.9 },
                    { name: '轴承保持架', color: '#2f4554', y: 70 },
                    { name: '轴承跑套', color: '#61a0a8', y: 45 },
                    { name: '轴承润滑不良', color: '#d48265', y: 69 },
                    { name: '减速箱断齿', color: '#91c7ae', y: 19 },
                    { name: '减速箱磨损', color: '#749f83', y: 19 }]
                }],
                test3: [{
                    name: '故障维修',
                    data: [{ name: '巡检', color: '#c23531', y: 29.9 },
                    { name: '综控', color: '#2f4554', y: 70 },
                    { name: '预警', color: '#61a0a8', y: 45 }]
                }],
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 9 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '故障单号',
                    'width': 10,
                    'value': 'date'
                }, {
                    'label': '线路',
                    'width': 6,
                    'value': 'station'
                }, {
                    'label': '车站',
                    'width': 6,
                    'value': 'station'
                }, {
                    'label': '设备安装位置',
                    'width': 18,
                    'value': 'bySys'
                }, {
                    'label': '设备编号',
                    'width': 12,
                    'value': 'equName'
                }, {
                    'label': '设备名称',
                    'width': 14,
                    'value': 'equName'
                }, {
                    'label': '故障系统',
                    'width': 14,
                    'value': 'failureCause'
                }, {
                    'label': '故障现象',
                    'width': 12,
                    'value': 'repairTime'
                }, {
                    'label': '修复时间',
                    'width': 12,
                    'value': 'repairTime'
                }, {
                    'label': '维修人员',
                    'width': 12,
                    'value': 'repairTime'
                }, {
                    'label': '修复确认',
                    'width': 12,
                    'value': 'infoSources'
                }],
                equList: {
                    total: 9,
                    data: [{
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }]
                }
            };
        },
        created() {
            this.infoFaultFn();
            this.infoFaultListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            infoFaultFn() {
                this._getList({
                    ops: {},
                    method: 'get',
                    api: 'infoFault',
                    callback: () => {

                    }
                });
            },
            infoFaultListFn() {
                this._getList({
                    ops: {},
                    method: 'get',
                    api: 'infoFaultList',
                    callback: () => {

                    }
                });
            }
        }

    };
</script>

<style lang="less" scoped>
    .showChart {
        padding: 0.28rem 0;
        flex: 1;
    }
</style>

