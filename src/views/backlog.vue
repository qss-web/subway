<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <ul class="title">
                    <li v-on:click="tabShowFn(true)" v-bind:class="tabShow?'active':''">未处理</li>
                    <li v-on:click="tabShowFn(false)" v-bind:class="tabShow?'':'active'">已处理</li>
                </ul>
                <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo" v-bind:label="info" v-bind:list="equList" v-on:receive="btnFn"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
        <v-maintenance-sheet v-if="isPop" v-on:isPop="isPopFn"></v-maintenance-sheet>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    // import { formatDate } from '../utils';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 11, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                searchData: {
                    'btnShow': [
                        { 'title': '删除', 'fn': 'deleteFn' },
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': ' 线路',
                        'placeholder': '请选择内容',
                        'val': 'line'
                    }, {
                        'status': 2,
                        'title': ' 车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': ' 设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys'
                    }, {
                        'status': 6,
                        'title': ' 设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }, {
                        'status': 1,
                        'title': ' 故障系统',
                        'placeholder': '请输入内容',
                        'val': 'faultSys'
                    },
                    // {
                    //     'status': 2,
                    //     'title': '故障事项状态',
                    //     'placeholder': '请选择内容',
                    //     'val': 'isTodo',
                    //     'list': [{
                    //         value: '1',
                    //         label: '未处理'
                    //     }, {
                    //         value: '2',
                    //         label: '已处理'
                    //     }]
                    // },
                    {
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
                        faultSys: ''
                        // isTodo: '1'
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
                    'label': '故障单号',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '设备安装位置',
                    'width': 10,
                    'value': 'equPos'
                }, {
                    'label': '设备编号',
                    'width': 8,
                    'value': 'equNum'
                }, {
                    'label': '故障系统',
                    'width': 8,
                    'value': 'faultSys'
                }, {
                    'label': '故障现象',
                    'width': 22,
                    'value': 'faultDis'
                }, {
                    'label': '操作',
                    'width': 7,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                info2: [{
                    'label': '序号',
                    'width': 4,
                    'value': 'index'
                }, {
                    'label': '故障单号',
                    'width': 8,
                    'value': 'faultNum'
                }, {
                    'label': '车站',
                    'width': 7,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 8,
                    'value': 'equName'
                }, {
                    'label': '设备安装位置',
                    'width': 8,
                    'value': 'equPos'
                }, {
                    'label': '设备编号',
                    'width': 6,
                    'value': 'equNum'
                }, {
                    'label': '故障系统',
                    'width': 8,
                    'value': 'faultSys'
                }, {
                    'label': '故障现象',
                    'width': 10,
                    'value': 'faultDis'
                }, {
                    'label': '修复时间',
                    'width': 8,
                    'value': 'repairTime'
                }, {
                    'label': '修复人员',
                    'width': 8,
                    'value': 'repairUserName'
                }, {
                    'label': '修复确认人姓名',
                    'width': 8,
                    'value': 'confirmUserName'
                }, {
                    'label': '操作',
                    'width': 7,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                info: [],
                equList: [],
                isPop: false,
                getEquNameArr: [],
                isReq: {},
                equKey: '',
                ids: '',
                tabShow: true
            };
        },
        computed: {
            ...mapState(['itemObj'])
        },
        created() {
            this.info = this.info1;
            this.equKey = this.$route.query.equKey;
            if(this.equKey || this.equKey == 0) {
                this.searchData.defaultReq.equSys = this.equKey.toString();
            }
            if(this.itemObj.equuid) {
                this._equNameList([{ 'label': this.itemObj.equName, 'value': this.itemObj.equuid }]);
                this.searchData.defaultReq.equName = this.itemObj.equuid;
            } else {
                this._equNameList('');
            }
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getBacklogFn(this.isReq);
            this.getEquNameFn({ 'line': this.isReq.line });
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
                        type: '8',
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
            //删除
            deleteFn() {
                this._getList({
                    ops: {
                        ids: this.ids
                    },
                    api: 'backlogDel',
                    callback: () => {
                        this.$message.success('删除成功!');
                        this.getBacklogFn(this.isReq);
                    }
                });
            },
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getBacklogFn(this.isReq);
            },
            getBacklogFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize,
                    'isTodo': this.tabShow ? '1' : '2'
                };

                this._currentIndex(ops);
                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'backlogList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
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
                this.getBacklogFn(req);
            },
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            //编辑
            editFn() {
                this.isPop = true;
            },
            isPopFn(value) {
                this.isPop = value;
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
            tabShowFn(b) {
                //b==true  未处理
                //b==false 已处理
                this.tabShow = b;
                if(b) {
                    this.info = this.info1;
                } else {
                    this.info = this.info2;
                }
                this.getBacklogFn(this.isReq);
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
        min-height: 7.2rem;
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


