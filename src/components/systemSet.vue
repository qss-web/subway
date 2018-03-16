<template>
    <div class="setWrap">
        <ul class="tabTitle clearfix">
            <li v-on:click="indexed=1" v-bind:class="indexed==1?'active':''">系统</li>
            <li v-on:click="indexed=2" v-bind:class="indexed==2?'active':''">用户</li>
            <li v-on:click="indexed=3" v-bind:class="indexed==3?'active':''">设备</li>
            <li v-on:click="indexed=4" v-bind:class="indexed==4?'active':''">客户端</li>
            <li v-on:click="indexed=5" v-bind:class="indexed==5?'active':''">设备授权</li>
            <li v-on:click="indexed=6" v-bind:class="indexed==6?'active':''">角色</li>
            <li v-on:click="indexed=7" v-bind:class="indexed==7?'active':''">检测设备配备</li>
            <li v-on:click="indexed=8" v-bind:class="indexed==8?'active':''">当前设备运行状态</li>
            <li v-on:click="indexed=9" v-bind:class="indexed==9?'active':''">运行时间管理</li>
        </ul>
        <div class="content">
            <div v-if="indexed==1" class="system clearfix">
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
            <div v-if="indexed==2" class="user">user</div>
            <div v-if="indexed==3" class="equ">equ</div>
            <div v-if="indexed==4" class="client">client</div>
            <div v-if="indexed==5" class="authorize">authorize</div>
            <div v-if="indexed==6" class="role">role</div>
            <div v-if="indexed==7" class="checkEqu">checkEqu</div>
            <div v-if="indexed==8" class="runniState">runniState</div>
            <div v-if="indexed==9" class="timeManagement">timeManagement</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                indexed: 1,
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '车站',
                    'width': 18,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 20,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 13,
                    'value': 'time'
                }, {
                    'label': '报警事件',
                    'width': 20,
                    'value': 'alarmEvent'
                }, {
                    'label': '状态',
                    'width': 15,
                    'value': 'status'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '4'
                    }]
                }
            };
        },
        props: [''],
        created() {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
    .setWrap {
        padding: 0.22rem;
        margin: 0 0.12rem;
        background: #f6f6f6;
        border-top: 1px solid #7c858d;
        .tabTitle {
            padding-left: 0.2rem;
            li {
                float: left;
                font-size: 0.2rem;
                height: 0.39rem;
                line-height: 0.39rem;
                color: #fff;
                background: #7c8298;
                min-width: 1.38rem;
                padding: 0 0.16rem;
                margin-right: 0.06rem;
                border-radius: 10px 10px 0px 0px;
                text-align: center;
                cursor: pointer;
            }
            li.active {
                background: #ced6f3;
                color: #2f4554;
            }
        }
        .content {
            padding: 0.16rem 0.12rem;
            background: #ced6f3;
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
        }
    }
</style>
