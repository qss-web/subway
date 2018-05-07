<template>
    <div>
        <div class="searchWrap">
            <v-sub-search v-bind:searchData="searchData" v-on:receiveBtnFn="btnsFn" v-on:filter="fifterBtnFn"></v-sub-search>
        </div>
        <div class="system clearfix">
            <dl class="left leftTab">
                <dt>
                    <span v-on:click="isRoleFn(true)" v-bind:class="{active:isRole==true}">角色</span>
                    <span v-on:click="isRoleFn(false)" v-bind:class="{active:isRole==false}">手机</span>
                </dt>
                <dd v-if="isRole">
                    <ul>
                        <li v-bind:class="{ active: roleIndex == index }" v-for="(item, index) in roleList" v-on:click="roleFn(index,item.value)">
                            <span>{{item.label}}</span>
                            <span class="icon">
                                <i class="el-icon-check"></i>
                            </span>
                        </li>
                    </ul>
                </dd>
                <dd v-else>
                    <ul>
                        <li v-bind:class="{ active: telIndex == index }" v-for="(item, index) in telList" v-on:click="telFn(index,item.id)">
                            <span>{{item.mobileName}}</span>
                            <span class="icon">
                                <i class="el-icon-check"></i>
                            </span>
                        </li>
                    </ul>
                </dd>
            </dl>
            <div class="right">
                <div class="middleKey">
                    <v-system-list v-bind:other="otherInfo" v-bind:label="info1" v-bind:list="equList" v-on:receive="btnFn"></v-system-list>
                </div>
                <div class=" pagination ">
                    <el-pagination :page-size=" pageSize " @current-change="changePages " layout="prev, slot, next " :total="pageNumber" prev-text="上一页 " next-text="下一页 ">
                        <span>{{currentPage}}/{{totalPage}}</span>
                    </el-pagination>
                </div>
            </div>
        </div>
        <v-pop-table v-if="isShowPop" v-bind:info="chooseInfo" v-on:receive="closeFn" v-on:success="closeRefreshFn"></v-pop-table>
    </div>
