<template>
    <div>
        <div class="mask"></div>
        <div class="popContent">
            <v-sub-search style="padding: 0.1rem 0.2rem;" v-bind:searchData="searchData" v-on:filter="fifterBtnFn"></v-sub-search>
            <div class="content">
                <div class="subContent clearfix">
                    <v-search-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:ids="getIdsFn" v-bind:curPage="currentPage"></v-search-list>
                </div>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
                <div class="btn flex">
                    <a href="javascript:;" v-on:click="onSubmit">确定</a>
                    <a href="javascript:;" v-on:click="onCancle">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 5, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                ids: '',
                searchData: {
                    'btnShow': {},
                    'options': [{
                        'status': 1,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'deviceName'
                    }, {
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'deviceTypeCode'
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'deviceInStationId'
                    }],
                    defaultReq: {
                        deviceName: '',
                        deviceTypeCode: '',
                        deviceInStationId: ''
                    }
                },
                otherInfo: {
                    isCheck: true,
                    style: 3
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 22.5,
                    'value': 'deviceInStationName'
                }, {
                    'label': '线路',
                    'width': 22.5,
                    'value': 'deviceInLineName'
                }, {
                    'label': '设备系统',
                    'width': 22.5,
                    'value': 'deviceSys'
                }, {
                    'label': '设备名称',
                    'width': 22.5,
                    'value': 'deviceName'
                }],
                equList: [],
                isReq: {}
            };
        },
        props: ['info'],
        created() {
            this.isReq = JSON.parse(JSON.stringify(this.searchData.defaultReq));
            //获取车站列表
            this.getDevicePopListFn(this.isReq);
        },
        methods: {
            ...mapActions(['_getList']),
            onSubmit() {
                this._getList({
                    ops: {
                        type: this.info.type,
                        id: this.info.id,
                        ids: this.ids
                    },
                    api: 'addDeviceInfo',
                    callback: () => {
                        this.$message.success('授权成功!');
                        this.$emit('success', false);
                    }
                });
            },
            onCancle() {
                this.$emit('receive', false);
            },
            //获取车站列表
            getDevicePopListFn(req) {
                var ops = {
                    type: this.info.type,
                    id: this.info.id,
                    curPage: this.currentPage,
                    pageSize: this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'getDevicePopList',
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
            //搜索的传值
            fifterBtnFn(req) {
                this.isReq = req;
                this.getDevicePopListFn(req);
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getDevicePopListFn(this.isReq);
            },
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            }
        }
    };
</script>
<style lang="less" scoped>
    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }
    .popContent {
        position: fixed;
        background: #fff;
        width: 10rem;
        left: 0;
        right: 0;
        top: 2rem;
        margin: 0 auto;
        z-index: 6;
        border-radius: 8px;
        overflow: hidden;
        h3 {
            height: 0.58rem;
            line-height: 0.58rem;
            background: #2f4553;
            color: #fff;
            font-size: 0.18rem;
            text-indent: 1em;
            font-weight: normal;
        }
        .content {
            .subContent {
                overflow: hidden;
                margin: 0 0.1rem;
                min-height: 3.2rem;
                border-top: 1px solid #587386;
                ul {
                    float: left;
                    width: 50%;
                    li {
                        padding-left: 0.26rem;
                        color: #2f4553;
                        margin-bottom: 0.2rem;
                        span {
                            float: left;
                            font-size: 0.2rem;
                            height: 0.46rem;
                            line-height: 0.46rem;
                            width: 1rem;
                        }
                    }
                }
            }
            .btn {
                text-align: center;
                margin-top: 0.2rem;
                a {
                    flex: 1;
                    height: 0.52rem;
                    line-height: 0.52rem;
                    background: #2f4553;
                    color: #fff;
                    text-align: center;
                }
                a:hover {
                    text-decoration: none;
                }
                a:nth-child(1) {
                    border-right: 1px solid #e5e8f7;
                }
            }
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }

    // // 分割线
    .el-input--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 1em;
    }
    .el-select--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 1em;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 2.4rem;
        vertical-align: top;
        border-radius: 5px;
    }
</style>
<style>
    .el-input__inner {
        color: #2f4553 !important;
    }
</style>
