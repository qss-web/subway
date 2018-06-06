<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:receiveBtnFn="btnsFn" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-on:ids="getIdsFn" v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                otherInfo: {
                    isCheck: true //是否显示多选框
                },
                popData1: {
                    'titleTotal': '增加角色',
                    'options': [{
                        'status': 1,
                        'title': '手机名称',
                        'placeholder': '请输入手机名称',
                        'val': 'mobileName'
                    }, {
                        'status': 1,
                        'title': 'SN码',
                        'placeholder': '请输入SN码',
                        'val': 'snCode'
                    }]
                },
                searchData: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addUserFn' }
                        // { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '手机名称',
                        'placeholder': '请输入手机名称',
                        'val': 'mobileName'
                    }, {
                        'status': 1,
                        'title': 'SN码',
                        'placeholder': '请输入SN码',
                        'val': 'snCode'
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '手机名称',
                    'width': 30,
                    'value': 'mobileName'
                }, {
                    'label': 'SN码',
                    'width': 45,
                    'value': 'snCode'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: [],
                isReq: {},
                ids: ''
            };
        },
        created() {
            this.getRoleListFn();
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj', '_currentIndex']),
            //搜索按钮
            btnsFn(fn) {
                this[fn]();
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //获取列表
            getRoleListFn(req) {
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
                    api: 'mobileList',
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
                this.getRoleListFn(this.isReq);
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id, val.item);
            },
            //编辑操作
            editFn(id, item) {
                this._itemObj(item);
                this.isShowPop = true;
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: {
                        "ids": id.toString()
                    },
                    api: 'mobileDel',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getRoleListFn();
                    }
                });
            },
            saveFn(req) {
                if(!req.mobileName) {
                    this.$message.error('请输入手机名称！');
                    return false;
                }
                if(!req.snCode) {
                    this.$message.error('请输入SN码！');
                    return false;
                }
                this._getInfo({
                    ops: req,
                    api: 'mobileAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.getRoleListFn();
                    }
                });
            },
            cancleFn() {
                this.isShowPop = false;
            },
            //增加用户操作
            addUserFn() {
                this._itemObj('');
                this.isShowPop = true;
            },
            //获取筛选的值
            filterBtn(req) {
                this.currentPage = 1;
                this.isReq = req;
                this.getRoleListFn(req);
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
