<template>
    <div>
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData"></v-sub-search>
            </div>
            <div class="content">
                <dt class="flex title">
                    <span>海淀五路</span>
                    <span>2017年12月</span>
                    <span>&nbsp;</span>
                </dt>
                <dd class="listShow">
                    <ul class="flex">
                        <li>
                            <span>总运行时间</span>
                            <span>0小时</span>
                        </li>
                        <li>
                            <span>故障维修次数</span>
                            <span>0次</span>
                        </li>
                        <li>
                            <span>报警次数</span>
                            <span>0次</span>
                        </li>
                    </ul>
                    <div class="chartList clearfix" style="padding-bottom: 0.3rem;">
                        <div class="chart">sdsd</div>
                        <dl class="list">
                            <dt>设备可靠度</dt>
                            <dd>
                                <ul class="flex">
                                    <li>设备月可靠度</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>设备工作总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>故障停用总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最低设备月可靠度</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高故障月停用时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                                <ul class="flex">
                                    <li>最高月设备工作总时间</li>
                                    <li>2012-12</li>
                                    <li>0%</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </dd>
            </div>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchData: {
                    'options': [{
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    popSave() { }
                }
            };
        },
        methods: {
        }
    };
</script>

<style scoped lang="less">
    .equWrap {
        width: 99.4%;
        margin: 0.16rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #b8bcc7;
        border-radius: 10px;
        .content {
            width: 98.5%;
            margin: 0px auto;
            border: 1px solid #8195a7;
            border-top: none;
            dt.title {
                background: #54596d;
                span {
                    flex: 1;
                    height: 0.78rem;
                    line-height: 0.78rem;
                    text-align: center;
                    font-size: 0.4rem;
                    color: #fff;
                }
            }
            dd.listShow {
                padding: 0 0.2rem;
                background: #e5e8f7;
                ul {
                    li {
                        flex: 1;
                        margin: 0 0.22rem;
                        text-align: center;
                        span {
                            display: block;
                        }
                        span:nth-child(1) {
                            font-size: 0.38rem;
                            height: 1rem;
                            line-height: 1rem;
                            background: #fff;
                        }
                        span:nth-child(2) {
                            font-size: 0.62rem;
                            height: 1.94rem;
                            line-height: 1.94rem;
                            background: #54596d;
                            color: #fff;
                        }
                    }
                }
                .chartList {
                    margin-top: 0.12rem;
                    .chart {
                        width: 10.2rem;
                        float: left;
                    }
                    .list {
                        width: 7.55rem;
                        float: right;
                        border: 1px solid #8195a7;
                        dt {
                            height: 0.74rem;
                            line-height: 0.74rem;
                            text-align: center;
                            font-size: 0.32rem;
                            background: #54596d;
                            color: #ffffff;
                        }
                        dd {
                            ul {
                                line-height: 0.48rem;
                                li {
                                    flex: 1;
                                    font-size: 0.22rem;
                                }
                                li:nth-child(1) {
                                    flex: 2;
                                    text-align: left;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .searchWrap {
        width: 98.5%;
        padding: 0.09rem 0 0.04rem 0.2rem;
        margin: 0 auto;
        background: #ebecf0;
        border-top: 1px solid #768089;
    }
</style>


