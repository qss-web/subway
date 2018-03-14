<template>
    <div class="setup">
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
            <button @click="isShowUnitAccount = true" class="add-btn">增加</button>
            <img class="tempPic" src="../assets/other/temp.jpg" />
        </div>
        <v-goback></v-goback>

        <el-dialog :visible.sync="isShowUnitAccount" :modal="false" :show-close="false" custom-class="unit-account" top="1.6rem">
            <div slot="title" class="unit-account-dialog-header">增加机组台账</div>
            <el-form :inline="true" label-position="left" label-width="1.6rem" :model="unitAccount" class="unit-account-dialog-body">
                <el-form-item label="线路" class="unit-account-form-label">
                    <el-select v-model="unitAccount.line" placeholder="请选择" popper-class="unit-account-select">
                        <el-option label="线路1" value="" class="unit-account-select-option"></el-option>
                        <el-option label="线路2" value="" class="unit-account-select-option"></el-option>
                        <el-option label="线路3" value="" class="unit-account-select-option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车站">
                    <el-select v-model="unitAccount.station" placeholder="请选择" popper-class="unit-account-select">
                        <el-option label="车站1" value="" class="unit-account-select-option"></el-option>
                        <el-option label="车站2" value="" class="unit-account-select-option"></el-option>
                        <el-option label="车站3" value="" class="unit-account-select-option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出口位置">
                    <el-select v-model="unitAccount.exit" placeholder="请选择" popper-class="unit-account-select">
                        <el-option label="出口位置1" value="" class="unit-account-select-option"></el-option>
                        <el-option label="出口位置2" value="" class="unit-account-select-option"></el-option>
                        <el-option label="出口位置3" value="" class="unit-account-select-option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-select v-model="unitAccount.name" placeholder="请选择" popper-class="unit-account-select">
                        <el-option label="设备名称1" value="" class="unit-account-select-option"></el-option>
                        <el-option label="设备名称2" value="" class="unit-account-select-option"></el-option>
                        <el-option label="设备名称3" value="" class="unit-account-select-option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备系统">
                    <el-select v-model="unitAccount.system" placeholder="请选择" popper-class="unit-account-select">
                        <el-option label="设备系统1" value="" class="unit-account-select-option"></el-option>
                        <el-option label="设备系统2" value="" class="unit-account-select-option"></el-option>
                        <el-option label="设备系统3" value="" class="unit-account-select-option"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="unit-account-dialog-footer" :center="true">
                <el-button type="primary" @click="isShowUnitAccount = false">确定</el-button>
                <el-button @click="isShowUnitAccount = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabShow: 1,
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                isShowUnitAccount: false,
                unitAccount: {},
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