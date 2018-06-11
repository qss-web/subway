<template>
    <div class="txt-center" style="min-height: 8.31rem;">
        <div class="flex">
            <div class="showChart">
                <v-pie-chart id="test1" v-if="test1[0].data.length!=0" v-bind:chartData="test1"></v-pie-chart>
                <p v-else>
                    暂无数据
                </p>
            </div>
            <div class="showChart">
                <v-pie-chart id="test2" v-if="test2[0].data.length!=0" v-bind:chartData="test2"></v-pie-chart>
                <p v-else>
                    暂无数据
                </p>
            </div>
        </div>
        <v-search-list :other="otherInfo" :label="info1" :list="equList" v-on:receive="clickFn"></v-search-list>
        <div class="pagination">
            <el-pagination :page-size="pageSize" @current-change="changePages" :current-page="currentPage" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}} / {{totalPage}}</span>
            </el-pagination>
        </div>
        <v-maintenance-sheet v-if="isPop" v-bind:isShow="false" v-on:isPop="isPopFn"></v-maintenance-sheet>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 11, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                equId: '',//设备id
                test1: [{
                    name: '故障维修',
                    data: []
                }],
                test2: [{
                    name: '故障维修',
                    data: []
                }],
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 9,
                    goToNextFn: 'goToFaultSheet' //跳转方法设置字段
                },
                info1: [{
                    'label': '序号',
                    'width': 4,
                    'value': 'index'
                }, {
                    'label': '故障单号',
                    'width': 14,
                    'value': 'faultNum'
                },
                //  {
                //     'label': '线路',
                //     'width': 6,
                //     'value': 'line'
                // }, {
                //     'label': '车站',
                //     'width': 6,
                //     'value': 'station'
                // }, {
                //     'label': '设备安装位置',
                //     'width': 18,
                //     'value': 'installAddress'
                // },
                {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'equNum'
                }, {
                    'label': '设备名称',
                    'width': 14,
                    'value': 'equName'
                }, {
                    'label': '故障系统',
                    'width': 10,
                    'value': 'faultSys'
                }, {
                    'label': '故障现象',
                    'width': 14,
                    'value': 'faultShow'
                }, {
                    'label': '修复时间',
                    'width': 16,
                    'value': 'repairTime'
                }, {
                    'label': '维修人员',
                    'width': 10,
                    'value': 'repairMember'
                }, {
                    'label': '修复确认',
                    'width': 8,
                    'value': 'repeatCon',
                    'showPic': '签名'
                }],
                equList: [],
                isPop: false
            };
        },
        created() {
            this.equId = this.$route.query.id;
            this.getPie1Fn();
            this.getPie2Fn();
            this.infoFaultListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_currentIndex']),
            clickFn(val) {
                this[val]();
            },
            getPie1Fn() {
                this._getList({
                    ops: {
                        'id': this.equId
                    },
                    api: 'getPie1',
                    callback: res => {
                        this.test1[0].data = res;
                    }
                });
            },
            getPie2Fn() {
                this._getList({
                    ops: {
                        'id': this.equId
                    },
                    api: 'getPie2',
                    callback: res => {
                        this.test2[0].data = res;
                    }
                });
            },
            infoFaultListFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._currentIndex(ops);
                Object.assign(ops, { id: this.equId });

                this._getList({
                    ops: ops,
                    api: 'infoFaultList',
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
                this.infoFaultListFn();
            },
            goToFaultSheet() {
                if(this.isPowerShow && this.isPowerShow.length > 3) {
                    this.powerControl = eval(this.isPowerShow)[3];
                    //编辑
                    if(!this.powerControl[3].flag) {
                        this.isPop = false;
                    } else {
                        this.isPop = true;
                    }
                } else {
                    this.isPop = true;
                }
            },
            isPopFn(value) {
                this.isPop = value;
            }
        }

    };
</script>

<style lang="less" scoped>
    .showChart {
        padding: 0.28rem 0;
        flex: 1;
        p {
            line-height: 2rem;
        }
    }
</style>

