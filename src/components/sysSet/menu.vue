<template>
    <div class="timeManagement">
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
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
                currentId: '',//当前编辑的用户id
                otherInfo: {
                    isCheck: false //是否显示多选框
                },
                popData1: {
                    'titleTotal': '编辑菜单名称',
                    'options': [{
                        'status': 1,
                        'title': '菜单名称',
                        'placeholder': '请输入用菜单名称',
                        'val': 'menuName'
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '编码',
                    'width': 10,
                    'value': 'menuCode'
                }, {
                    'label': '菜单名称',
                    'width': 50,
                    'value': 'menuName'
                }, {
                    'label': '操作',
                    'width': 30,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: []
            };
        },
        created() {
            this.getMenuListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_itemObj']),
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id, val.item);
            },
            //删除操作
            deleteFn() {

            },
            //编辑操作
            editFn(id, item) {
                this._itemObj(item);
                this.currentId = id;
                this.isShowPop = true;
            },
            saveFn(req) {
                const ops = {
                    'id': this.currentId
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'menuUpdate',
                    callback: () => {
                        this.$message.success('保存成功！');
                        this.isShowPop = false;
                        this.getMenuListFn();
                    }
                });
            },
            cancleFn() {
                this.isShowPop = false;
            },
            getMenuListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._getList({
                    ops: ops,
                    api: 'menuList',
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
                this.getMenuListFn();
            }
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .middleKey {
            border: 1px solid #71869b;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
