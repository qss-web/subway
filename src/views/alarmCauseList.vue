<template>
    <div class="equWrap">
        <div class="searchWrap">
            <v-sub-search></v-sub-search>
        </div>
        <div class="tab">
            <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
            <div class="pagination">
                <el-pagination background @current-change="changePages" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next " :total="equList.total "></el-pagination>

            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'equSys'
                }, {
                    'label': '报警原因代码',
                    'width': 20,
                    'value': 'alarmCode'
                }, {
                    'label': '报警原因名称',
                    'width': 20,
                    'value': 'alarmName'
                }, {
                    'label': '故障平均发生时间',
                    'width': 20,
                    'value': 'faultTime'
                }, {
                    'label': '每千小时故障发生次数',
                    'width': 20,
                    'value': 'faultNum'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '报警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }]
                }
            };
        },
        props: ['list', 'label', 'checked'],
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            }
        }
    };
</script>

<style scoped lang="less">
    .equWrap {
        width: 99.4%;
        margin: 0.16rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        min-height: 7.8rem;
        .title {
            background: #e5e8f7;
            position: relative;
            height: 0.52rem;
            border: 1px solid #587386;
            border-bottom: none;
            .notice {
                position: absolute;
                right: 1rem;
                top: 0;
                dd {
                    flex: auto;
                    font-size: 0.2rem;
                    margin-left: 0.26rem;
                    height: 0.52rem;
                    line-height: 0.52rem;
                }
            }
        }
        .pagination {
            text-align: center;
            padding: 0.1rem 0;
            background: #e5e8f7;
            border: 1px solid #587386;
            border-top: none;
        }
    }
</style>


