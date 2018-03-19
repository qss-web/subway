<template>
    <div>
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="system clearfix">
            <dl class="left leftTab">
                <dt>
                    <span v-on:click="isRole = true" v-bind:class="{active:isRole==true}">角色</span>
                    <span v-on:click="isRole = false" v-bind:class="{active:isRole==false}">手机</span>
                </dt>
                <dd v-if="isRole">
                    <ul>
                        <li>我是角色一</li>
                        <li>我是角色二</li>
                    </ul>
                </dd>
                <dd v-else>
                    <ul>
                        <li>16748950989</li>
                        <li>16783798768</li>
                    </ul>
                </dd>
            </dl>
            <div class="right middleKey">
                <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isRole: true, //选项卡
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': false,
                        'delete': true,
                        'edit': false,
                        'download': false,
                        'import': false
                    },
                    'options': [{
                        'status': 1,
                        'title': '用户民',
                        'placeholder': '请输入内容',
                        'val': 'lines'
                    }],
                    popSave() { }
                },
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
    .searchWrap {
        padding-bottom: 0.14rem;
    }
    .system {
        .left {
            width: 3.5rem;
        }
        .right {
            width: 14.3rem;
        }
        .middleKey {
            border: 1px solid #71869b;
        }
        .leftTab {
            dt {
                span {
                    display: inline-block;
                    width: 1.36rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                    background: #7c8298;
                    color: #fff;
                    border: 0.01rem solid #7c8298;
                    font-size: 0.2rem;
                    border-bottom: none;
                    cursor: pointer;
                }
                span.active {
                    border: 0.01rem solid #454c67;
                    background: #e4e8f7;
                    color: #454c67;
                    border-bottom: none;
                }
                span:first-child {
                    margin-left: 0.18rem;
                }
            }
            dd {
                border: 0.01rem solid #71869b;
                background: #e4e8f7;
                margin-top: -0.01rem;
                min-height: 5.84rem;
                ul {
                    padding: 0.1rem 0.2rem;
                    li {
                        height: 0.36rem;
                        line-height: 0.36rem;
                        color: #2f4554;
                        font-size: 0.18rem;
                    }
                }
            }
        }
    }
</style>
