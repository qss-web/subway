<template>
    <div class="setup">
        <ul class="tabTitle">
            <li v-on:click="currentList(1)" v-bind:class="tabShow==1?'active':''">设备信息</li>
            <li v-on:click="currentList(2)" v-bind:class="tabShow==2?'active':''">故障库</li>
            <li v-on:click="currentList(3)" v-bind:class="tabShow==3?'active':''">系统设置</li>
            <li v-on:click="currentList(4)" v-bind:class="tabShow==4?'active':''">人员情况统计</li>
        </ul>
        <div class="equWrap" v-if="tabShow==1">
            <div class="searchWrap">
                <v-sub-search v-on:receive="btnShowPopFn" v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo1" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="equWrap" v-if="tabShow==2">
            <div class="searchWrap">
                <v-sub-search v-on:receive="btnShowPopFn" v-bind:searchData="searchData01"></v-sub-search>
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
            <v-system-set></v-system-set>
        </div>
        <div class="equWrap" v-if="tabShow==4">
            <div class="searchWrap">
                <v-sub-search v-on:receive="btnShowPopFn" v-bind:searchData="searchData02"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info3" v-bind:list="equList.data"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                tabShow: 1,
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                isShowPop: false,
                unitAccount: {},
                popData1: {
                    'titleTotal': '测试测试',
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
                        'title': '设备名称',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '设备名称1'
                        }, {
                            value: '2',
                            label: '设备名称2'
                        }, {
                            value: '3',
                            label: '设备名称3'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统1'
                        }, {
                            value: '2',
                            label: '设备系统2'
                        }, {
                            value: '3',
                            label: '设备系统3'
                        }]
                    }, {
                        'status': 1,
                        'title': '位置',
                        'placeholder': '请输入内容',
                        'val': 'exportAddress'
                    }],
                    popSave(val) { }
                },
                searchData: {
                    'btnShow': {
                        'add': true,
                        'delete': true,
                        'download': true,
                        'import': true,
                        'synchronization': true
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
                            label: '站台门'
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
                        'delete': true,
                        'edit': true,
                        'download': true
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
                            label: '站台门'
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
                searchData02: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '人员',
                        'placeholder': '请选择内容',
                        'val': 'people',
                        'list': [{
                            value: '1',
                            label: '巡检人员1'
                        }, {
                            value: '2',
                            label: '巡检人员2'
                        }, {
                            value: '3',
                            label: '巡检人员3'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'lines',
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
                        'val': 'month',
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
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                otherInfo1: {
                    isCheck: false, //是否显示多选框
                    style: 3, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                    isClick: true,
                    isEquInfo: true
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 15,
                    'value': 'alarmName'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'faultTime'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'faultNum'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '生产厂家',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '安装地点',
                    'width': 15,
                    'value': 'faultNum'
                }, {
                    'label': '规格型号',
                    'width': 10,
                    'value': 'faultNum'
                }],
                info2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '设备类型编码',
                    'width': 10,
                    'value': 'equType'
                }, {
                    'label': '设备类型',
                    'width': 10,
                    'value': 'alarmCode'
                }, {
                    'label': '故障部位编码',
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
                info3: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '人员名称',
                    'width': 10,
                    'value': 'equType'
                }, {
                    'label': '所属车站',
                    'width': 10,
                    'value': 'alarmCode'
                }, {
                    'label': '所属线路',
                    'width': 10,
                    'value': 'alarmName'
                }, {
                    'label': '月份',
                    'width': 15,
                    'value': 'faultTime'
                }, {
                    'label': '巡检台次',
                    'width': 10,
                    'value': 'faultTime'
                }, {
                    'label': '处理故障单次数',
                    'width': 15,
                    'value': 'faultNum'
                }],
                equList: {
                    total: 9,
                    data: [{
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        equType: '设备类型',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }]
                }
            };
        },
        props: ['list', 'label', 'checked'],
        methods: {
            ...mapActions(['_getList']),
            currentList(index) {
                this.tabShow = index;
                if(index == 4) {
                    this.staffStatisticsFn();
                }
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            },
            btnShowPopFn(value) {
                this.isShowPop = value;
            },
            staffStatisticsFn() {
                this._getList({
                    ops: {},
                    method: 'get',
                    api: 'staffStatistics',
                    callback: () => {

                    }
                });
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            //关闭弹出框并保存数据
            saveFn(value) {
                // console.log(value);
                this.isShowPop = true;
                this.$router.push('/equInfo');
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

    .add-btn {
        position: absolute;
        top: 1.5rem;
        left: 10.04rem;
        color: transparent;
        background-color: transparent;
        width: 1.1rem;
        height: 0.5rem;
    }

    .el-select {
        width: 6rem;
        background-color: #fff;
        color: #000;
        border: 1px solid #999;
        font-size: 0.4rem;
        .el-option {
            font-size: 0.4rem;
        }
    }
</style>

<style lang="less">
    .unit-account {
        background-color: #ced6f3;
        width: 18.56rem;
        height: 7.68rem;
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__footer {
            padding-top: 0.5rem;
        }
        &-dialog-header {
            background-color: #2f4554;
            height: 0.93rem;
            font-size: 0.32rem;
            color: #fff;
            padding: 0;
            line-height: 0.93rem;
            padding-left: 0.3rem;
        }
        &-dialog-body {
            padding-top: 1rem;
            .el-form-item {
                margin-bottom: 0.32rem;
                .el-form-item__label {
                    font-size: 0.32rem;
                    margin-left: 0.8rem;
                    padding-right: 0.12rem;
                }
                .el-input__inner {
                    padding: 0 0.15rem !important;
                    font-size: 0.38rem !important;
                    text-align: center;
                    color: #000 !important;
                }
            }
        }
        &-dialog-footer {
            text-align: center;
            button {
                width: 2.6rem;
                height: 0.88rem;
                font-size: 0.4rem;
                background-color: #2f4554;
                color: #fff;
                padding: 0;
                &:last-child {
                    margin-left: 1.6rem;
                }
                &:hover,
                &:focus,
                &:active {
                    background-color: #2f4554;
                    color: #fff;
                }
            }
        }
    }

    .unit-account-select {
        &-option {
            font-size: 0.38rem !important;
            height: auto !important;
            padding: 0.1rem 0.4rem;
            font-weight: normal;
        }
    }
</style>