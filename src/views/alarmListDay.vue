<template>
    <div class="wholeWrap">
        <div class="searchWrap">
            <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="tab">
            <ul class="title">
                <li class="active">预警信息</li>
                <dl v-if="itemObj.equuid" class="notice flex">
                    <dd class="error" v-on:click="statusFilter('1')">二级预警：{{equInfoCount[0]}}次</dd>
                    <dd class="warn" v-on:click="statusFilter('2')">一级预警：{{equInfoCount[1]}}次</dd>
                    <dd class="normal" v-on:click="statusFilter('3')">运行：{{equInfoCount[2]}}次</dd>
                    <dd class="offline" v-on:click="statusFilter('5')">断网：{{equInfoCount[3]}}次</dd>
                    <dd class="stop" v-on:click="statusFilter('4')">停机：{{equInfoCount[4]}}次</dd>
                    <dd class="g-orange" v-on:click="statusFilter('')">全部：{{equTotal}}次</dd>
                </dl>
                <dl v-else class="notice flex">
                    <dd class="error" v-on:click="statusFilter('1')">二级预警：{{equInfoCount[0]}}次</dd>
                    <dd class="warn" v-on:click="statusFilter('2')">一级预警：{{equInfoCount[1]}}次</dd>
                    <!-- <dd class="normal">运行：{{equInfoCount[2]}}次</dd> -->
                    <dd class="offline" v-on:click="statusFilter('5')">断网：{{equInfoCount[2]}}次</dd>
                    <!-- <dd class="stop">停机：{{equInfoCount[4]}}次</dd> -->
                    <dd class="g-orange" v-on:click="statusFilter('')">全部：{{equTotal}}次</dd>
                </dl>
            </ul>
            <v-search-list v-bind:other="otherInfo" v-on:ids="getIdsFn" v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn" v-bind:curPage="currentPage"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{totalPage}}</span>
                </el-pagination>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { formatDate } from '../utils';
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
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    defaultReq: {
                        line: '6号线西延线',
                        station: '',
                        equSys: '',
                        equName: '',
                        startTime: formatDate('', 2) + ' 00:00:00',
                        endTime: formatDate('', 2) + ' 23:59:59'
                    }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                    specilShow: true
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 18,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 13,
                    'value': 'time'
                }, {
                    'label': '预警事件',
                    'width': 25,
                    'value': 'alarmEvent'
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
                equList: [],
                alarmVal: '',
                isReq: {},
                getEquNameArr: [],
                ids: ''
            };
        },
        computed: {
            ...mapState(['itemObj', 'isPowerShow'])
        },
        created() {
            this.equKey = this.$route.query.equKey;
            if(this.equKey || this.equKey == 0) {
                this.searchData.defaultReq.equSys = this.equKey.toString();
            }
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            if(this.itemObj.equuid) {
                this._equNameList([{ 'label': this.itemObj.equName, 'value': this.itemObj.equuid }]);
                this.searchData.defaultReq.equName = this.itemObj.equuid;
                this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
                this.getHaveTimelyAlarmListFn(this.isReq);
            } else {
                this.getTimelyAlarmListFn(this.isReq);
            }
            this.getEquNameFn({ 'line': this.isReq.line });

            if(this.isPowerShow && this.isPowerShow.length > 3) {
                this.powerControl = eval(this.isPowerShow)[4];
                //监测
                if(!this.powerControl[4].flag) {
                    this.info1.pop();
                }
            }
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equNameList', '_currentIndex']),
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            btnsFn(fn) {
                this[fn]();
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '10',
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
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                if(this.itemObj.equuid) {
                    this.getHaveTimelyAlarmListFn(this.isReq, this.alarmVal);
                } else {
                    this.getTimelyAlarmListFn(this.isReq, this.alarmVal);
                }
            },
            getTimelyAlarmListFn(req, val) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);
                if(req) {
                    Object.assign(ops, req);
                }

                if(val) {
                    Object.assign(ops, { 'status': val });
                }
                this._getList({
                    ops: ops,
                    api: 'timelyAlarmList',
                    callback: res => {
                        res.counts.splice(2, 1);
                        res.counts.pop();
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equTotal = 0;
                        this.equInfoCount = res.counts;
                        res.counts.forEach(item => {
                            this.equTotal += item;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            getHaveTimelyAlarmListFn(req, val) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);
                if(req) {
                    Object.assign(ops, req);
                }

                if(val) {
                    Object.assign(ops, { 'status': val });
                }
                this._getList({
                    ops: ops,
                    api: 'timelyAlarmStatus',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equTotal = 0;
                        this.equInfoCount = res.counts;
                        res.counts.forEach(item => {
                            this.equTotal += item;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                if(this.itemObj.equuid) {
                    this.getHaveTimelyAlarmListFn(req);
                } else {
                    this.getTimelyAlarmListFn(req);
                }
            },
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            monitorFn() {
                this.$router.push('monitor');
            },
            //二级筛选
            statusFilter(val) {
                this.alarmVal = val;
                if(this.itemObj.equuid) {
                    this.getHaveTimelyAlarmListFn(this.isReq, this.alarmVal);
                } else {
                    this.getTimelyAlarmListFn(this.isReq, this.alarmVal);
                }
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
            testFn() {
                alert(this.itemObj.equuid);
            }
        }
    };
</script>

<style scoped lang="less">
    .searchWrap {
        width: 98.5%;
        padding: 0.42rem 0 0.24rem 0;
        margin: 0 auto;
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        .title {
            padding-top: 0.11rem;
            background: #666b79;
            overflow: hidden;
            padding-left: 0.57rem;
            position: relative;
            li {
                width: 2rem;
                height: 0.39rem;
                line-height: 0.39rem;
                font-size: 0.2rem;
                float: left;
                text-align: center;
                background: #4a4d5e;
                color: #ffffff;
                border-radius: 8px 8px 0px 0px;
                margin-left: 0.05rem;
                cursor: pointer;
            }
            li.active {
                background: #d7d9db;
                color: #1f1e1e;
            }
            .notice {
                position: absolute;
                right: 1rem;
                top: 0;
                dd {
                    cursor: pointer;
                    flex: auto;
                    font-size: 0.18rem;
                    margin-left: 0.26rem;
                    height: 0.32rem;
                    line-height: 0.32rem;
                    padding: 0 0.1rem;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2rem;
                    margin-top: 0.1rem;
                    box-shadow: white 0.05em 0em 0.05em;
                }
            }
        }
        .pagination {
            text-align: center;
            padding: 0.14rem 0;
            background: #3c3f46;
            span {
                color: #fff;
            }
        }
    }
</style>