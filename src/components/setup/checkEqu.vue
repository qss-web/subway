<template>
    <div class="timeManagement">
        <div class="searchWrap ">
            <v-sub-search v-on:receiveBtnFn="btnsFn " v-on:getEquName="getEquNameFn " v-bind:searchData="searchData " v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo" v-bind:label="info1 " v-bind:list="equList " v-on:receive="btnFn " v-bind:curPage="currentPage"></v-search-list>
            <div class="pagination">
                <el-pagination :page-size=" pageSize " @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber " prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{totalPage}}</span>
                </el-pagination>
            </div>
        </div>
        <v-pop-box v-on:save="saveFn " v-on:receive="cancleFn " v-if="isShowPop " v-bind:popData="popData1 "></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                currentId: '',//当前编辑的用户id
                otherInfo: {
                    style: 3,
                    isCheck: true //是否显示多选框
                },
                popData1: {
                    'titleTotal': '编辑操作方式',
                    'options': [{
                        'status': 2,
                        'title': '操作方式',
                        'placeholder': '请选择操作方式',
                        'val': 'operationMode',
                        'list': [{
                            value: '0',
                            label: '未设置'
                        }, {
                            value: '1',
                            label: '手动操作'
                        }, {
                            value: '2',
                            label: '自动同步'
                        }]
                    }]
                },
                searchData: {
                    'btnShow': [
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
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
                        'placeholder': '请输入内容',
                        'val': 'deviceName'
                    }],
                    defaultReq: {
                        deviceInLineId: '6号线西延',
                        deviceInStationId: '',
                        deviceTypeCode: '',
                        deviceName: ''
                    }
                },
                info1: [{
                    'label': '公司名称',
                    'width': 11,
                    'value': 'deviceCompanyName'
                }, {
                    'label': '线路名称',
                    'width': 20,
                    'value': 'deviceInLineName'
                }, {
                    'label': '车站名称',
                    'width': 20,
                    'value': 'deviceInStationName'
                }, {
                    'label': '设备编号',
                    'width': 20,
                    'value': 'deviceCode'
                }, {
                    'label': '操作方式',
                    'width': 15,
                    'value': 'operationShow'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: [],
                getEquNameArr: [],//接口获取的设备名称
                isReq: {},
                ids: ''
            };
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getEquConfigListFn(this.isReq);
            this.getEquNameFn({ 'deviceInLineId': this.isReq.deviceInLineId });
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj', '_equNameList']),
            //搜索按钮
            btnsFn(fn) {
                this[fn]();
            },
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '3',
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
            //编辑操作
            editFn() {
                // this._itemObj(item);
                // this.currentId = id;
                this.isShowPop = true;
            },
            saveFn(req) {
                // const ops = {
                //     'id': this.currentId
                // };

                // if(req) {
                //     Object.assign(ops, req);
                // }
                this._getInfo({
                    ops: req,
                    api: 'equConfigUpdate',
                    callback: () => {
                        this.$message.success('保存成功！');
                        this.isShowPop = false;
                        this.getEquConfigListFn(this.isReq);
                    }
                });
            },
            cancleFn() {
                this.isShowPop = false;
            },
            getEquConfigListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'equConfigList',
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
                this.getEquConfigListFn(this.isReq);
            },
            //获取筛选的值
            filterBtn(req) {
                this.currentPage = 1;
                this.isReq = req;
                this.getEquConfigListFn(req);
            },
            //获取设备名称
            getEquNameFn(req) {
                this._getList({
                    ops: req,
                    api: 'selectlist',
                    callback: res => {
                        this.getEquNameArr = [];
                        res.forEach(item => {
                            this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.id.toString() });
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
        width: 99.4%;
        margin: 0rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #d7dbde;
        border-radius: 10px;
        .searchWrap {
            width: 98.5%;
            padding: 0.09rem 0 0.04rem 0.2rem;
            margin: 0 auto;
            background: #ebecf0;
            border-top: 1px solid #768089;
        }
        .middleKey {
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
    }
</style>
