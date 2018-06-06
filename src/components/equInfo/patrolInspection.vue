<template>
    <div class="txt-center" style="min-height: 8.31rem;">
        <div class="flex" style=" padding-top: 0.39rem;">
            <div class="showChart">
                <v-ring-diagram id="runIndex1" v-if="showValue.xjnum" title="巡视巡检条数" :time="showValue.xjnum+'条'" :showData="test1" :size="size" :setStyle="style"></v-ring-diagram>
                <p v-else>
                    <span class="data">暂无数据</span>
                    <span class="title">巡视巡检条数</span>
                </p>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex2" v-if="showValue.zcnum" title="正常条数" :time="showValue.zcnum+'条'" :showData="test2" :size="size" :setStyle="style"></v-ring-diagram>
                <p v-else>
                    <span class="data">暂无数据</span>
                    <span class="title">正常条数</span>
                </p>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex3" v-if="showValue.gznum" title="故障条数" :time="showValue.gznum+'条'" :showData="test3" :size="size" :setStyle="style"></v-ring-diagram>
                <p v-else>
                    <span class="data">暂无数据</span>
                    <span class="title">故障条数</span>
                </p>
            </div>
        </div>
        <v-search-list :other="otherInfo" :label="info1" :list="equList"></v-search-list>
        <div class="pagination">
            <el-pagination :page-size="pageSize" @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}} / {{totalPage}}</span>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                equId: '',//设备id
                size: {
                    width: '2.6rem',
                    height: '2.6rem'
                },
                showValue: {},
                test1: [{
                    y: 360,
                    color: '#32b16c'
                }],
                test2: [{
                    y: 360,
                    color: '#63869e'
                }],
                test3: [{
                    y: 360,
                    color: '#13b5b1'
                }],
                style: {
                    color: '#63869e',
                    fontSize: '0.2rem',
                    font: '0.22rem'
                },
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 9 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '类别',
                    'width': 10,
                    'value': 'sort'
                }, {
                    'label': '安装车站',
                    'width': 15,
                    'value': 'installStations'
                }, {
                    'label': '设备编号',
                    'width': 15,
                    'value': 'equNum'
                }, {
                    'label': '日期',
                    'width': 15,
                    'value': 'date'
                }, {
                    'label': '到达时间',
                    'width': 15,
                    'value': 'arrivalTime'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 19,
                    'value': 'record'
                }, {
                    'label': '执行人',
                    'width': 15,
                    'value': 'executor'
                }],
                equList: []
            };
        },
        created() {
            this.equId = this.$route.query.id;
            this.infoCheckFn();
            this.infoCheckListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_currentIndex']),
            infoCheckFn() {
                this._getList({
                    ops: { id: this.equId },
                    api: 'infoCheck',
                    callback: res => {
                        this.showValue = res;
                    }
                });
            },
            infoCheckListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);

                Object.assign(ops, { id: this.equId });

                this._getList({
                    ops: ops,
                    api: 'infoCheckList',
                    callback: res => {
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.infoCheckListFn();
            }
        }
    };
</script>

<style lang="less" scoped>
    .showChart {
        flex: 1;
        padding-bottom: 0.28rem;
        p {
            span {
                display: block;
            }
            .data {
                min-height: 2.3rem;
                line-height: 2.3rem;
            }
            .title {
                color: #63869e;
                font-size: 0.2rem;
            }
        }
    }
</style>

