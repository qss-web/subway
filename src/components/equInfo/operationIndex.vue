<template>
    <div class="txt-center">
        <div class="flex">
            <v-ring-diagram id="runIndex" title="累计运行时间" :time="98"></v-ring-diagram>
            <v-pie-chart></v-pie-chart>
            <!-- <div class="max-time">最长无故障运行时间</div> -->
            <div class="min-time">最短无故障运行时间</div>
        </div>
        <ul class="dataShow">
            <li class="flex">
                <span>累计运行时间：1000小时</span>
                <span>累计运行次数：500次</span>
                <span>能耗统计：12500度</span>
            </li>
            <li class="flex">
                <span>平均无故障运行时间：100小时</span>
                <span>最长无故障运行时间：500小时</span>
                <span>最短无故障运行时间：125小时</span>
            </li>
        </ul>
        <v-search-list :other="otherInfo" :label="info1" :list="equList.data"></v-search-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 8 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它,4站点列表,5屏蔽门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '所属车站',
                    'width': 15,
                    'value': 'station'
                }, {
                    'label': '设备系统',
                    'width': 13,
                    'value': 'equSys'
                }, {
                    'label': '设备编号',
                    'width': 13,
                    'value': 'equNum'
                }, {
                    'label': '安装位置',
                    'width': 15,
                    'value': 'installPosition'
                }, {
                    'label': '设备状态',
                    'width': 15,
                    'value': 'equStatus'
                }, {
                    'label': '状态变更时间',
                    'width': 15,
                    'value': 'time'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '1',
                        station: '所属车站5',
                        equSys: '设备系统5',
                        equNum: '设备编号5',
                        installPosition: '安装位置5',
                        equStatus: '设备状态5',
                        time: '状态变更时间5'
                    }, {
                        num: '2',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '3',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '4',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '5',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '6',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '7',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '8',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '9',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
                    }, {
                        num: '10',
                        station: '所属车站',
                        equSys: '设备系统',
                        equNum: '设备编号',
                        installPosition: '安装位置',
                        equStatus: '设备状态',
                        time: '状态变更时间'
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
    .dataShow {
        li {
            span {
                flex: 1;
                height: 0.38rem;
                line-height: 0.38rem;
                font-size: 0.18rem;
                color: #2f4554;
            }
        }
        li:nth-child(1) {
            background: #bcc2da;
        }
        li:nth-child(2) {
            background: #d7dae9;
        }
    }
</style>

