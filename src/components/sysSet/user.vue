<template>
    <div class="user">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '用户名',
                    'width': 8,
                    'value': 'userName'
                }, {
                    'label': '密码',
                    'width': 8,
                    'value': 'password'
                }, {
                    'label': '真实姓名',
                    'width': 8,
                    'value': 'realName'
                }, {
                    'label': '所属角色',
                    'width': 8,
                    'value': 'role'
                }, {
                    'label': 'E-mail',
                    'width': 10,
                    'value': 'mail'
                }, {
                    'label': '所属集团',
                    'width': 10,
                    'value': 'group'
                }, {
                    'label': '所属公司',
                    'width': 10,
                    'value': 'company'
                }, {
                    'label': '所属工厂',
                    'width': 10,
                    'value': 'factory'
                }, {
                    'label': '所属装置',
                    'width': 8,
                    'value': 'device'
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
    .user {
        .searchWrap {
            padding-bottom: 0.14rem;
        }
        .middleKey {
            border: 1px solid #71869b;
        }
    }
</style>
