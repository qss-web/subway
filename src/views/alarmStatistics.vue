<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
            </div>
            <div class="tab">
                <ul class="title">
                    <dl class="notice flex">
                        <dd class="g-red">二级预警：{{equInfoCount[0]}}次</dd>
                        <dd class="g-light-orange">一级预警：{{equInfoCount[1]}}次</dd>
                        <dd class="g-green">运行：{{equInfoCount[2]}}次</dd>
                        <dd class="g-gray">断网：{{equInfoCount[3]}}次</dd>
                        <dd class="g-brown">停机：{{equInfoCount[4]}}次</dd>
                        <dd class="g-orange">全部：{{equTotal}}次</dd>
                    </dl>
                </ul>
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-search-list>
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
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 11, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                equInfoCount: [], //设备信息
                equTotal: 0, //设备信息全部
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'line',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'station'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
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
                    style: 2 //列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它,4站点列表,5站台门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 15,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 15,
                    'value': 'time'
                }, {
                    'label': '预警事件',
                    'width': 35,
                    'value': 'event'
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
            this.getTodayAlarmFn();
        },
        methods: {
            ...mapActions(['_getList']),
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getTodayAlarmFn();
            },
            //列表子组件按钮
            btnFn(val) {
                this[val]();
            },
            //监测
            monitorFn() {
                this.$router.push('monitor');
            },
            getTodayAlarmFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'todayAlarm',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equInfoCount = res.counts;
                        res.counts.forEach(item => {
                            this.equTotal += item;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.getTodayAlarmFn(req);
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
        margin: 0 auto;
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
        .title {
            background: #666b79;
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
            padding: 0.07rem 0;
            background: #45484f;
            border: 1px solid #587386;
            border-top: none;
        }
    }
</style>


