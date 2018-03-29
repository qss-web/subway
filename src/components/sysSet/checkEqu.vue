<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData"></v-sub-search>
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
                    'titleTotal': '编辑操作方式',
                    'options': [{
                        'status': 2,
                        'title': '操作方式',
                        'placeholder': '请选择操作方式',
                        'val': 'userName',
                        'list': [{
                            value: '1',
                            label: '未设置'
                        }, {
                            value: '2',
                            label: '手动操作'
                        }, {
                            value: '3',
                            label: '自动同步'
                        }, {
                            value: '4',
                            label: '默认未设置'
                        }]
                    }],
                    popSave(val) { }
                },
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '金安桥站'
                        }, {
                            value: '2',
                            label: '苹果园站'
                        }, {
                            value: '3',
                            label: '苹果园南路站'
                        }, {
                            value: '4',
                            label: '西黄村站'
                        }, {
                            value: '5',
                            label: '廖公庄站'
                        }, {
                            value: '6',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equ',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备名称',
                        'placeholder': '请选择内容',
                        'val': 'equ',
                        'list': [{
                            value: '1',
                            label: '设备名称一'
                        }, {
                            value: '2',
                            label: '设备名称二'
                        }]
                    }],
                    popSave() { }
                },
                info1: [{
                    'label': '公司名称',
                    'width': 15,
                    'value': 'num'
                }, {
                    'label': '线路名称',
                    'width': 20,
                    'value': 'num'
                }, {
                    'label': '车站名称',
                    'width': 20,
                    'value': 'port'
                }, {
                    'label': '设备编号',
                    'width': 20,
                    'value': 'type'
                }, {
                    'label': '操作方式',
                    'width': 15,
                    'value': 'type'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
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
            saveFn() {
                this.isShowPop = false;
            },
            cancleFn() {
                this.isShowPop = false;
            }
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
