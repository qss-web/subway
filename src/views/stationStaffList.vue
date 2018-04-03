<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList"></v-search-list>
            </div>

        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
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
                    }]
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
                equList: {}
            };
        },
        props: ['list', 'label', 'checked'],
        created() {
            this.stationListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            currentList(index) {
                this.indexed = index;
            },
            stationListFn(req) {
                this._getList({
                    ops: req,
                    api: 'stationList',
                    callback: res => {
                        res.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList = res;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
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


