<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
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
                        'add': false,
                        'export': true,
                        'delete': false,
                        'edit': false,
                        'download': false,
                        'import': false
                    },
                    'options': [{
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
                        'title': '月份',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '一月'
                        }, {
                            value: '2',
                            label: '二月'
                        }, {
                            value: '3',
                            label: '三月'
                        }, {
                            value: '4',
                            label: '四月'
                        }, {
                            value: '5',
                            label: '五月'
                        }, {
                            value: '6',
                            label: '六月'
                        }, {
                            value: '7',
                            label: '七月'
                        }, {
                            value: '8',
                            label: '八月'
                        }, {
                            value: '9',
                            label: '九月'
                        }, {
                            value: '10',
                            label: '十月'
                        }, {
                            value: '11',
                            label: '十一月'
                        }, {
                            value: '12',
                            label: '十二月'
                        }]
                    }],
                    popSave() { }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '所属线路',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '月份',
                    'width': 10,
                    'value': 'month'
                }, {
                    'label': '故障预警次数',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '设备数量',
                    'width': 10,
                    'value': 'total'
                }, {
                    'label': '综合排名',
                    'width': 10,
                    'value': 'rank'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'state'
                }],
                equList: {
                    total: 9,
                    data: [{
                        'num': '1',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '1',
                        'state': '优'
                    }, {
                        'num': '2',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '2',
                        'state': '优'
                    }, {
                        'num': '3',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '3',
                        'state': '优'
                    }, {
                        'num': '4',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '4',
                        'state': '优'
                    }, {
                        'num': '5',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '5',
                        'state': '优'
                    }, {
                        'num': '6',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '6',
                        'state': '优'
                    }, {
                        'num': '7',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '7',
                        'state': '优'
                    }, {
                        'num': '8',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '8',
                        'state': '优'
                    }, {
                        'num': '9',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '9',
                        'state': '优'
                    }, {
                        'num': '10',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '10',
                        'state': '优'
                    }, {
                        'num': '11',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '11',
                        'state': '优'
                    }, {
                        'num': '12',
                        'station': '金安桥站',
                        'line': '6号线',
                        'month': '1',
                        'faultNum': '2',
                        'total': '24',
                        'rank': '12',
                        'state': '优'
                    }]
                }
            };
        },
        props: ['list', 'label', 'checked'],
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
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
        margin: 0 auto 0 auto;
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
        border-top: 1px solid #587386;
        .title {
            background: #e5e8f7;
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
            padding: 0.1rem 0;
            background: #e5e8f7;
            border: 1px solid #587386;
            border-top: none;
        }
    }
</style>


