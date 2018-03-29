<template>
    <div class="user">
        <div class="searchWrap">
            <v-sub-search v-on:receive="addUserFn" v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                <span>1/1</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShowPop: false,
                popData1: {
                    'titleTotal': '新增用户',
                    'options': [{
                        'status': 1,
                        'title': '用户名',
                        'placeholder': '请输入用户名',
                        'val': 'userName'
                    }, {
                        'status': 1,
                        'title': '密码',
                        'placeholder': '请输入密码',
                        'val': 'password'
                    }, {
                        'status': 1,
                        'title': '真实姓名',
                        'placeholder': '请输入真实姓名',
                        'val': 'relaName'
                    }, {
                        'status': 1,
                        'title': '所属角色',
                        'placeholder': '请输入所属角色',
                        'val': 'role'
                    }, {
                        'status': 1,
                        'title': 'E-mail',
                        'placeholder': '请输入E-mail',
                        'val': 'relaName'
                    }, {
                        'status': 1,
                        'title': '所属集团',
                        'placeholder': '请输入所属集团',
                        'val': 'relaName'
                    }, {
                        'status': 1,
                        'title': '所属公司',
                        'placeholder': '请输入所属公司',
                        'val': 'company'
                    }, {
                        'status': 1,
                        'title': '所属工厂',
                        'placeholder': '请输入所属工厂',
                        'val': 'factory'
                    }, {
                        'status': 1,
                        'title': '所属装置',
                        'placeholder': '请输入所属装置',
                        'val': 'equ'
                    }],
                    popSave(val) { }
                },
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
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '用户名',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '密码',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '真实姓名',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '所属角色',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': 'E-mail',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '所属集团',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '所属公司',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '所属工厂',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '所属装置',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
                        ipAddress: '192.168.1.23',
                        port: '8000',
                        type: 'A类',
                        attendedMode: '连接方式'
                    }, {
                        num: '测试',
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
            //增加用户操作
            addUserFn(val) {
                this.isShowPop = val;
            },
            //弹出框保存数据
            saveFn() {
                this.isShowPop = true;
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
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
