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
                    <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
                </dd>
            </dl>
        </div>
        <div class="right">
            <h3>功能组设置</h3>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'num'
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
                    'btn': { 'delete': true, 'edit': true }
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
                    }, {
                        num: '序号',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }]
                }
            };
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
</style>
