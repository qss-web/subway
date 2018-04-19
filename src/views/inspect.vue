<template>
    <div class="wholeWrap">
        <div class="equWrap">
            <div class="searchWrap">
                <v-sub-search v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn" v-on:delete="deleteBtn"></v-sub-search>
            </div>
            <div class="tab">
                <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:ids="deleteValue"></v-search-list>
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
    import { mapActions, mapMutations } from 'vuex';
    import { formatDate } from '../utils';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 13, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                ids: '',//删除的id
                searchData: {
                    'btnShow': {
                        'export': true,
                        'delete': true
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
                        'status': 6,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'equName'
                    }, {
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择内容',
                        'val': 'equStatus',
                        'list': [{
                            value: '0',
                            label: '未巡检'
                        }, {
                            value: '1',
                            label: '已巡检'
                        }]
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    defaultReq: {
                        line: '6号线西延线',
                        station: '',
                        equSys: '',
                        equName: '',
                        equStatus: '',
                        startTime: formatDate('', 2) + '00:00:00',
                        endTime: formatDate('', 3)
                    }
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
                    'label': '线路',
                    'width': 10,
                    'value': 'line'
                }, {
                    'label': '安装车站',
                    'width': 20,
                    'value': 'station'
                }, {
                    'label': '设备编号',
                    'width': 10,
                    'value': 'equNum'
                }, {
                    'label': '日期（月/日）',
                    'width': 10,
                    'value': 'date'
                }, {
                    'label': '到达时间',
                    'width': 20,
                    'value': 'arriveTime'
                }, {
                    'label': '巡检状态',
                    'width': 10,
                    'value': 'status'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 11,
                    'value': 'equStatus',
                    'isShowRed': true
                }, {
                    'label': '执行人',
                    'width': 10,
                    'value': 'name'
                }],
                equList: [],
                getEquNameArr: [],
                isReq: {}
            };
        },
        props: ['list', 'label', 'checked'],
        created() {
            this.getCheckRatioListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_equNameList']),
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getCheckRatioListFn(this.isReq);
            },
            getCheckRatioListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'checkRatioList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //获取筛选的值
            filterBtn(req) {
                this.isReq = req;
                this.getCheckRatioListFn(req);
            },
            //删除接口
            deleteBtn() {
                if(this.ids) {
                    this._getList({
                        ops: {
                            'ids': this.ids
                        },
                        api: 'checkRatioDel',
                        callback: () => {
                            this.$message.success('删除成功！');
                            this.getCheckRatioListFn();
                        }
                    });
                }
            },
            deleteValue(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //获取设备名称
            getEquNameFn(req) {
                if(req.line && req.station && req.equSys) {
                    this._getList({
                        ops: req,
                        api: 'selectlist2',
                        callback: res => {
                            this.getEquNameArr = [];
                            res.forEach(item => {
                                this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.deviceUuid });
                            });
                            this._equNameList(this.getEquNameArr);
                        }
                    });
                }
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


