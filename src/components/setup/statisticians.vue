<template>
    <div class="equWrap">
        <div class="searchWrap">
            <v-sub-search v-on:filter="fifterBtnFn" v-bind:searchData="searchData02"></v-sub-search>
        </div>
        <div class="tab">
            <v-search-list v-bind:other="otherInfo" v-bind:label="info3" v-bind:list="equList"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size="pageSize" @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
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
                searchData02: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '人员',
                        'placeholder': '请选择内容',
                        'val': 'username',
                        'list': [{
                            value: '1',
                            label: '巡检人员1'
                        }, {
                            value: '2',
                            label: '巡检人员2'
                        }, {
                            value: '3',
                            label: '巡检人员3'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stationId',
                        'list': []
                    }, {
                        'status': 2,
                        'title': '月份',
                        'placeholder': '请选择内容',
                        'val': 'month',
                        'list': [{
                            value: '1',
                            label: '一月'
                        }, {
                            value: '2',
                            label: '二月'
                        }, {
                            value: '3',
                            label: '三月'
                        }, {
                            value: '4',
                            label: '四月'
                        }, {
                            value: '5',
                            label: '五月'
                        }, {
                            value: '6',
                            label: '六月'
                        }, {
                            value: '7',
                            label: '七月'
                        }, {
                            value: '8',
                            label: '八月'
                        }, {
                            value: '9',
                            label: '九月'
                        }, {
                            value: '10',
                            label: '十月'
                        }, {
                            value: '11',
                            label: '十一月'
                        }, {
                            value: '12',
                            label: '十二月'
                        }]
                    }],
                    defaultReq: {
                        username: '',
                        stationId: '',
                        month: ''
                    }
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info3: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '人员名称',
                    'width': 10,
                    'value': 'name'
                }, {
                    'label': '所属车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '所属线路',
                    'width': 10,
                    'value': 'line'
                }, {
                    'label': '月份',
                    'width': 15,
                    'value': 'month'
                }, {
                    'label': '巡检台次',
                    'width': 10,
                    'value': 'checkNum'
                }, {
                    'label': '处理故障单次数',
                    'width': 15,
                    'value': 'faultNum'
                }],
                isReq: {},
                equList: []
            };
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData02.defaultReq));
            this.staffStatisticsFn(this.isReq);
        },
        methods: {
            ...mapActions(['_getList']),
            //搜索的传值
            fifterBtnFn(req) {
                this.isReq = req;
                this.staffStatisticsFn(req);
            },
            //人员情况统计
            staffStatisticsFn(req) {
                const ops = {
                    curPage: this.currentPage,
                    pageSize: this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'staffStatistics',
                    callback: res => {
                        this.equList = res.rows;
                        this.pageTotal = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.staffStatisticsFn(this.isReq);
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