</template>
<script>
    // webapi/auth/inside/device/list
    // {"type":"1","id":"1",deviceName:"","curPage":"1","pageSize":"10"}
    // type 1、角色  2、手机
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                isShowPop: false, //是否展示增加的弹出框
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                totalPage: 0,//总页数
                pageNumber: 0,//总条目数
                isRole: true, //选项卡
                roleIndex: 0,
                roleList: [],
                telIndex: 0,
                telList: [],
                roleTelType: 1,//  type 1、角色  2、手机
                roleTelId: '', //角色或者手机的id
                chooseInfo: {},
                otherInfo: {
                    isCheck: false //是否显示多选框
                },
                searchData: {
                    'btnShow': [
                        { 'title': '增加', 'fn': 'addFn' }
                    ],
                    'options': [{
                        'status': 1,
                        'title': '设备名称',
                        'placeholder': '请输入内容',
                        'val': 'deviceName'
                    }]
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 18,
                    'value': 'deviceInStationName'
                }, {
                    'label': '线路',
                    'width': 20,
                    'value': 'deviceInLineName'
                }, {
                    'label': '设备系统',
                    'width': 13,
                    'value': 'deviceSys'
                }, {
                    'label': '设备名称',
                    'width': 20,
                    'value': 'deviceName'
                }, {
                    'label': '操作',
                    'width': 15,
                    'btn': [{ 'delete': true, 'name': '删除', 'fn': 'deleteFn' }]
                }],
                equList: [],
                isReq: {}
            };
        },
        created() {
            this.getRoleListFn();
        },
        methods: {
            ...mapActions(['_getList']),
            btnsFn(fn) {
                this[fn]();
            },
            //增加
            addFn() {
                this.chooseInfo.type = this.roleTelType;
                this.chooseInfo.id = this.roleTelId;
                this.isShowPop = true;
            },
            //获取角色列表
            getRoleListFn() {
                const ops = {};

                this._getList({
                    ops: ops,
                    api: 'getRoleList',
                    callback: res => {
                        this.roleList = res.rows;
                        if(res.rows.length != 0) {
                            this.roleTelId = res.rows[0].value;
                            this.roleTelType = '1';
                            this.getDeviceListFn(this.isReq);
                        }

                    }
                });
            },
            //获取手机列表
            getMobileListFn() {
                const ops = {};

                this._getList({
                    ops: ops,
                    api: 'getMobileList',
                    callback: res => {
                        this.telList = res.rows;
                        if(res.rows.length != 0) {
                            this.roleTelId = res.rows[0].id;
                            this.roleTelType = '2';
                            this.getDeviceListFn(this.isReq);
                        }
                    }
                });
            },
            //选项卡
            isRoleFn(val) {
                this.isRole = val;
                if(val) {
                    this.getRoleListFn(this.isReq);
                } else {
                    this.getMobileListFn(this.isReq);
                }
            },
            //获取列表
            getDeviceListFn(req) {
                const ops = {
                    type: this.roleTelType,
                    id: this.roleTelId,
                    curPage: this.currentPage,
                    pageSize: this.pageSize
                };

                if(req) {
                    Object.assign(ops, req);
                }
                this._getList({
                    ops: ops,
                    api: 'getDeviceList',
                    callback: res => {
                        this.equList = res.rows;
                        this.totalPage = res.total;
                        this.pageNumber = res.records;
                    }
                });
            },
            //子组件按钮
            btnFn(val) {
                this[val.fn](val.item);
            },
            //删除操作
            deleteFn(item) {
                const ops = {
                    type: this.roleTelType,
                    id: this.roleTelId,
                    ids: item.deviceId
                };

                this._getList({
                    ops: ops,
                    api: 'delDeviceInfo',
                    callback: () => {
                        this.$message.success('删除成功!');
                        this.getDeviceListFn(this.isReq);
                    }
                });
            },
            roleFn(index, id) {
                this.roleTelId = id;
                this.roleIndex = index;
                this.getDeviceListFn(this.isReq);
            },
            telFn(index, id) {
                this.roleTelId = id;
                this.telIndex = index;
                this.getDeviceListFn(this.isReq);
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this.getDeviceListFn(this.isReq);
            },
            //搜索的传值
            fifterBtnFn(req) {
                this.isReq = req;
                this.getDeviceListFn(req);
            },
            //关闭弹出框
            closeFn(val) {
                this.isShowPop = val;
            },
            //关闭弹框并刷新
            closeRefreshFn(val) {
                this.isShowPop = val;
                this.getDeviceListFn();
            }
        }
    };
</script>
<style lang="less" scoped>
    .searchWrap {
        padding-bottom: 0.14rem;
    }
    .system {
        .left {
            width: 3.5rem;
        }
        .right {
            width: 14.3rem;
        }
        .middleKey {
            border: 1px solid #71869b;
        }
        .leftTab {
            dt {
                span {
                    display: inline-block;
                    width: 1.36rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                    background: #7c8298;
                    color: #fff;
                    border: 0.01rem solid #7c8298;
                    font-size: 0.2rem;
                    border-bottom: none;
                    cursor: pointer;
                }
                span.active {
                    border: 0.01rem solid #454c67;
                    background: #e4e8f7;
                    color: #454c67;
                    border-bottom: none;
                }
                span:first-child {
                    margin-left: 0.18rem;
                }
            }
            dd {
                border: 0.01rem solid #71869b;
                background: #e4e8f7;
                margin-top: -0.01rem;
                min-height: 5.84rem;
                ul {
                    padding: 0.1rem 0.2rem;
                    li {
                        height: 0.42rem;
                        line-height: 0.42rem;
                        color: #2f4554;
                        font-size: 0.18rem;
                        text-indent: 1em;
                        overflow: hidden;
                        cursor: pointer;
                        span.icon {
                            float: right;
                            display: none;
                            margin-right: 0.2rem;
                        }
                    }
                    li.active {
                        background: rgba(124, 130, 152, 0.4);
                        color: #fff;
                        border-radius: 5px;
                        span.icon {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .pagination {
        text-align: center;
        padding-top: 0.1rem;
    }
</style>
