<template>
    <div class="txt-center">
        <div class="flex" style=" padding-top: 0.39rem;">
            <div class="showChart">
                <v-ring-diagram id="runIndex1" title="累计运行时间" v-if="runInfo.ljyxsj" :time="runInfo.ljyxsj +'小时'" :showData="test1" :size="size" :setStyle="style"></v-ring-diagram>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex2" title="平均无故障运行时间" v-if="runInfo.pjwgzyxsj" :time="runInfo.pjwgzyxsj+'小时'" :showData="test2" :size="size" :setStyle="style"></v-ring-diagram>
            </div>
            <div class="showChart">
                <v-ring-diagram id="runIndex3" title="累积运行次数" v-if="runInfo.ljyxcs" :time="runInfo.ljyxcs+'次'" :showData="test3" :size="size" :setStyle="style"></v-ring-diagram>
            </div>
        </div>
        <ul class="dataShow">
            <li class="flex">
                <span>累计运行时间：{{runInfo.ljyxsj}}小时</span>
                <span>累计运行次数：{{runInfo.ljyxcs}}次</span>
                <span>能耗统计：{{runInfo.ljnh}}度</span>
            </li>
            <li class="flex">
                <span>平均无故障运行时间：{{runInfo.pjwgzyxsj}}小时</span>
                <span>最长无故障运行时间：{{runInfo.zcwgzyxsj}}小时</span>
                <span>最短无故障运行时间：{{runInfo.zdwgzyxsj}}小时</span>
            </li>
        </ul>
        <v-search-list :other="otherInfo" :label="info1" :list="equList"></v-search-list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                equId: '',//设备id
                runInfo: {},
                test1: [{
                    y: 360,
                    color: '#32b16c'
                }],
                size: {
                    width: '2.6rem',
                    height: '2.6rem'
                },
                style: {
                    color: '#63869e',
                    fontSize: '0.2rem',
                    font: '0.28rem'
                },
                test2: [{
                    y: 360,
                    color: '#63869e'
                }],
                test3: [{
                    y: 360,
                    color: '#13b5b1',
                    size: {
                        width: '3rem',
                        height: '3rem'
                    }
                }],
                otherInfo: {
                    isCheck: false, //是否显示多选框
                    style: 8 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '所属车站',
                    'width': 15,
                    'value': 'station'
                }, {
                    'label': '设备系统',
                    'width': 13,
                    'value': 'equSys'
                }, {
                    'label': '设备编号',
                    'width': 13,
                    'value': 'equNum'
                }, {
                    'label': '安装位置',
                    'width': 15,
                    'value': 'installPosition'
                }, {
                    'label': '设备状态',
                    'width': 15,
                    'value': 'equStatus'
                }, {
                    'label': '状态变更时间',
                    'width': 15,
                    'value': 'time'
                }],
                equList: []
            };
        },
        created() {
            this.equId = this.$route.query.id;
            this.infoRunFn();
            this.infoRunListFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            infoRunFn() {
                this._getInfo({
                    ops: {},
                    api: 'infoRun',
                    callback: res => {
                        this.runInfo = res;
                    }
                });
            },
            infoRunListFn() {
                this._getInfo({
                    ops: {
                        id: this.equId
                    },
                    api: 'infoRunList',
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
        flex: 1;
        padding-bottom: 0.24rem;
    }
    .dataShow {
        li {
            span {
                flex: 1;
                height: 0.38rem;
                line-height: 0.38rem;
                font-size: 0.18rem;
                color: #2f4554;
            }
        }
        li:nth-child(1) {
            background: #bcc2da;
        }
        li:nth-child(2) {
            background: #d7dae9;
        }
    }
</style>

