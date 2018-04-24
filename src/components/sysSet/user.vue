<template>
    <div class="user">
        <div class="searchWrap">
            <v-sub-search v-on:receive="addUserFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
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
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                popData1: {
                    'titleTotal': '新增用户',
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择线路',
                        'val': 'lineId'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择车站',
                        'val': 'stationId'
                    }, {
                        'status': 1,
                        'title': '用户名',
                        'placeholder': '请输入用户名',
                        'val': 'username'
                    }, {
                        'status': 1,
                        'title': '密码',
                        'placeholder': '请输入密码',
                        'val': 'password'
                    }, {
                        'status': 1,
                        'title': '真实姓名',
                        'placeholder': '请输入真实姓名',
                        'val': 'name'
                    }, {
                        'status': 2,
                        'title': '所属角色',
                        'placeholder': '请选择所属角色',
                        'val': 'roleId',
                        'list': []
                    }, {
                        'status': 1,
                        'title': 'E-mail',
                        'placeholder': '请输入E-mail',
                        'val': 'mail'
                    }, {
                        'status': 1,
                        'title': '所属集团',
                        'placeholder': '请输入所属集团',
                        'val': 'groupName'
                    }, {
                        'status': 1,
                        'title': '所属公司',
                        'placeholder': '请输入所属公司',
                        'val': 'companyName'
                    }, {
                        'status': 1,
                        'title': '所属项目部',
                        'placeholder': '请输入所属项目部',
                        'val': 'projectDepartmentName'
                    }, {
                        'status': 1,
                        'title': '所属维修部',
                        'placeholder': '请输入所属维修部',
                        'val': 'maintainDepartmentName'
                    }]
                },
                searchData: {
                    'btnShow': {
                        'add': true
                    },
                    'options': [{
                        'status': 1,
                        'title': '用户名',
                        'placeholder': '请输入内容',
                        'val': 'username'
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '用户名',
                    'width': 8,
                    'value': 'username'
                }, {
                    'label': '密码',
                    'width': 8,
                    'value': 'password'
                }, {
                    'label': '真实姓名',
                    'width': 8,
                    'value': 'name'
                }, {
                    'label': '所属角色',
                    'width': 8,
                    'value': 'roleName'
                }, {
                    'label': 'E-mail',
                    'width': 10,
                    'value': 'mail'
                }, {
                    'label': '所属集团',
                    'width': 10,
                    'value': 'groupName'
                }, {
                    'label': '所属公司',
                    'width': 10,
                    'value': 'companyName'
                }, {
                    'label': '所属项目部',
                    'width': 10,
                    'value': 'projectDepartmentName'
                }, {
                    'label': '所属维修部',
                    'width': 8,
                    'value': 'maintainDepartmentName'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: [],
                isReq: {}
            };
        },
        created() {
            this.getUserList();
            this.getRoleListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_itemObj']),
            getUserList(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'userList',
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
                this.getUserList(this.isReq);
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id);
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: {
                        'ids': id.toString()
                    },
                    api: 'userDel',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getUserList();
                    }
                });
            },
            //编辑操作
            editFn(id) {
                this._getList({
                    ops: { 'id': id },
                    api: 'userDetail',
                    callback: res => {
                        this._itemObj(res);
                        this.isShowPop = true;
                    }
                });
            },
            //增加用户操作
            addUserFn(val) {
                this._itemObj('');
                this.isShowPop = val;
            },
            //弹出框保存数据
            saveFn(req) {
                this._getList({
                    ops: req,
                    api: 'userAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.getUserList();
                    }
                });
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                this.getUserList(req);
            },
            getRoleListFn() {
                this._getList({
                    ops: {},
                    api: 'getRoleList',
                    callback: res => {
                        this.popData1.options.forEach(item => {
                            if(item.val == 'roleId') {
                                item.list = res.rows;
                            }
                        });
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .user {
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
