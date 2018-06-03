<template>
    <div class="timeManagement">
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:getEquName="getEquNameFn" v-on:filter="filterBtn"></v-sub-search>
        </div>
        <div class="middleKey">
            <v-system-list v-bind:label="info1" v-bind:other="otherInfo" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
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
    import { mapActions, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                otherInfo: {
                    isCheck: false //是否显示多选框
                },
                popData1: {
                    'titleTotal': '编辑',
                    'options': [{
                        'status': 1,
                        'title': '运行时间',
                        'placeholder': '请输入累计运行时间',
                        'val': 'runhour'
                    }]
                },
                searchData: {
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请输入内容',
                        'val': 'deviceInLineId'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId'
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 6,
                        'title': '设备名称',
                        'placeholder': '请选择内容',
                        'val': 'deviceName'
                    }],
                    defaultReq: {
                        deviceInLineId: '6号线西延线',
                        deviceInStationId: '',
                        deviceTypeCode: '',
                        deviceName: ''
                    }
                },
                info1: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '运营公司',
                    'width': 10,
                    'value': 'deviceCompanyName'
                }, {
                    'label': '项目部',
                    'width': 8,
                    'value': 'deviceProjectDepartmentName'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'deviceInLineName'
                }, {
                    'label': '车站',
                    'width': 8,
                    'value': 'deviceInStationName'
                }, {
                    'label': '设备系统',
                    'width': 10,
                    'value': 'deviceSys'
                }, {
                    'label': '设备名称',
                    'width': 10,
                    'value': 'deviceName'
                }, {
                    'label': '安装合同编号',
                    'width': 10,
                    'value': 'deviceContractCode'
                }, {
                    'label': '位置',
                    'width': 11,
                    'value': 'devicePosition'
                }, {
                    'label': '每天运行时间（小时）',
                    'width': 12,
                    'value': 'runhour'
                }, {
                    'label': '操作',
                    'width': 8,
                    // 'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }, { 'edit': true, 'name': '编辑', 'fn': 'editFn' }]
                    'btn': [{ 'delete': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                equList: [],
                getEquNameArr: [],
                isReq: {}
            };
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            this.getEquRunTimeListFn(this.isReq);
            this.getEquNameFn({ 'deviceInLineId': this.isReq.deviceInLineId });
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_itemObj', '_equNameList','_currentIndex']),
            //获取列表
            getEquRunTimeListFn(req) {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };
                this._currentIndex(ops);

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'equRunTimeList',
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
                this.getEquRunTimeListFn(this.isReq);
            },
            //获取筛选的值
            filterBtn(req) {
                req.deviceName = req.deviceName.toString();
                this.isReq = req;
                this.getEquRunTimeListFn(req);
            },
            cancleFn() {
                this.isShowPop = false;
            },
            saveFn(req) {
                this._getInfo({
                    ops: req,
                    api: 'equRunTimeUpdate',
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
            //编辑操作
            editFn(id, item) {
                this._itemObj(item);
                this.isShowPop = true;
            },
            //获取设备名称
            getEquNameFn(req) {
                this._getList({
                    ops: req,
                    api: 'selectlist',
                    callback: res => {
                        this.getEquNameArr = [];
                        res.forEach(item => {
                            this.getEquNameArr.push({ 'label': item.deviceName, 'value': item.id });
                        });
                        this._equNameList(this.getEquNameArr);
                    }
                });
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
