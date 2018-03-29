<template>
    <div class="system clearfix">
        <div class="left">
            <h3>中间件设置</h3>
            <dl class="middleKey">
                <dt class="clearfix">
                    <a href="javascript:;">添加</a>
                    <a href="javascript:;">重新启动Tomcat</a>
                </dt>
                <dd>
                    <v-system-list v-bind:label="info1" v-bind:list="equList.data" v-on:receive="btnFn"></v-system-list>
                </dd>
            </dl>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                    <span>1/1</span>
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checkList: [],
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': 'IP地址',
                    'width': 18,
                    'value': 'ipAddress'
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
                    'value': 'attendedMode'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }]
                }
            };
        },
        methods: {
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            //删除操作
            deleteFn() {
                // alert(2);
            },
            //编辑操作
            editFn() {
                // alert(3);
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
