<template>
    <div class="equWrap">
        <div class="searchWrap">
            <v-sub-search v-on:receiveBtnFn="btnsFn" v-on:getEquName="getEquNameFn" v-on:filter="fifterBtnFn" v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="tab">
            <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo1" v-bind:label="info1" v-bind:list="equList" v-on:receive="clickFn"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize" @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{pageTotal}}</span>
                </el-pagination>
            </div>
        </div>
        <v-pop-box v-on:getEquName="getEquNameFn" v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                pageTotal: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                getEquNameArr: [],//接口获取的设备名称
                equList: [],
                searchData: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' },
                        { 'title': '删除', 'fn': 'deleteFn' },
                        { 'title': '导入', 'fn': 'importFn' },
                        { 'title': '同步', 'fn': 'synchronizationFn' },
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
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
                otherInfo1: {
                    isCheck: true, //是否显示多选框
                    style: 3,
                    goToNextFn: 'goToNextPage' //跳转方法设置字段
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
                    'width': 15,
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
                    'width': 10,
                    'value': 'devicePosition'
                }, {
                    'label': '规格型号',
                    'width': 10,
                    'value': 'deviceEleRegSpe'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'monitor': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
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
                isReq: {}, //是否点击过筛选，如果点击过，筛选的值
                isgoToEdit: true, //是否编辑页面
                ids: ''
            };
        },
        computed: {
            ...mapState(['itemObj'])
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.infoListFn(this.isReq);
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equInfo', '_equNameList', '_itemObj']),
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            btnsFn(fn) {
                this[fn]();
            },
            //增加
            addFn() {
                this._itemObj('');
                this.isShowPop = true;
            },
            //同步
            synchronizationFn() {
                this._getList({
                    ops: {},
                    api: 'synBtnFn',
                    callback: () => {
                        this.$message.success('更新成功！');
                        this.infoListFn(this.isReq);
                    }
                });
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '1',
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
            //获取设备名称
            getEquNameFn(req) {
                if(req.deviceTypeCode && req.deviceInLineId && req.deviceInStationId) {
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
            },
            //搜索的传值
            fifterBtnFn(req) {
                this.isReq = req;
                this.infoListFn(req);
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
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList = res.rows;
                        this.pageTotal = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.infoListFn(this.isReq);
            },
            clickFn(val) {
                this[val]();
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
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            //点击列表进入设备详情页
            goToNextPage() {
                this.goEquDetail(this.isgoToEdit);
            },
            //编辑
            editFn() {
                this.goEquDetail(!this.isgoToEdit);
            },
            goEquDetail(isEdit) {
                this._getList({
                    ops: { 'id': this.itemObj.id.toString() },
                    api: 'infoDetail',
                    callback: res => {
                        this._equInfo(res);
                        if(this.itemObj.deviceTypeCode == 0 || this.itemObj.deviceTypeCode == 8) {
                            this.$router.push({ path: '/equInfoOther', query: { 'id': this.itemObj.id, 'isShow': isEdit } });
                        } else {
                            this.$router.push({ path: '/equInfo', query: { 'id': this.itemObj.id, 'isShow': isEdit } });
                        }
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .equWrap {
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
    }
</style>
