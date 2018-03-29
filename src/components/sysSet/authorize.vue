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
                        <li v-bind:class="{ active: roleIndex == index }" v-for="(item, index) in roleList" v-on:click="roleFn(index)">
                            <span>{{item.value}}</span>
                            <span class="icon">
                                <i class="el-icon-check"></i>
                            </span>
                        </li>
                    </ul>
                </dd>
                <dd v-else>
                    <ul>
                        <li v-bind:class="{ active: telIndex == index }" v-for="(item, index) in telList" v-on:click="telFn(index)">
                            <span>{{item.value}}</span>
                            <span class="icon">
                                <i class="el-icon-check"></i>
                            </span>
                        </li>
                    </ul>
                </dd>
            </dl>
            <div class="right">
                <div class="middleKey">
                    <v-system-list v-bind:label="info1" v-bind:list="equList.data" v-on:receive="btnFn"></v-system-list>
                </div>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>1/1</span>
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isRole: true, //选项卡
                roleIndex: 1,
                roleList: [{
                    key: 1,
                    value: '角色一'
                }, {
                    key: 2,
                    value: '角色二'
                }],
                telIndex: 1,
                telList: [{
                    key: 1,
                    value: '12345678909'
                }, {
                    key: 2,
                    value: '12345678909'
                }],
                searchData: {
                    'btnShow': {
                        'add': true
                    },
                    'options': [{
                        'status': 1,
                        'title': '用户名',
                        'placeholder': '请输入内容',
                        'val': 'lines'
                    }],
                    popSave() { }
                },
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
            },
            roleFn(index) {
                this.roleIndex = index;
            },
            telFn(index) {
                this.telIndex = index;
            }
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
                        text-indent: 1em;
                        overflow: hidden;
                        cursor: pointer;
                        span.icon {
                            float: right;
                            display: none;
                            margin-right: 0.2rem;
                        }
                    }
                    li.active {
                        background: rgba(124, 130, 152, 0.4);
                        color: #fff;
                        border-radius: 5px;
                        span.icon {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
