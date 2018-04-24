<template>
    <div class="setup">
        <ul class="tabTitle">
            <li v-on:click="currentList(1)" v-bind:class="tabShow==1?'active':''">设备信息</li>
            <li v-on:click="currentList(2)" v-bind:class="tabShow==2?'active':''">故障库</li>
            <li v-if="userInfo.isShow==1" v-on:click="currentList(3)" v-bind:class="tabShow==3?'active':''">系统设置</li>
            <li v-on:click="currentList(4)" v-bind:class="tabShow==4?'active':''">人员情况统计</li>
        </ul>
        <div class="equWrap" v-if="tabShow==1">
            <div class="searchWrap">
                <v-sub-search v-on:receive="btnShowPopFn" v-on:getEquName="getEquNameFn" v-on:filter="fifterBtnFn" v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo1" v-bind:label="info1" v-bind:list="equList" v-on:receive="clickFn"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{pageTotal}}</span>
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
                    <el-pagination :page-size=" pageSize " @current-change="changePages2 " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{pageTotal}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="equWrap" v-if="tabShow==3 && userInfo.isShow==1">
            <v-system-set></v-system-set>
        </div>
        <div class="equWrap" v-if="tabShow==4">
            <div class="searchWrap">
                <v-sub-search v-on:receive="btnShowPopFn" v-on:filter="fifterBtnFn" v-bind:searchData="searchData02"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info3" v-bind:list="equList3"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages3 " layout="prev, slot, next " :total="pageNumber3 " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage3}}/{{pageTotal3}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
        <v-pop-box v-on:getEquName="getEquNameFn" v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                tabShow: 1,
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                pageTotal: 0,//总页数
                pageNumber: 0,//总条目数
                currentPage3: 1, //当前页数
                pageSize3: 12, //每页显示数量
                pageTotal3: 0,//总页数
                pageNumber3: 0,//总条目数
                isShowPop: false,
                getEquNameArr: [],//接口获取的设备名称
                unitAccount: {},
                popData1: {
                    'titleTotal': '新增设备',
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'deviceInLineId'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 6,
                        'title': '设备名称',
                        'placeholder': '请选择内容',
                        'val': 'id'
                    }, {
                        'status': 1,
                        'title': '位置',
                        'placeholder': '请输入内容',
                        'val': 'devicePosition'
                    }]
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
                        'val': 'deviceInLineId'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId'
                    }, {
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 6,
                        'title': '设备编号',
                        'placeholder': '请输入内容',
                        'val': 'deviceCode'
                    }],
                    defaultReq: {
                        deviceInLineId: '6号线西延线',
                        deviceInStationId: '',
                        deviceTypeCode: '',
                        deviceCode: ''
                    }
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
                            value: '7',
                            label: '自动扶梯'
                        }, {
                            value: '0',
                            label: '站台门'
                        }, {
                            value: '8',
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
                    }]
                },
                searchData02: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '人员',
                        'placeholder': '请选择内容',
                        'val': 'username',
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
                        'val': 'stationId',
                        'list': []
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
                    defaultReq: {
                        username: '',
                        stationId: '',
                        month: ''
                    }
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                otherInfo1: {
                    isCheck: false, //是否显示多选框
                    style: 3,
                    goToNextFn: 'goToEquDetail' //跳转方法设置字段
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 15,
                    'value': 'deviceInLineName'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'deviceInStationName'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'deviceCode'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'deviceName'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'deviceSys'
                }, {
                    'label': '生产厂家',
                    'width': 10,
                    'value': 'deviceEleRegFactory'
                }, {
                    'label': '安装地点',
                    'width': 15,
                    'value': 'devicePosition'
                }, {
                    'label': '规格型号',
                    'width': 10,
                    'value': 'deviceEleRegSpe'
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
                    'value': 'name'
                }, {
                    'label': '所属车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '所属线路',
                    'width': 10,
                    'value': 'line'
                }, {
                    'label': '月份',
                    'width': 15,
                    'value': 'month'
                }, {
                    'label': '巡检台次',
                    'width': 10,
                    'value': 'checkNum'
                }, {
                    'label': '处理故障单次数',
                    'width': 15,
                    'value': 'faultNum'
                }],
                equList: [],
                equList3: [],
                isReq1: {}, //是否点击过筛选，如果点击过，筛选的值
                isReq4: {} //是否点击过筛选，如果点击过，筛选的值
            };
        },
        computed: {
            ...mapState(['itemObj', 'userInfo'])
        },
        created() {
            this.isReq1 = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.infoListFn(this.isReq1);
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equInfo', '_equNameList']),
            currentList(index) {
                this.tabShow = index;
                if(index == 1) {
                    this.infoListFn(this.isReq1);
                } else if(index == 4) {
                    this.staffStatisticsFn();
                }
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.infoListFn(this.isReq1);
            },
            //改变当前页数
            changePages3(val) {
                this.currentPage3 = val;
                this.staffStatisticsFn();
            },
            btnShowPopFn(value) {
                this.isShowPop = value;
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            clickFn(val) {
                this[val]();
            },
            //点击列表进入设备详情页
            goToEquDetail() {
                this._getList({
                    ops: { 'id': this.itemObj.id.toString() },
                    api: 'infoDetail',
                    callback: res => {
                        this._equInfo(res);
                        if(this.itemObj.deviceTypeCode == 0 || this.itemObj.deviceTypeCode == 8) {
                            this.$router.push({ path: '/equInfoOther', query: { 'id': this.itemObj.id, 'isShow': true } });
                        } else {
                            this.$router.push({ path: '/equInfo', query: { 'id': this.itemObj.id, 'isShow': true } });
                        }
                    }
                });
            },
            //关闭弹出框并保存数据
            saveFn(req) {
                if(req.id) {
                    req.id = req.id.toString();
                    this._getList({
                        ops: req,
                        api: 'infoDetail',
                        callback: res => {
                            this.$message.success('新增成功！');
                            this.isShowPop = true;
                            this._equInfo(res);
                            //站台门和风机跳转的页面有列表
                            if(res.deviceTypeCode == 0 || res.deviceTypeCode == 8) {
                                this.$router.push({ path: '/equInfoOther', query: { 'id': req.id } });
                            } else {
                                this.$router.push({ path: '/equInfo', query: { 'id': req.id } });
                            }
                        }
                    });
                } else {
                    this.$message.error('请选择设备名称！');
                }
            },
            //获取设备名称
            getEquNameFn(req) {
                if(req.deviceTypeCode && req.deviceInLineId && req.deviceInStationId) {
                    this._getList({
                        ops: req,
                        api: 'selectlist',
                        callback: res => {
                            this.getEquNameArr = [];
                            res.forEach(item => {
                                this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.id });
                            });
                            this._equNameList(this.getEquNameArr);
                        }
                    });
                }
            },
            //获取设备信息列表
            infoListFn(req) {
                const ops = {
                    curPage: this.currentPage,
                    pageSize: this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'infoList',
                    callback: res => {
                        this.equList = res.rows;
                        this.pageTotal = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //搜索的传值
            fifterBtnFn(req) {
                if(this.tabShow == 1) {
                    this.isReq1 = req;
                    this.infoListFn(req);
                } else if(this.tabShow == 4) {
                    this.isReq4 = req;
                    this.staffStatisticsFn(req);
                }
            },
            //人员情况统计
            staffStatisticsFn(req) {
                const ops = {
                    curPage: this.currentPage3,
                    pageSize: this.pageSize3
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'staffStatistics',
                    callback: res => {
                        this.equList3 = res.rows;
                        this.pageTotal3 = res.total;
                        this.pageNumber3 = res.records;
                    }
                });
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