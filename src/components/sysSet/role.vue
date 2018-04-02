<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:receive="addUserFn" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                popData1: {
                    'titleTotal': '增加角色',
                    'options': [{
                        'status': 1,
                        'title': '角色名称',
                        'placeholder': '请输入用角色名称',
                        'val': 'roleName'
                    }, {
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择角色状态',
                        'val': 'roleCode',
                        'list': [{
                            value: '开启',
                            label: '开启'
                        }, {
                            value: '停用',
                            label: '停用'
                        }]
                    }]
                },
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': true
                    },
                    'options': [{
                        'status': 1,
                        'title': '角色名称',
                        'placeholder': '请输入内容',
                        'val': 'roleName'
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '角色名称',
                    'width': 37,
                    'value': 'roleName'
                }, {
                    'label': '状态',
                    'width': 37,
                    'value': 'roleCode'
                }, {
                    'label': '操作',
                    'width': 20,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: []
            };
        },
        created() {
            this.getRoleListFn();
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            //获取列表
            getRoleListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'roleList',
                    callback: res => {
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getRoleListFn();
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id);
            },
            //编辑操作
            editFn() {
                this.isShowPop = true;
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: {
                        "ids": id
                    },
                    api: 'roleDel',
                    callback: () => {
                        this.$message('删除成功！');
                        this.getRoleListFn();
                    }
                });
            },
            saveFn(req) {
                this._getInfo({
                    ops: req,
                    api: 'roleAdd',
                    callback: () => {
                        this.$message('新增成功！');
                        this.isShowPop = false;
                        this.getRoleListFn();
                    }
                });
            },
            cancleFn() {
                this.isShowPop = false;
            },
            //增加用户操作
            addUserFn(val) {
                this.isShowPop = val;
            },
            //获取筛选的值
            filterBtn(req) {
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
