<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <ul class="title">
                    <span class="titleName">测点实时状态</span>
                    <dl class="g-notice flex">
                        <dd class="error" v-on:click="statusFilter('1')">一级预警：{{equInfoCount[0]}}台</dd>
                        <dd class="warn" v-on:click="statusFilter('2')">二级预警：{{equInfoCount[1]}}台</dd>
                        <dd class="normal" v-on:click="statusFilter('3')">正常：{{equInfoCount[2]}}台</dd>
                        <dd class="offline" v-on:click="statusFilter('5')">断网：{{equInfoCount[3]}}台</dd>
                        <dd class="stop" v-on:click="statusFilter('4')">停机：{{equInfoCount[4]}}台</dd>
                        <dd class="g-orange" v-on:click="statusFilter('')">全部：{{equTotal}}台</dd>
                    </dl>
                </ul>
                <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn" v-bind:curPage="currentPage" v-bind:type="2"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @prev-click="prevFn" @next-click="nextFn" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 11, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                equInfoCount: [], //设备信息
                equTotal: 0, //设备信息全部
                searchData: {
                    'btnShow': [
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'line'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys'
                    }, {
                        'status': 6,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }],
                    defaultReq: {
                        line: '6号线西延',
                        station: '',
                        equSys: '',
                        equName: ''
                    }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2,
                    goToNextFn: 'goToNextPage', //跳转方法设置字段
                    pouuid: true,
                    isSetCheckMark: true  //是否要记录已经选中的值
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 6,
                    'value': 'station'
                }, {
                    'label': '设备系统',
                    'width': 6,
                    'value': 'equSys'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '测点名称',
                    'width': 12,
                    'value': 'detectName'
                }, {
                    'label': '当前值',
                    'width': 6,
                    'value': 'currentValue'
                }, {
                    'label': '高限',
                    'width': 6,
                    'value': 'hLimit'
                }, {
                    'label': '高高限',
                    'width': 6,
                    'value': 'hhighLimit'
                }, {
                    'label': '更新时间',
                    'width': 12,
                    'value': 'time'
                }, {
                    'label': '状态',
                    'width': 6,
                    'value': 'statusValue',
                    'status': 'status'
                }, {
                    'label': '预警原因',
                    'width': 9,
                    'value': 'alarmCause'
                }, {
                    'label': '检维修建议',
                    'width': 9,
                    'value': 'repairAdvice'
                }],
                equList: [],
                getEquNameArr: [],
                isReq: {},
                alarmVal: '',//预警状态
                ids: '',
                checkNewArr: [],
                isClick: true,
                isSerSub: true
            };
        },
        computed: {
            ...mapState(['itemObj', 'checkMark'])
        },
        watch: {
            equList() {
                this.isClick = true;
            }
        },
        created() {
            if(window.timeOut) {
                clearTimeout(window.timeOut);
            }
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getPointTimelyStatusFn(this.isReq);
            this.getEquNameFn({ 'line': this.isReq.line });
        },
        destroyed() {
            clearTimeout(window.timeOut);
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equNameList', '_currentIndex', '_deviceInfo', '_setCheckMark']),
            btnsFn(fn) {
                this[fn]();
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '14',
                        ids: this.ids
                    },
                    api: 'exportApi',
                    callback: res => {
                        if(res.url) {
                            window.location.href = res.url;
                        } else {
                            this.$message.error(res.message);
                        }
                    }
                });
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            currentList(index) {
                this.indexed = index;
            },
            // //改变当前页数
            // changePages(val) {
            //     this._setCheckMark('');
            //     this.currentPage = val;
            //     this.getPointTimelyStatusFn(this.isReq, this.alarmVal);
            // },
            prevFn() {
                if(this.isClick) {
                    this.isClick = false;
                    this._setCheckMark('');
                    this.currentPage = this.currentPage - 1;
                    if(this.isSerSub) {
                        this.getPointTimelyStatusFn(this.isReq);
                    } else {
                        this.getPointTimelyStatusFn(this.isReq, this.alarmVal);
                    }
                }
            },
            nextFn() {
                if(this.isClick) {
                    this.isClick = false;
                    this._setCheckMark('');
                    this.currentPage = this.currentPage + 1;
                    if(this.isSerSub) {
                        this.getPointTimelyStatusFn(this.isReq);
                    } else {
                        this.getPointTimelyStatusFn(this.isReq, this.alarmVal);
                    }
                }
            },
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            //点击列表进入设备详情页
            goToNextPage() {
                this._deviceInfo({ 'deviceUuid': this.itemObj.equuid });
                if(this.itemObj.equSysName == '站台门') {
                    this.$router.push('shielddoorinfo');
                } else if(this.itemObj.equSysName == '自动扶梯') {
                    this.$router.push('escalatorinfo');
                } else {
                    this.$router.push('faninfo');
                }
            },
            getPointTimelyStatusFn(req, val) {
                if(window.timeOut) {
                    clearTimeout(window.timeOut);
                }
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(Object.assign(ops, { type: 2 }));
                if(req) {
                    Object.assign(ops, req);
                }

                if(val) {
                    Object.assign(ops, { 'status': val });
                }
                this._getList({
                    ops: ops,
                    api: 'pointTimelyStatus',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                            if(item.currentValue) {
                                item.currentValue = parseFloat(item.currentValue).toFixed(2);
                            }
                            if(this.checkMark) {
                                this.checkNewArr = this.checkMark.split(',');
                                this.checkNewArr.filter(item1 => {
                                    if(item.pouuid == item1) {
                                        item.isCheck = true;
                                    }
                                });
                            }
                        });
                        this.equInfoCount = res.counts;
                        this.equTotal = 0;
                        res.counts.forEach(item => {
                            this.equTotal += item;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                        this.currentPage = res.page;
                        if(this.currentPage == 1) {
                            window.timeOut = setTimeout(() => {
                                if(this.isSerSub) {
                                    this.getPointTimelyStatusFn(this.isReq);
                                } else {
                                    this.getPointTimelyStatusFn(this.isReq, this.alarmVal);
                                }
                            }, 5000);
                        } else if(window.timeOut) {
                            clearTimeout(window.timeOut);
                        }
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.isSerSub = true;
                this.currentPage = 1;
                this._setCheckMark('');
                this.isReq = req;
                this.getPointTimelyStatusFn(req);
            },
            //获取设备名称
            getEquNameFn(req) {
                this._getList({
                    ops: req,
                    api: 'selectlist2',
                    callback: res => {
                        this.getEquNameArr = [];
                        res.forEach(item => {
                            this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.deviceUuid });
                        });
                        this._equNameList(this.getEquNameArr);
                    }
                });
            },
            //二级筛选
            statusFilter(val) {
                this.isSerSub = false;
                this.currentPage = 1;
                this._setCheckMark('');
                this.alarmVal = val;
                this.getPointTimelyStatusFn(this.isReq, this.alarmVal);
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
            .titleName {
                line-height: 0.52rem;
                color: #fff;
                padding-left: 0.24rem;
                font-size: 0.2rem;
                text-shadow: black 0.1em 0.1em 0.2em;
            }
        }
        .pagination {
            text-align: center;
            padding: 0.1rem 0;
            background: #45484f;
            border: 1px solid #587386;
            border-top: none;
            span {
                color: #fff;
            }
        }
    }
</style>


