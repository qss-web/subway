<template>
    <div>
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <ul class="title">
                    <dl class="notice flex">
                        <dd class="g-red">一级报警：3次</dd>
                        <dd class="g-orange">二级报警：2次</dd>
                        <dd class="g-green">开机：4次</dd>
                        <dd class="g-brown">停机：2次</dd>
                        <dd class="g-gray">断网：1次</dd>
                    </dl>
                </ul>
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
                <div class="pagination">
                    <el-pagination background @current-change="changePages" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next " :total="equList.total "></el-pagination>
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
                            label: '唐宫庄站'
                        }, {
                            value: '6',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '设备类型一'
                        }, {
                            value: '2',
                            label: '测试类型二'
                        }]
                    }],
                    popSave(val) { }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 3 //列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它,4站点列表,5屏蔽门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '所属公司',
                    'width': 10,
                    'value': 'byCompany'
                }, {
                    'label': '线路',
                    'width': 20,
                    'value': 'line'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'equSys'
                }, {
                    'label': '位置',
                    'width': 20,
                    'value': 'address'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'equNum'
                }, {
                    'label': '设备名称',
                    'width': 11,
                    'value': 'equName'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'status'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
                    }, {
                        num: '序号',
                        byCompany: '所属公司',
                        line: '线路',
                        station: '车站',
                        equSys: '设备系统',
                        address: '位置',
                        equNum: '设备编号',
                        equName: '设备名称',
                        status: '状态'
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
            }
        }
    };
</script>

<style scoped lang="less">
    .equWrap {
        width: 99.4%;
        margin: 0.16rem auto 0.24rem auto;
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


