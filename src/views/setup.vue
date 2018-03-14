<template>
    <div>
        <ul class="tabTitle">
            <li v-on:click="tabShow=1" v-bind:class="tabShow==1?'active':''">设备信息</li>
            <li v-on:click="tabShow=2" v-bind:class="tabShow==2?'active':''">故障库</li>
            <li v-on:click="tabShow=3" v-bind:class="tabShow==3?'active':''">系统设置</li>
        </ul>
        <div class="equWrap" v-if="tabShow==1">
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
        <div class="equWrap" v-if="tabShow==2">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData01"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info2" v-bind:list="equList.data"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="equWrap" v-if="tabShow==3">
            <img class="tempPic" src="../assets/other/temp.jpg" />
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabShow: 1,
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': false,
                        'delete': true,
                        'edit': true,
                        'download': true,
                        'import': true
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
                        'title': '设备编号',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备编号一'
                        }, {
                            value: '2',
                            label: '设备编号二'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '自动扶梯'
                        }, {
                            value: '2',
                            label: '屏蔽门'
                        }, {
                            value: '3',
                            label: '风机'
                        }]
                    }],
                    popSave() { }
                },
                searchData01: {
                    'btnShow': {
                        'add': true,
                        'export': false,
                        'delete': true,
                        'edit': true,
                        'download': true,
                        'import': false
                    },
                    'options': [{
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '自动扶梯'
                        }, {
                            value: '2',
                            label: '屏蔽门'
                        }, {
                            value: '3',
                            label: '风机'
                        }]
                    }, {
                        'status': 2,
                        'title': '故障部位',
                        'placeholder': '请选择内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '故障部位'
                        }]
                    }, {
                        'status': 2,
                        'title': '故障原因',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '故障原因'
                        }]
                    }, {
                        'status': 2,
                        'title': '维护建议',
                        'placeholder': '请选择内容',
                        'val': 'advice',
                        'list': [{
                            value: '1',
                            label: '维护建议一'
                        }, {
                            value: '2',
                            label: '维护建议二'
                        }]
                    }],
                    popSave() { }
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '运营公司',
                    'width': 10,
                    'value': 'equType'
                }, {
                    'label': '项目部',
                    'width': 10,
                    'value': 'alarmCode'
                }, {
                    'label': '线路',
                    'width': 10,
                    'value': 'alarmName'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'faultTime'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '安装合同编号',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '位置',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '品牌',
                    'width': 5,
                    'value': 'faultNum'
                }, {
                    'label': '生产厂',
                    'width': 5,
                    'value': 'faultNum'
                }, {
                    'label': '规格型号',
                    'width': 5,
                    'value': 'faultNum'
                }],
                info2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '设备类型编码',
                    'width': 10,
                    'value': 'equType'
                }, {
                    'label': '设备类型',
                    'width': 10,
                    'value': 'alarmCode'
                }, {
                    'label': '故障位置编码',
                    'width': 10,
                    'value': 'alarmName'
                }, {
                    'label': '故障部位',
                    'width': 15,
                    'value': 'faultTime'
                }, {
                    'label': '故障原因编码',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '故障原因',
                    'width': 15,
                    'value': 'faultNum'
                }, {
                    'label': '维修策略编码',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '维修建议',
                    'width': 15,
                    'value': 'faultNum'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
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
    .tempPic {
        display: block;
        width: 98.5%;
        margin: 0 auto;
    }
    .equWrap {
        width: 99.4%;
        margin: 0rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #d7dbde;
        border-radius: 10px;
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
    .tabTitle {
        padding-top: 0.16rem;
        overflow: hidden;
        padding-left: 0.22rem;
        position: relative;
        li {
            width: 2rem;
            height: 0.39rem;
            line-height: 0.39rem;
            font-size: 0.2rem;
            float: left;
            text-align: center;
            background: #2f4554;
            color: #ffffff;
            border-radius: 8px 8px 0px 0px;
            margin-left: 0.05rem;
            cursor: pointer;
        }
        li.active {
            background: #d7dbde;
            color: #2f4554;
        }
        .notice {
            position: absolute;
            right: 1rem;
            top: 0;
            dd {
                flex: auto;
                font-size: 0.2rem;
                margin-left: 0.26rem;
                height: 0.48rem;
                line-height: 0.5rem;
            }
        }
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        border-top: 1px solid #587386;
        .pagination {
            text-align: center;
            padding: 0.1rem 0;
            background: #e5e8f7;
            border: 1px solid #587386;
            border-top: none;
        }
    }
</style>