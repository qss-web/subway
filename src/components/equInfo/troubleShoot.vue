<template>
    <div class="txt-center">
        <div class="flex">
            <div class="showChart">
                <v-pie-chart id="test1"></v-pie-chart>
            </div>
            <div class="showChart">
                <v-pie-chart id="test2"></v-pie-chart>
            </div>
            <div class="showChart">
                <v-pie-chart id="test3"></v-pie-chart>
            </div>
        </div>
        <v-search-list :other="otherInfo" :label="info1" :list="equList.data"></v-search-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 9 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它,4站点列表,5屏蔽门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'num'
                }, {
                    'label': '日期',
                    'width': 10,
                    'value': 'date'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '所属系统',
                    'width': 12,
                    'value': 'bySys'
                }, {
                    'label': '设备名称',
                    'width': 12,
                    'value': 'equName'
                }, {
                    'label': '故障现象',
                    'width': 14,
                    'value': 'failureCause'
                }, {
                    'label': '故障处理情况',
                    'width': 12,
                    'value': 'troubleshoot'
                }, {
                    'label': '修复时间',
                    'width': 12,
                    'value': 'repairTime'
                }, {
                    'label': '信息来源',
                    'width': 12,
                    'value': 'infoSources'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '1',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '2',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '3',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '4',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '5',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '6',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '7',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '8',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '9',
                        date: '日期',
                        station: '车站',
                        bySys: '所属系统',
                        equName: '设备名称',
                        failureCause: '故障现象',
                        troubleshoot: '故障处理情况',
                        repairTime: '修复时间',
                        infoSources: '信息来源'
                    }, {
                        num: '10',
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
        }
    };
</script>

<style lang="less" scoped>
    .showChart {
        flex: 1;
        border: 1px solid red;
    }
</style>

