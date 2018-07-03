<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-on:ids="getIdsFn" v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn" v-bind:curPage="currentPage"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " :current-page="currentPage" @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                otherInfo: {
                    style: 3,
                    isCheck: false //是否显示多选框
                },
                popData1: {
                    'titleTotal': '新增wifi',
                    'options': [{
                        'status': 1,
                        'title': 'wifi名称',
                        'placeholder': '请输入内容',
                        'val': 'wifiName'
                    }, {
                        'status': 1,
                        'title': 'wifi密码',
                        'placeholder': '请输入内容',
                        'val': 'wifiPwd'
                    }, {
                        'status': 2,
                        'title': '所属车站',
                        'placeholder': '请选择内容',
                        'val': 'stationId'
                    }, {
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'lineId'
                    }]
                },
                searchData: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stationId'
                    }],
                    defaultReq: {
                        stationId: ''
                    }
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 19,
                    'value': 'lineName'
                }, {
                    'label': '所属车站',
                    'width': 19,
                    'value': 'stationName'
                }, {
                    'label': 'wifi名称',
                    'width': 19,
                    'value': 'wifiName'
                }, {
                    'label': 'wifi密码',
                    'width': 19,
                    'value': 'wifiPwd'
                }, {
                    'label': '操作',
                    'width': 19,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }, { 'delete': true, 'name': '删除', 'fn': 'deleteFn' }]
                }],
                equList: [],
                isReq: {},
                ids: ''
            };
        },
        computed: {
            ...mapState(['setStations', 'setLines', 'setDeviceType', 'itemObj'])
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getEquRunTimeListFn(this.isReq);
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj', '_equNameList', '_currentIndex']),
            //搜索按钮
            btnsFn(fn) {
                this[fn]();
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
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
                    api: 'getWifiList',
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
                    if(item.value == req.lineId) {
                        req.lineName = item.label;
                    }
                });

                //车站
                this.setStations.forEach(item => {
                    if(item.value == req.stationId) {
                        req.stationName = item.label;
                    }
                });

                if(!req.wifiName) {
                    this.$message.error('请输入wifi名称！');
                    return false;
                }
                if(!req.wifiPwd) {
                    this.$message.error('请输入wifi密码！');
                    return false;
                }
                if(!req.stationId) {
                    this.$message.error('请选择车站！');
                    return false;
                }
                if(!req.lineId) {
                    this.$message.error('请选择线路！');
                    return false;
                }

                // req.id = req.equuid.toString();

                this._getInfo({
                    ops: req,
                    api: 'addWifi',
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
                this.popData1.titleTotal = "新增wifi";
                this._itemObj('');
                this.isShowPop = true;
            },
            //删除操作
            deleteFn() {
                this._getList({
                    ops: { 'ids': this.itemObj.id.toString() },
                    api: 'delWifi',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getEquRunTimeListFn(this.isReq);
                    }
                });
            },
            //编辑操作
            editFn(id, item) {
                this.popData1.titleTotal = "编辑wifi";
                this._itemObj(item);
                this.isShowPop = true;
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
