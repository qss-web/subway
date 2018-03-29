<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:receive="addUserFn"></v-sub-search>
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
                    'titleTotal': '增加角色',
                    'options': [{
                        'status': 1,
                        'title': '角色名称',
                        'placeholder': '请输入用角色名称',
                        'val': 'userName'
                    }, {
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择角色状态',
                        'val': 'userStatus',
                        'list': [{
                            value: '1',
                            label: '开启'
                        }, {
                            value: '2',
                            label: '停用'
                        }]
                    }],
                    popSave(val) { }
                },
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': true
                    },
                    'options': [{
                        'status': 1,
                        'title': '角色名称',
                        'placeholder': '请输入内容',
                        'val': 'lines'
                    }],
                    popSave() { }
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '角色名称',
                    'width': 37,
                    'value': 'num'
                }, {
                    'label': '状态',
                    'width': 37,
                    'value': 'num'
                }, {
                    'label': '操作',
                    'width': 20,
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
            //编辑操作
            editFn() {
                this.isShowPop = true;
            },
            //删除操作
            deleteFn() {
                alert(2);
            },
            saveFn() {
                this.isShowPop = false;
            },
            cancleFn() {
                this.isShowPop = false;
            },
            //增加用户操作
            addUserFn(val) {
                this.isShowPop = val;
            },
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
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
