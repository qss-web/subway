<template>
    <div class="equWrap">
        <div class="searchWrap ">
            <v-sub-search v-on:receiveBtnFn="btnsFn" v-on:filter="fifterBtnFn" v-bind:searchData="searchData01"></v-sub-search>
        </div>
        <div class="tab ">
            <v-search-list v-on:ids="getIdsFn" v-bind:other="otherInfo " v-bind:label="info2" v-bind:list="equList" v-on:receive="clickFn"></v-search-list>
            <div class=" pagination ">
                <el-pagination :page-size=" pageSize " @current-change="changePages" layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                    <span>{{currentPage}}/{{pageTotal}}</span>
                </el-pagination>
            </div>
        </div>
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 12, //每页显示数量
                pageTotal: 0,//总页数
                pageNumber: 0,//总条目数
                isShowPop: false,
                searchData01: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' },
                        { 'title': '删除', 'fn': 'deleteFn' },
                        { 'title': '导入', 'fn': 'importFn2' },
                        { 'title': '导出', 'fn': 'exportFn' }
                        // { 'title': '下载', 'fn': 'downloadFn' }
                    ],
                    'options': [{
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 1,
                        'title': '故障部位',
                        'placeholder': '请输入内容',
                        'val': 'faultPosition'
                    }, {
                        'status': 1,
                        'title': '故障原因',
                        'placeholder': '请输入内容',
                        'val': 'faultReason'
                    }, {
                        'status': 1,
                        'title': '维护建议',
                        'placeholder': '请输入内容',
                        'val': 'repairStrategy'
                    }],
                    defaultReq: {
                        deviceTypeCode: ''
                    }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 3 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                info2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '设备类型编码',
                    'width': 10,
                    'value': 'deviceTypeCode'
                }, {
                    'label': '设备类型',
                    'width': 10,
                    'value': 'deviceType'
                }, {
                    'label': '故障部位编码',
                    'width': 10,
                    'value': 'faultPositionCode'
                }, {
                    'label': '故障部位',
                    'width': 10,
                    'value': 'faultPosition'
                }, {
                    'label': '故障原因编码',
                    'width': 10,
                    'value': 'faultReasonCode'
                }, {
                    'label': '故障原因',
                    'width': 10,
                    'value': 'faultReason'
                }, {
                    'label': '维修策略编码',
                    'width': 10,
                    'value': 'repairStrategyCode'
                }, {
                    'label': '维修建议',
                    'width': 10,
                    'value': 'repairStrategy'
                }, {
                    'label': '操作',
                    'width': 10,
                    'btn': [{ 'monitor': true, 'name': '编辑', 'fn': 'editFn' }]
                }],
                popData1: {
                    'titleTotal': '新增',
                    'options': [{
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 1,
                        'title': '故障部位编码',
                        'placeholder': '请输入内容',
                        'val': 'faultPositionCode'
                    }, {
                        'status': 1,
                        'title': '故障部位',
                        'placeholder': '请输入内容',
                        'val': 'faultPosition'
                    }, {
                        'status': 1,
                        'title': '故障原因编码',
                        'placeholder': '请输入内容',
                        'val': 'faultReasonCode'
                    }, {
                        'status': 1,
                        'title': '故障原因',
                        'placeholder': '请输入内容',
                        'val': 'faultReason'
                    }, {
                        'status': 1,
                        'title': '维修策略编码',
                        'placeholder': '请输入内容',
                        'val': 'repairStrategyCode'
                    }, {
                        'status': 1,
                        'title': '维修建议',
                        'placeholder': '请输入内容',
                        'val': 'repairStrategy'
                    }]
                },
                equList: [],
                isReq: {},
                ids: '',
                powerControl: []
            };
        },
        computed: {
            ...mapState(['isPowerShow'])
        },
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData01.defaultReq));
            this.faultListFn(this.isReq);
            if(this.isPowerShow) {
                this.powerControl = eval(this.isPowerShow)[1];
                //查询
                if(!this.powerControl[0].flag) {
                    this.searchData01.noCheck = true;
                }
                //导出
                if(!this.powerControl[1].flag) {
                    this.searchData01.btnShow.pop();
                }
                //增加
                if(!this.powerControl[2].flag) {
                    this.searchData01.btnShow.forEach((item, index) => {
                        if(item.fn == 'addFn') {
                            this.searchData01.btnShow.splice(index, 1);
                        }
                    });
                }
                //删除
                if(!this.powerControl[3].flag) {
                    this.searchData01.btnShow.forEach((item, index) => {
                        if(item.fn == 'deleteFn') {
                            this.searchData01.btnShow.splice(index, 1);
                        }
                    });
                }
                //编辑
                if(!this.powerControl[4].flag) {
                    this.info2.pop();
                }
                //导入
                if(!this.powerControl[5].flag) {
                    this.searchData01.btnShow.forEach((item, index) => {
                        if(item.fn == 'importFn2') {
                            this.searchData01.btnShow.splice(index, 1);
                        }
                    });
                }
            }
        },
        methods: {
            ...mapActions(['_getList']),
            ...mapMutations(['_itemObj', '_currentIndex']),
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            btnsFn(fn) {
                this[fn]();
            },
            //增加
            addFn() {
                this._itemObj('');
                this.isShowPop = true;
            },
            //删除
            deleteFn() {
                if(!this.ids) {
                    this.$message.error('请至少选择一条数据！');
                    return false;
                }
                this._getList({
                    ops: {
                        'ids': this.ids
                    },
                    api: 'faultDel',
                    callback: () => {
                        this.$message.success('删除成功');
                        this.faultListFn(this.isReq);
                    }
                });
            },
            //导出
            exportFn() {
                this._getList({
                    ops: {
                        type: '5',
                        ids: this.ids
                    },
                    api: 'exportApi',
                    callback: res => {
                        if(res.url) {
                            window.location.href = res.url;
                        } else {
                            this.$message.error(res.message);
                        }
                    }
                });
            },
            //列表的按钮点击
            clickFn(val) {
                this[val]();
            },
            //编辑操作
            editFn() {
                this.isShowPop = true;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.faultListFn(this.isReq);
            },
            //故障库列表
            faultListFn(req) {
                const ops = {
                    curPage: this.currentPage,
                    pageSize: this.pageSize
                };

                this._currentIndex(ops);
                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'faultList',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.equList = res.rows;
                        this.pageTotal = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //搜索的传值
            fifterBtnFn(req) {
                this.isReq = req;
                this.faultListFn(req);
            },
            //关闭弹出框并保存数据
            saveFn(req) {
                this._getList({
                    ops: req,
                    api: 'faultAdd',
                    callback: () => {
                        this.$message.success('新增成功！');
                        this.isShowPop = false;
                        this.faultListFn(this.isReq);
                    }
                });
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            }
        }
    };
</script>
<style lang="less" scoped>
    .equWrap {
        width: 99.4%;
        margin: 0rem auto 0.24rem auto;
        padding: 0.18rem 0 0.15rem;
        background: #d7dbde;
        border-radius: 10px;
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
            border-top: 1px solid #587386;
            .pagination {
                text-align: center;
                padding: 0.1rem 0;
                background: #e5e8f7;
                border: 1px solid #587386;
                border-top: none;
            }
        }
    }
</style>
