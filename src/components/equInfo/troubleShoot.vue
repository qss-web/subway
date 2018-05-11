<template>
    <div class="txt-center">
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
        <v-search-list style="min-height: 5.76rem;" :other="otherInfo" :label="info1" :list="equList"></v-search-list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
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
                    style: 9 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 6,
                    'value': 'index'
                }, {
                    'label': '故障单号',
                    'width': 10,
                    'value': 'faultNum'
                }, {
                    'label': '线路',
                    'width': 6,
                    'value': 'line'
                }, {
                    'label': '车站',
                    'width': 6,
                    'value': 'station'
                }, {
                    'label': '设备安装位置',
                    'width': 18,
                    'value': 'installAddress'
                }, {
                    'label': '设备编号',
                    'width': 12,
                    'value': 'equNum'
                }, {
                    'label': '设备名称',
                    'width': 14,
                    'value': 'equName'
                }, {
                    'label': '故障系统',
                    'width': 14,
                    'value': 'faultSys'
                }, {
                    'label': '故障现象',
                    'width': 12,
                    'value': 'faultShow'
                }, {
                    'label': '修复时间',
                    'width': 12,
                    'value': 'repairTime'
                }, {
                    'label': '维修人员',
                    'width': 12,
                    'value': 'repairMember'
                }, {
                    'label': '修复确认',
                    'width': 12,
                    'value': 'repeatCon',
                    'showPic': '签名'
                }],
                equList: []
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
                this._getList({
                    ops: {
                        id: this.equId
                    },
                    api: 'infoFaultList',
                    callback: res => {
                        this.equList = res;
                    }
                });
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

