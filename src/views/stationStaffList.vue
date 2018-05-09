<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-on:receiveBtnFn="btnsFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList"></v-search-list>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import { formatDate } from '../utils';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                searchData: {
                    'btnShow': [
                        { 'title': '导出', 'fn': 'exportFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': '年',
                        'placeholder': '请选择内容',
                        'val': 'year',
                        'list': [{
                            value: '2018',
                            label: '2018'
                        }, {
                            value: '2019',
                            label: '2019'
                        }, {
                            value: '2020',
                            label: '2020'
                        }, {
                            value: '2021',
                            label: '2021'
                        }, {
                            value: '2022',
                            label: '2022'
                        }, {
                            value: '2023',
                            label: '2023'
                        }]
                    }, {
                        'status': 2,
                        'title': '月份',
                        'placeholder': '请选择内容',
                        'val': 'month',
                        'list': [{
                            value: '01',
                            label: '01'
                        }, {
                            value: '02',
                            label: '02'
                        }, {
                            value: '03',
                            label: '03'
                        }, {
                            value: '04',
                            label: '04'
                        }, {
                            value: '05',
                            label: '05'
                        }, {
                            value: '06',
                            label: '06'
                        }, {
                            value: '07',
                            label: '07'
                        }, {
                            value: '08',
                            label: '08'
                        }, {
                            value: '09',
                            label: '09'
                        }, {
                            value: '10',
                            label: '10'
                        }, {
                            value: '11',
                            label: '11'
                        }, {
                            value: '12',
                            label: '12'
                        }]
                    }],
                    defaultReq: {
                        station: '',
                        month: formatDate('', 5),
                        year: formatDate('', 6)
                    }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '所属线路',
                    'width': 10,
                    'value': 'station'
                }, {
                    'label': '月份',
                    'width': 10,
                    'value': 'month'
                }, {
                    'label': '故障预警次数',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '设备数量',
                    'width': 10,
                    'value': 'equAmount'
                }, {
                    'label': '综合排名',
                    'width': 10,
                    'value': 'rank'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'state'
                }],
                equList: [],
                isReq: {},
                ids: ''
            };
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.stationListFn(this.isReq);
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_currentIndex']),
            btnsFn(fn) {
                this[fn]();
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '16',
                        ids: this.ids
                    },
                    api: 'exportApi',
                    callback: res => {
                        if(res.url) {
                            window.location.href = res.url;
                        } else {
                            this.$message.error(res.message);
                        }
                    }
                });
            },
            stationListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: req,
                    api: 'stationList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.stationListFn(this.isReq);
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                this.stationListFn(req);
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
        margin: 0 auto 0 auto;
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


