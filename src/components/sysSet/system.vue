<template>
    <div class="system clearfix">
        <div class="left">
            <h3>中间件设置</h3>
            <dl class="middleKey">
                <dt class="clearfix">
                    <a href="javascript:;" v-on:click="addFn">添加</a>
                    <a href="javascript:;">重新启动Tomcat</a>
                </dt>
                <dd>
                    <v-system-list v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
                </dd>
            </dl>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{totalPage}}</span>
                </el-pagination>
            </div>
        </div>
        <div class="right">
            <h3>功能组设置</h3>
            <dl class="functionSet">
                <dt>在线功能组</dt>
                <dd>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="系统"></el-checkbox>
                        <el-checkbox label="扶梯专用图谱"></el-checkbox>
                        <el-checkbox label="在线报表报告"></el-checkbox>
                        <el-checkbox label="预警统计"></el-checkbox>
                        <el-checkbox label="站台门专用图谱"></el-checkbox>
                        <el-checkbox label="分析诊断专用图谱"></el-checkbox>
                    </el-checkbox-group>
                </dd>
                <dt>离线功能组</dt>
                <dd>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="测试组"></el-checkbox>
                        <el-checkbox label="基础服务"></el-checkbox>
                        <el-checkbox label="离线报表报告"></el-checkbox>
                        <el-checkbox label="离线轴承报告"></el-checkbox>
                        <el-checkbox label="离线轴承诊断"></el-checkbox>
                        <el-checkbox label="离线常规分析"></el-checkbox>
                        <el-checkbox label="离线数据通讯"></el-checkbox>
                    </el-checkbox-group>
                </dd>
            </dl>
            <div class="save">
                <a href="javascript:;">保存</a>
            </div>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import { mapMutations } from '../../../../../others/pupu/node_modules/_vuex@2.4.1@vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                checkList: [],
                isShowPop: false, //是否显示弹框
                popData1: {
                    'titleTotal': '添加',
                    'options': [{
                        'status': 1,
                        'title': 'IP地址',
                        'placeholder': '请输入IP地址',
                        'val': 'ip'
                    }, {
                        'status': 1,
                        'title': '端口',
                        'placeholder': '请输入端口',
                        'val': 'port'
                    }, {
                        'status': 2,
                        'title': '类型',
                        'placeholder': '请选择类型',
                        'val': 'type',
                        'list': [{
                            value: '1',
                            label: '在线'
                        }, {
                            value: '2',
                            label: '离线'
                        }]
                    }, {
                        'status': 2,
                        'title': '连接方式',
                        'placeholder': '请选择连接方式',
                        'val': 'connectionMode',
                        'list': [{
                            value: '1',
                            label: '旧连接'
                        }, {
                            value: '2',
                            label: '新连接'
                        }]
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': 'IP地址',
                    'width': 18,
                    'value': 'ip'
                }, {
                    'label': '端口',
                    'width': 20,
                    'value': 'port'
                }, {
                    'label': '类型',
                    'width': 13,
                    'value': 'type'
                }, {
                    'label': '连接方式',
                    'width': 20,
                    'value': 'connectionMode'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: []
            };
        },
        created() {
            this.getSysList();
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj']),
            //显示弹出框
            addFn() {
                this._itemObj('');
                this.isShowPop = true;
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id);
            },
            //删除操作
            deleteFn(id) {
                this._getInfo({
                    ops: {
                        'ids': id.toString()
                    },
                    api: 'sysDel',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getSysList();
                    }
                });
            },
            //编辑操作
            editFn() {
                // alert(3);
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getSysList();
            },
            //弹出框保存数据
            saveFn(req) {
                this._getInfo({
                    ops: req,
                    api: 'sysAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.getSysList();
                    }
                });
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            getSysList() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._getList({
                    ops: ops,
                    api: 'sysList',
                    callback: res => {
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .system {
        h3 {
            font-weight: normal;
            font-size: 0.18rem;
            color: #324758;
            height: 0.46rem;
            line-height: 0.46rem;
            text-indent: 2em;
            background: #bcc2da;
        }
        .left {
            width: 12.58rem;
        }
        .right {
            width: 5.24rem;
        }
        .middleKey {
            border: 1px solid #71869b;
            dt {
                padding: 0.08rem 0;
                a {
                    float: left;
                    margin-left: 0.34rem;
                    height: 0.44rem;
                    line-height: 0.44rem;
                    color: #fff;
                    background: #7c8298;
                    min-width: 0.58rem;
                    text-align: center;
                    padding: 0 0.38rem;
                }
            }
        }
    }
    .functionSet {
        dt {
            background: red;
            font-size: 0.18rem;
            color: #324758;
            height: 0.46rem;
            line-height: 0.46rem;
            text-indent: 2em;
            background: #bcc2da;
            margin-top: 0.16rem;
            border: 1px solid #71869b;
        }
        dd {
            border: 1px solid #71869b;
            border-top: none;
            padding: 0.2rem 0;
        }
    }
    .save {
        margin-top: 0.2rem;
        a {
            width: 1rem;
            display: block;
            height: 0.4rem;
            line-height: 0.4rem;
            background: #7c8298;
            color: #fff;
            text-align: center;
            font-size: 0.18rem;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
<style>
    .el-checkbox {
        margin-left: 0.3rem !important;
        min-width: 1.6rem;
        margin: 0.1rem 0;
    }
</style>
