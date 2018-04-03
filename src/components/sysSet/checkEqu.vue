<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
        </div>
        <div class=" pagination ">
            <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage}}/{{totalPage}}</span>
            </el-pagination>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
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
                isShowPop: false,
                currentId: '',//当前编辑的用户id
                popData1: {
                    'titleTotal': '编辑操作方式',
                    'options': [{
                        'status': 2,
                        'title': '操作方式',
                        'placeholder': '请选择操作方式',
                        'val': 'operationMode',
                        'list': [{
                            value: '0',
                            label: '未设置'
                        }, {
                            value: '1',
                            label: '手动操作'
                        }, {
                            value: '2',
                            label: '自动同步'
                        }]
                    }]
                },
                searchData: {
                    'btnShow': {
                        'export': true
                    },
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
                        'val': 'deviceInLineId',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'deviceSys',
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
                        'val': 'deviceName'
                    }]
                },
                info1: [{
                    'label': '公司名称',
                    'width': 15,
                    'value': 'deviceCompanyName'
                }, {
                    'label': '线路名称',
                    'width': 20,
                    'value': 'deviceInLineName'
                }, {
                    'label': '车站名称',
                    'width': 20,
                    'value': 'deviceInStationName'
                }, {
                    'label': '设备编号',
                    'width': 20,
                    'value': 'deviceCode'
                }, {
                    'label': '操作方式',
                    'width': 15,
                    'value': 'operationShow'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: []
            };
        },
        created() {
            this.getEquConfigListFn();
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.id);
            },
            //编辑操作
            editFn(id) {
                this.currentId = id;
                this.isShowPop = true;
            },
            saveFn(req) {
                const ops = {
                    'id': this.currentId
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getInfo({
                    ops: ops,
                    api: 'equConfigUpdate',
                    callback: () => {
                        this.$message.success('保存成功！');
                        this.isShowPop = false;
                        this.getEquConfigListFn();
                    }
                });
            },
            cancleFn() {
                this.isShowPop = false;
            },
            getEquConfigListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'equConfigList',
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
                this.getEquConfigListFn();
            },
            //获取筛选的值
            filterBtn(req) {
                this.getEquConfigListFn(req);
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
