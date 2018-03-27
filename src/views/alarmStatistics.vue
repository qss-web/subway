<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <ul class="title">
                    <dl class="notice flex">
                        <dd class="g-red">二级预警：3次</dd>
                        <dd class="g-light-orange">一级预警：2次</dd>
                        <dd class="g-gray">断网：1次</dd>
                        <dd class="g-orange">全部：6次</dd>
                    </dl>
                </ul>
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data" v-on:receive="btnFn"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                    </el-pagination>
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
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '金安桥站'
                        }, {
                            value: '2',
                            label: '苹果园站'
                        }, {
                            value: '3',
                            label: '苹果园南路站'
                        }, {
                            value: '4',
                            label: '西黄村站'
                        }, {
                            value: '5',
                            label: '廖公庄站'
                        }, {
                            value: '6',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 1,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    popSave() { }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2 //列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '车站',
                    'width': 15,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 15,
                    'value': 'time'
                }, {
                    'label': '预警事件',
                    'width': 35,
                    'value': 'event'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'statusValue',
                    'status': 'status'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'monitor': true, 'name': '监测', 'fn': 'monitorFn' }]
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '1',
                        statusValue: '二级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '1',
                        statusValue: '二级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '1',
                        statusValue: '二级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '2',
                        statusValue: '一级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '2',
                        statusValue: '一级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '2',
                        statusValue: '一级预警'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '3',
                        statusValue: '断网'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '3',
                        statusValue: '断网'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '3',
                        statusValue: '断网'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '3',
                        statusValue: '断网'
                    }, {
                        num: '序号',
                        event: '苹果园南路站 A出入口下段 PGN-FT-A-1 扶梯故障扶手带断裂',
                        station: '苹果园南站',
                        time: '2018.03.20 10:24:30',
                        equName: '扶梯',
                        status: '3',
                        statusValue: '断网'
                    }]
                }
            };
        },
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            },
            //列表子组件按钮
            btnFn(val) {
                this[val]();
            },
            //监测
            monitorFn() {
                // alert('监测');
            }
        }
    };
</script>

<style scoped lang="less">
    .wholeWrap {
        padding: 0.16rem 0 0.24rem 0;
    }
    .equWrap {
        width: 99.4%;
        margin: 0 auto;
        padding: 0.18rem 0 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        min-height: 7.8rem;
        .title {
            background: #666b79;
            position: relative;
            height: 0.52rem;
            border: 1px solid #587386;
            border-bottom: none;
            .notice {
                position: absolute;
                right: 1rem;
                top: 0;
                dd {
                    flex: auto;
                    font-size: 0.2rem;
                    margin-left: 0.26rem;
                    height: 0.52rem;
                    line-height: 0.52rem;
                }
            }
        }
        .pagination {
            text-align: center;
            padding: 0.07rem 0;
            background: #45484f;
            border: 1px solid #587386;
            border-top: none;
        }
    }
</style>


