<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-on:receive="addFn" v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:getEquName="getEquNameFn" v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                getEquNameArr: [],//接口获取的设备名称
                popData1: {
                    'titleTotal': '新增设备',
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'deviceInLineId',
                        'list': [{
                            value: '6号线西延线',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId',
                        'list': [{
                            value: '金安桥站',
                            label: '金安桥站'
                        }, {
                            value: '苹果园站',
                            label: '苹果园站'
                        }, {
                            value: '苹果园南路站',
                            label: '苹果园南路站'
                        }, {
                            value: '西黄村站',
                            label: '西黄村站'
                        }, {
                            value: '廖公庄站',
                            label: '廖公庄站'
                        }, {
                            value: '田村站',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode',
                        'list': [{
                            value: '0',
                            label: '站台门'
                        }, {
                            value: '7',
                            label: '自动扶梯'
                        }, {
                            value: '8',
                            label: '风机'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备名称',
                        'placeholder': '请选择内容',
                        'val': 'id',
                        'list': []
                    }, {
                        'status': 5,
                        'title': '时间',
                        'placeholder': '请选择时间',
                        'val': 'dateTime'
                    }, {
                        'status': 2,
                        'title': '状态',
                        'placeholder': '请选择状态',
                        'val': 'status',
                        'list': [{
                            value: '1',
                            label: '开启'
                        }, {
                            value: '0',
                            label: '关闭'
                        }]
                    }]
                },
                searchData: {
                    'btnShow': {
                        'add': true,
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
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
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'line'
                }, {
                    'label': '所属车站',
                    'width': 8,
                    'value': 'stationName'
                }, {
                    'label': '设备系统',
                    'width': 8,
                    'value': 'equSysName'
                }, {
                    'label': '主要设备名称',
                    'width': 10,
                    'value': 'equName'
                }, {
                    'label': '设备安装位置',
                    'width': 10,
                    'value': 'address'
                }, {
                    'label': '设备编号',
                    'width': 8,
                    'value': 'equNum'
                }, {
                    'label': '设备当前状态',
                    'width': 7,
                    'value': 'statusValue'
                }, {
                    'label': '状态变更时刻',
                    'width': 13,
                    'value': 'changeTime'
                }, {
                    'label': '累计运行时间（小时）',
                    'width': 11,
                    'value': 'runTimeText'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }]
                }],
                equList: []
            };
        },
        created() {
            this.getEquRunTimeListFn();
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj']),
            //获取列表
            getEquRunTimeListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'equRunList',
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
                this.getEquRunTimeListFn();
            },
            //获取筛选的值
            filterBtn(req) {
                this.getEquRunTimeListFn(req);
            },
            cancleFn() {
                this.isShowPop = false;
            },
            saveFn(req) {
                this._getInfo({
                    ops: req,
                    api: 'equRunAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.getEquRunTimeListFn();
                    }
                });
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id, val.item);
            },
            //增加用户操作
            addFn(val) {
                this._itemObj('');
                this.isShowPop = val;
            },
            //删除操作
            deleteFn(id) {
                this._getList({
                    ops: { 'id': id },
                    api: 'equRunDel',
                    callback: () => {
                        this.$message.success('删除成功！');
                        this.getEquRunTimeListFn();
                    }
                });
            },
            //获取设备名称
            getEquNameFn(req) {
                if(req.deviceTypeCode && req.deviceInLineId && req.deviceInStationId) {
                    this._getList({
                        ops: req,
                        api: 'selectlist2',
                        callback: res => {
                            res.forEach(item => {
                                this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.id });
                            });
                            this.popData1.options.forEach(item1 => {
                                if(item1.val == 'id') {
                                    item1.list = this.getEquNameArr;
                                }
                            });
                        }
                    });
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .timeManagement {
        .searchWrap {
            padding-bottom: 0.14rem;
        }
        .middleKey {
            border: 1px solid #71869b;
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
