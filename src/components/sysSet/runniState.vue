<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-on:receiveBtnFn="btnsFn" v-on:getEquName="getEquNameFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-on:ids="getIdsFn" v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn" v-bind:curPage="currentPage"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " :current-page="currentPage" @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:getEquName="getEquNameFnPop" v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                getEquNameArr: [],//接口获取的设备名称
                otherInfo: {
                    isCheck: true //是否显示多选框
                },
                popData1: {
                    'titleTotal': '新增设备',
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
                        'placeholder': '请选择内容',
                        'val': 'equUuid'
                    }, {
                        'status': 8,
                        'title': '时间',
                        'placeholder': '请选择时间',
                        'val': 'systemTime'
                    }, {
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择状态',
                        'val': 'status',
                        'list': [{
                            value: '1',
                            label: '运行'
                        }, {
                            value: '0',
                            label: '停止'
                        }]
                    }]
                },
                searchData: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' },
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
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
                        line: '6号线西延线',
                        station: '',
                        equSys: '',
                        equName: ''
                    }
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'lineName'
                }, {
                    'label': '所属车站',
                    'width': 8,
                    'value': 'stationName'
                }, {
                    'label': '设备系统',
                    'width': 8,
                    'value': 'equSysName'
                }, {
                    'label': '主要设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '设备安装位置',
                    'width': 10,
                    'value': 'address'
                }, {
                    'label': '设备编号',
                    'width': 8,
                    'value': 'equNum'
                }, {
                    'label': '设备当前状态',
                    'width': 7,
                    'value': 'statusValue'
                }, {
                    'label': '状态变更时刻',
                    'width': 13,
                    'value': 'changeTime'
                }, {
                    'label': '累计运行时间（小时）',
                    'width': 11,
                    'value': 'runTimeText'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }]
                }],
                equList: [],
                isReq: {},
                ids: ''
            };
        },
        computed: {
            ...mapState(['setStations', 'setLines', 'setDeviceType'])
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getEquRunTimeListFn(this.isReq);
            this.getEquNameFn({ 'line': this.isReq.line });
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj', '_equNameList', '_currentIndex']),
            //搜索按钮
            btnsFn(fn) {
                debugger;
                this[fn]();
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '4',
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
            //获取列表
            getEquRunTimeListFn(req) {
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
                    api: 'equRunList',
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
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getEquRunTimeListFn(this.isReq);
            },
            //获取筛选的值
            filterBtn(req) {
                this.currentPage = 1;
                this.isReq = req;
                this.getEquRunTimeListFn(req);
            },
            cancleFn() {
                this.isShowPop = false;
            },
            saveFn(req) {
                //线路
                this.setLines.forEach(item => {
                    if(item.value == req.line) {
                        req.lineName = item.label;
                    }
                });

                //车站
                this.setStations.forEach(item => {
                    if(item.value == req.station) {
                        req.stationName = item.label;
                    }
                });

                //设备系统
                this.setDeviceType.forEach(item => {
                    if(item.value == req.equSys) {
                        req.equSysName = item.label;
                    }
                });

                //设备名称
                this.getEquNameArr.forEach(item => {
                    if(item.value == req.equUuid) {
                        req.equName = item.label;
                    }
                });

                if(!req.line) {
                    this.$message.error('请选择线路！');
                    return false;
                }
                if(!req.station) {
                    this.$message.error('请选择车站！');
                    return false;
                }
                if(!req.equSys) {
                    this.$message.error('请选择设备系统！');
                    return false;
                }
                if(!req.equName) {
                    this.$message.error('请选择非全部的设备名称！');
                    return false;
                }
                if(!req.systemTime) {
                    this.$message.error('请选择时间！');
                    return false;
                }
                if(!req.status) {
                    this.$message.error('请选择状态！');
                    return false;
                }

                // req.id = req.equuid.toString();

                this._getInfo({
                    ops: req,
                    api: 'equRunAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.getEquRunTimeListFn(this.isReq);
                    }
                });
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id, val.item);
            },
            //增加用户操作
            addFn() {
                this._itemObj('');
                this.getEquNameFnPop();
                this.isShowPop = true;
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: { 'id': id },
                    api: 'equRunDel',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getEquRunTimeListFn();
                    }
                });
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
            //获取设备名称
            getEquNameFnPop(req) {
                this._getList({
                    ops: req,
                    api: 'selectlist3',
                    callback: res => {
                        this.getEquNameArr = [];
                        res.forEach(item => {
                            this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.deviceUuid });
                        });
                        this._equNameList(this.getEquNameArr);
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .searchWrap {
            padding-bottom: 0.14rem;
        }
        .middleKey {
            border: 1px solid #71869b;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
