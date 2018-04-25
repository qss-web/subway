<template>
    <div class="equWrap">
        <div class="searchWrap ">
            <v-sub-search v-bind:searchData="searchData01"></v-sub-search>
        </div>
        <div class="tab ">
            <v-search-list v-bind:other="otherInfo " v-bind:label="info2" v-bind:list="equList"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{pageTotal}}</span>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                pageTotal: 0,//总页数
                pageNumber: 0,//总条目数
                searchData01: {
                    // 'btnShow': {
                    //     'add': true,
                    //     'delete': true,
                    //     'edit': true,
                    //     'download': true
                    // },
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' },
                        { 'title': '删除', 'fn': 'deleteFn' },
                        { 'title': '编辑', 'fn': 'editFn' },
                        { 'title': '下载', 'fn': 'downloadFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '7',
                            label: '自动扶梯'
                        }, {
                            value: '0',
                            label: '站台门'
                        }, {
                            value: '8',
                            label: '风机'
                        }]
                    }, {
                        'status': 2,
                        'title': '故障部位',
                        'placeholder': '请选择内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '故障部位'
                        }]
                    }, {
                        'status': 2,
                        'title': '故障原因',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '故障原因'
                        }]
                    }, {
                        'status': 2,
                        'title': '维护建议',
                        'placeholder': '请选择内容',
                        'val': 'advice',
                        'list': [{
                            value: '1',
                            label: '维护建议一'
                        }, {
                            value: '2',
                            label: '维护建议二'
                        }]
                    }]
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '设备类型编码',
                    'width': 10,
                    'value': 'equType'
                }, {
                    'label': '设备类型',
                    'width': 10,
                    'value': 'alarmCode'
                }, {
                    'label': '故障部位编码',
                    'width': 10,
                    'value': 'alarmName'
                }, {
                    'label': '故障部位',
                    'width': 15,
                    'value': 'faultTime'
                }, {
                    'label': '故障原因编码',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '故障原因',
                    'width': 15,
                    'value': 'faultNum'
                }, {
                    'label': '维修策略编码',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '维修建议',
                    'width': 15,
                    'value': 'faultNum'
                }],
                equList: []
            };
        },
        methods: {
            ...mapActions(['_getList']),
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.infoListFn(this.isReq);
            }


        }
    };
</script>
<style lang="less" scoped>
    .equWrap {
        width: 99.4%;
        margin: 0rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #d7dbde;
        border-radius: 10px;
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
            border-top: 1px solid #587386;
            .pagination {
                text-align: center;
                padding: 0.1rem 0;
                background: #e5e8f7;
                border: 1px solid #587386;
                border-top: none;
            }
        }
    }
</style>
