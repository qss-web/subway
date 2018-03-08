<template>
    <div>
        <div class="searchWrap">
            <v-sub-search></v-sub-search>
        </div>
        <div class="tab">
            <ul class="title">
                <li v-on:click="tabShow=true" v-bind:class="tabShow?'active':''">实时报警信息</li>
                <li v-on:click="tabShow=false" v-bind:class="tabShow?'':'active'">以往历史事件</li>
                <dl class="notice flex">
                    <dd class="g-red">二级报警：3次</dd>
                    <dd class="g-light-orange">一级报警：2次</dd>
                    <dd class="g-gray">断网：2次</dd>
                    <dd class="g-orange">全部：7次</dd>
                </dl>
            </ul>
            <v-search-list v-if="tabShow" v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
            <v-search-list v-if="!tabShow" v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList.data"></v-search-list>
            <div class="pagination">
                <el-pagination background @current-change="changePages" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next " :total="equList.total "></el-pagination>
                </el-pagination>
            </div>
        </div>
        <v-go-back></v-go-back>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabShow: true,
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它,4站点列表,5屏蔽门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 13,
                    'value': 'time'
                }, {
                    'label': '车站',
                    'width': 13,
                    'value': 'station'
                }, {
                    'label': '报警事件',
                    'width': 15,
                    'value': 'alarmEvent'
                }, {
                    'label': '状态',
                    'width': 15,
                    'value': 'status'
                }, {
                    'label': '操作',
                    'width': 15,
                    'value': 'operationInfo'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
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
    .searchWrap {
        width: 98.5%;
        margin: 0.42rem auto 0.24rem auto;
    }
    .tab {
        width: 98.5%;
        margin: 0px auto;
        .title {
            padding-top: 0.11rem;
            background: #666b79;
            overflow: hidden;
            padding-left: 0.57rem;
            position: relative;
            li {
                width: 2rem;
                height: 0.39rem;
                line-height: 0.39rem;
                font-size: 0.2rem;
                float: left;
                text-align: center;
                background: #4a4d5e;
                color: #ffffff;
                border-radius: 8px 8px 0px 0px;
                margin-left: 0.05rem;
                cursor: pointer;
            }
            li.active {
                background: #d7d9db;
                color: #1f1e1e;
            }
            .notice {
                position: absolute;
                right: 1rem;
                top: 0;
                dd {
                    flex: auto;
                    font-size: 0.2rem;
                    margin-left: 0.26rem;
                    height: 0.48rem;
                    line-height: 0.5rem;
                }
            }
        }
        .pagination {
            text-align: center;
            padding: 0.14rem 0;
            background: #3c3f46;
        }
    }
</style>