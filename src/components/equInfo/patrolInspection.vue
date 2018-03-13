<template>
    <div class="txt-center">
        <div class="flex">
            <div class="showChart">
                <v-ring-diagram id="runIndex1" title="累计运行时间" :time="showValue[0]" :showData="test1"></v-ring-diagram>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex2" title="平均无故障运行时间" :time="showValue[1]" :showData="test2"></v-ring-diagram>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex3" title="累积运行次数" :time="showValue[2]" :showData="test3"></v-ring-diagram>
            </div>
        </div>
        <v-search-list :other="otherInfo" :label="info1" :list="equList.data"></v-search-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showValue: ['20条', '400小时', '58次'],
                test1: [{
                    y: 360,
                    color: '#32b16c'
                }],
                test2: [{
                    y: 360,
                    color: '#63869e'
                }],
                test3: [{
                    y: 360,
                    color: '#13b5b1'
                }],
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
    .showChart {
        flex: 1;
        padding-bottom: 0.28rem;
    }
</style>

