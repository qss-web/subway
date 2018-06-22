<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn" v-on:receiveBtnFn="btnsFn"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-on:isShowSheet="isShowSheetFn" v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:ids="deleteValue" v-bind:curPage="currentPage"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
        <v-maintenance-sheet v-if="isPop" v-bind:isShow="false" v-on:isPop="isPopFn"></v-maintenance-sheet>
        <span class="g-titleName">今日巡检比例</span>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    import { formatDate } from '../utils';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                ids: '',//删除的id
                searchData: {
                    'btnShow': [
                        { 'title': '删除', 'fn': 'deleteBtn' },
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
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择内容',
                        'val': 'equStatus',
                        'list': [{
                            value: '0',
                            label: '未巡检'
                        }, {
                            value: '1',
                            label: '已巡检'
                        }]
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
                        equStatus: '',
                        startTime: formatDate('', 2) + ' 00:00:00',
                        endTime: formatDate('', 2) + ' 23:59:59'
                    }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 10,
                    'value': 'line'
                }, {
                    'label': '安装车站',
                    'width': 20,
                    'value': 'station'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'equNum'
                }, {
                    'label': '日期（月/日）',
                    'width': 10,
                    'value': 'date'
                }, {
                    'label': '到达时间',
                    'width': 20,
                    'value': 'changeTime'
                }, {
                    'label': '巡检状态',
                    'width': 10,
                    'value': 'status'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 11,
                    'value': 'equStatus',
                    'isShowRed': true
                }, {
                    'label': '执行人',
                    'width': 10,
                    'value': 'name'
                }],
                equList: [],
                getEquNameArr: [],
                isReq: {},
                isPop: false,
                powerControl: [],
                equKey: ''
            };
        },
        computed: {
            ...mapState(['isPowerShow'])
        },
        created() {
            this.equKey = this.$route.query.equKey;
            if(this.equKey || this.equKey == 0) {
                if(this.equKey == 77) {
                    this.searchData.defaultReq.equSys = "";
                } else {
                    this.searchData.defaultReq.equSys = this.equKey.toString();
                }
            }
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getCheckRatioListFn(this.isReq);
            if((this.equKey || this.equKey == 0) && this.equKey != 77) {
                this.getEquNameFn({ 'line': this.isReq.line, 'equSys': this.equKey });
            } else {
                this.getEquNameFn({ 'line': this.isReq.line });
            }
            // this.getEquNameFn({ 'line': this.isReq.line });
            if(this.isPowerShow && this.isPowerShow.length > 3) {
                this.powerControl = eval(this.isPowerShow)[2];
                //查询
                if(!this.powerControl[0].flag) {
                    this.searchData.noCheck = true;
                }
                //导出
                if(!this.powerControl[1].flag) {
                    this.searchData.btnShow.pop();
                }
                //删除
                if(!this.powerControl[2].flag) {
                    this.searchData.btnShow.forEach((item, index) => {
                        if(item.fn == 'deleteBtn') {
                            this.searchData.btnShow.splice(index, 1);
                        }
                    });
                }
            }
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equNameList', '_currentIndex']),
            btnsFn(fn) {
                this[fn]();
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '6',
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
                this.getCheckRatioListFn(this.isReq);
            },
            getCheckRatioListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'checkRatioList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                            if(item.arriveTime) {
                                item.changeTime = item.arriveTime.substring(11, 16);
                            }
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.currentPage = 1;
                this.isReq = req;
                this.getCheckRatioListFn(req);
            },
            //删除接口
            deleteBtn() {
                if(this.ids) {
                    this._getList({
                        ops: {
                            'ids': this.ids
                        },
                        api: 'checkRatioDel',
                        callback: () => {
                            this.$message.success('删除成功！');
                            this.getCheckRatioListFn(this.isReq);
                        }
                    });
                }
            },
            deleteValue(id) {
                this.ids = id.substr(0, id.length - 1);
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
            isPopFn(value) {
                this.isPop = value;
            },
            isShowSheetFn(value) {
                this.isPop = value;
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
        border-top: 1px solid #587386;
        .title {
            background: #e5e8f7;
            position: relative;
            height: 0.52rem;
            border: 1px solid #587386;
            border-bottom: none;
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


