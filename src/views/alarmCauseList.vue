<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                    </el-pagination>
                </div>
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
                searchData: {
                    'options': [{
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 1,
                        'title': '故障名称',
                        'placeholder': '请输入内容',
                        'val': 'equSort'
                    }]
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'equSys'
                }, {
                    'label': '故障原因代码',
                    'width': 20,
                    'value': 'alarmCode'
                }, {
                    'label': '故障原因名称',
                    'width': 20,
                    'value': 'alarmName'
                }, {
                    'label': '故障平均发生时间',
                    'width': 20,
                    'value': 'faultTime'
                }, {
                    'label': '故障发生次数',
                    'width': 20,
                    'value': 'faultNum'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
                        faultTime: '20',
                        faultNum: '300'
                    }, {
                        num: '序1',
                        equSys: '设备系统',
                        alarmCode: '02',
                        alarmName: '预警原因名称',
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
    .wholeWrap {
        padding: 0.16rem 0 0.24rem 0;
    }
    .equWrap {
        width: 99.4%;
        margin: 0 auto;
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
        border-top: 1px solid #587386;
        .title {
            background: #e5e8f7;
            position: relative;
            height: 0.52rem;
            border: 1px solid #587386;
            border-bottom: none;
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


