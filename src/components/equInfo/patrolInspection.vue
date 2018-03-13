<template>
    <div class="txt-center">
        <div class="flex">
            <v-health-indicators class="operation-chart" id="health1" title="累计运行时间" :percent="98"></v-health-indicators>
            <div class="max-time">最长无故障运行时间</div>
            <div class="min-time">最短无故障运行时间</div>
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
                    'label': '类别',
                    'width': 10,
                    'value': 'sort'
                }, {
                    'label': '安装车站',
                    'width': 15,
                    'value': 'installStations'
                }, {
                    'label': '设备编号',
                    'width': 15,
                    'value': 'equNum'
                }, {
                    'label': '日期',
                    'width': 15,
                    'value': 'date'
                }, {
                    'label': '到达时间',
                    'width': 15,
                    'value': 'arrivalTime'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 19,
                    'value': 'record'
                }, {
                    'label': '执行人',
                    'width': 15,
                    'value': 'executor'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }, {
                        num: '1',
                        sort: '类别',
                        installStations: '安装车站',
                        equNum: '设备编号',
                        date: '日期',
                        arrivalTime: '到达时间',
                        record: '巡视巡检情况记录',
                        executor: '执行人'
                    }]
                }
            };
        }
    };
</script>

<style lang="less" scoped>
    .healthy-chart,
    .max-time,
    .min-time {
        flex: 1;
    }
</style>

