<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList.data"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': true,
                        'delete': true,
                        'edit': false,
                        'download': false,
                        'import': false,
                        'save': false
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
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '所属车站',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '设备系统',
                    'width': 8,
                    'value': 'num'
                }, {
                    'label': '主要设备名称',
                    'width': 13,
                    'value': 'num'
                }, {
                    'label': '设备安装位置',
                    'width': 13,
                    'value': 'num'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '设备当前状态',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '状态变更时刻',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '累计运行时间（小时）',
                    'width': 15,
                    'value': 'num'
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
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.getEquConfigListFn();
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
