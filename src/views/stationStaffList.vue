<template>
    <div>
        <div class="equWrap">
            <div class="title">综合排名</div>
            <div class="tab">
                <ul class="flex">
                    <li>
                        <div class="subTitle">当月各站故障次数</div>
                        <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
                    </li>
                    <li>
                        <div class="subTitle">当月人员工作量</div>
                        <v-search-list v-bind:other="otherInfo1" v-bind:label="info2" v-bind:list="equList2.data"></v-search-list>
                    </li>
                </ul>
            </div>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="equList.total " prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{Math.ceil(equList.total / pageSize)}}</span>
                </el-pagination>
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
                    style: 6 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它
                },
                otherInfo1: {
                    isCheck: false, //是否显示多选框
                    style: 7 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '姓名',
                    'width': 10,
                    'value': 'name'
                }, {
                    'label': '故障单',
                    'width': 20,
                    'value': 'faultOrder'
                }],
                info2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'num'
                }, {
                    'label': '姓名',
                    'width': 10,
                    'value': 'name'
                }, {
                    'label': '当月人员工作量',
                    'width': 20,
                    'value': 'workload'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        faultOrder: '故障单'
                    }]
                },
                equList2: {
                    total: 9,
                    data: [{
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
                    }, {
                        num: '序号',
                        name: '线路',
                        workload: '故障单'
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
        padding-bottom: 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
        .title {
            height: 0.62rem;
            line-height: 0.62rem;
            font-size: 0.3rem;
            text-indent: 2em;
        }
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        ul {
            border: 1px solid #587386;
            align-items: flex-start;
            li {
                flex: 1;
                .subTitle {
                    height: 0.46rem;
                    line-height: 0.46rem;
                    text-align: center;
                    color: #142163;
                    font-size: 0.2rem;
                }
            }
            li:nth-child(1) {
                .subTitle {
                    background: #ccd2ec;
                }
            }
            li:nth-child(2) {
                .subTitle {
                    background: #dadff2;
                }
            }
        }
    }
    .pagination {
        text-align: center;
        padding: 0.1rem 0;
    }
</style>


