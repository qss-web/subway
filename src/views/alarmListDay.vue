<template>
    <div class="wholeWrap">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="tab">
            <ul class="title">
                <li class="active">预警信息</li>
                <dl class="notice flex">
                    <dd class="g-red">二级预警：3次</dd>
                    <dd class="g-light-orange">一级预警：2次</dd>
                    <dd class="g-gray">断网：2次</dd>
                    <dd class="g-orange">全部：7次</dd>
                </dl>
            </ul>
            <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{totalPage}}</span>
                </el-pagination>
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
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'line'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys'
                    }, {
                        'status': 1,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }]
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 18,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 13,
                    'value': 'time'
                }, {
                    'label': '预警事件',
                    'width': 25,
                    'value': 'alarmEvent'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'statusValue',
                    'status': 'status'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'monitor': true, 'name': '监测', 'fn': 'monitorFn' }]

                }],
                equList: []
            };
        },
        created() {
            this.getTimelyAlarmListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getTimelyAlarmListFn();
            },
            getTimelyAlarmListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'timelyAlarmList',
                    callback: res => {
                        this.equList = res.rows;
                        this.currentPage = res.page;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.getTimelyAlarmListFn(req);
            },
            //子组件按钮
            btnFn(val) {
                this[val]();
            },
            monitorFn() {
                this.$router.push('monitor');
            }
        }
    };
</script>

<style scoped lang="less">
    .searchWrap {
        width: 98.5%;
        padding: 0.42rem 0 0.24rem 0;
        margin: 0 auto;
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