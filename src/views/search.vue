<template>
    <div>
        <v-search v-on:download="downloadFn"></v-search>
        <dl class="middleSort clearfix">
            <dd v-on:click="currentList(1)" v-bind:class="indexed == 1 ?'active':''">
                <p>设备档案 <span v-if="count.archives|| count.archives==0">{{count.archives+'份'}}</span></p>
                <img v-if="indexed!=1" src="../assets/search/sort01_gray.png" />
                <img v-if="indexed==1" src="../assets/search/sort01_orange.png" />
            </dd>
            <dd v-on:click="currentList(2)" v-bind:class="indexed == 2 ?'active':''">
                <p>预警信息 <span v-if="count.warnInfo || count.warnInfo==0">{{count.warnInfo+'份'}}</span></p>
                <img v-if="indexed!=2" src="../assets/search/sort02_gray.png" />
                <img v-if="indexed==2" src="../assets/search/sort02_orange.png" />
            </dd>
            <dd v-on:click="currentList(3)" v-bind:class="indexed == 3 ?'active':''">
                <p>故障报修单 <span v-if="count.fault || count.fault==0">{{count.fault+'份'}}</span></p>
                <img v-if="indexed!=3" src="../assets/search/sort03_gray.png" />
                <img v-if="indexed==3" src="../assets/search/sort03_orange.png" />
            </dd>
            <dd v-on:click="currentList(4)" v-bind:class="indexed == 4 ?'active':''">
                <p>图片 <span v-if="count.picture || count.picture==0">{{count.picture+'张'}}</span></p>
                <img v-if="indexed!=4" src="../assets/search/sort04_gray.png" />
                <img v-if="indexed==4" src="../assets/search/sort04_orange.png" />
            </dd>
            <dd v-on:click="currentList(5)" v-bind:class="indexed == 5 ?'active':''">
                <p>其它</p>
                <img v-if="indexed!=5" src="../assets/search/sort05_gray.png" />
                <img v-if="indexed==5" src="../assets/search/sort05_orange.png" />
            </dd>
        </dl>
        <v-search-list class="minHeight" v-on:ids="getIdsFn" v-if="indexed==1" v-bind:label="equLabel" v-bind:other="otherInfo1" v-bind:list="list" v-on:receive="clickFn"></v-search-list>
        <v-search-list class="minHeight" v-on:ids="getIdsFn" v-if="indexed==2" v-bind:label="equLabe2" v-bind:other="otherInfo" v-bind:list="list"></v-search-list>
        <v-search-list class="minHeight" v-on:ids="getIdsFn" v-if="indexed==3" v-on:receive="clickFn" v-bind:label="equLabe3" v-bind:other="otherInfo2" v-bind:list="list"></v-search-list>
        <div class="showPic" v-if="indexed==4">
            <img class="border-bg" src="../assets/other/footer-border.png" />
            <ul class="flex minHeight">
                <li v-for="(item, index) in picList" style="text-align: center;">
                    <img v-bind:src="item.url" />
                    <p>
                        <span style="display: inline-block; width: 0.24rem; height: 0.24rem; cursor: pointer" v-on:click="singleCheckFn(item)">
                        <img style="width: 0.24rem; height: 0.24rem;" v-if="!item.isCheck" src="../assets/search/check.png" />
                        <img style="width: 0.24rem; height: 0.24rem;" v-if="item.isCheck" src="../assets/search/checked.png" />
                        </span> {{item.name}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="others" v-if="indexed==5" style=" min-height: 5.3rem;">
            <ul class="title">
                <li v-on:click="otherFn(true)" v-bind:class="{active:subOther==true}">巡视巡检</li>
                <li v-on:click="otherFn(false)" v-bind:class="{active:subOther==false}">故障库</li>
            </ul>
            <v-search-list v-on:ids="getIdsFn" v-if="subOther " v-bind:label="equLabe5 " v-bind:other="otherInfo " v-bind:list="list"></v-search-list>
            <v-search-list v-on:ids="getIdsFn" v-if="!subOther " v-bind:label="equLabe4 " v-bind:other="otherInfo " v-bind:list="list"></v-search-list>
        </div>
        <div v-if="indexed == 1" class="pagination">
            <el-pagination :page-size=" pageSize01" @current-change="changePages01" :current-page="currentPage01" layout="prev, slot, next " :total="pageNumber01" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage01}}/{{totalPage01}}</span>
            </el-pagination>
        </div>
        <div v-if="indexed == 2" class="pagination">
            <el-pagination :page-size=" pageSize02 " @current-change="changePages02" :current-page="currentPage02" layout="prev, slot, next " :total="pageNumber02" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage02}}/{{totalPage02}}</span>
            </el-pagination>
        </div>
        <div v-if="indexed == 3" class="pagination">
            <el-pagination :page-size=" pageSize03 " @current-change="changePages03" :current-page="currentPage03" layout="prev, slot, next " :total="pageNumber03" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage03}}/{{totalPage03}}</span>
            </el-pagination>
        </div>
        <div v-if="indexed == 4" class="pagination5">
            <el-pagination :page-size=" pageSize04 " @current-change="changePages04" :current-page="currentPage04" layout="prev, slot, next " :total="pageNumber04" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage04}}/{{totalPage04}}</span>
            </el-pagination>
        </div>
        <div v-if="indexed == 5 && subOther" class="pagination">
            <el-pagination :page-size=" pageSize05 " @current-change="changePages05" :current-page="currentPage05" layout="prev, slot, next " :total="pageNumber05" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage05}}/{{totalPage05}}</span>
            </el-pagination>
        </div>
        <div v-if="indexed == 5 && !subOther" class="pagination">
            <el-pagination :page-size=" pageSize06 " @current-change="changePages06" :current-page="currentPage06" layout="prev, slot, next " :total="pageNumber06" prev-text="上一页 " next-text="下一页 ">
                <span>{{currentPage06}}/{{totalPage06}}</span>
            </el-pagination>
        </div>
        <v-maintenance-sheet v-if="isPop" v-on:isPop="isPopFn"></v-maintenance-sheet>
        <!-- <v-maintenance-sheet v-on:isPop="isPopFn"></v-maintenance-sheet> -->
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                picChecked: '',
                list: [],
                isPop: false,
                indexed: 1,
                currentPage01: 1, //当前页数
                pageSize01: 8, //每页显示数量
                pageNumber01: 0, //总条数
                totalPage01: 1, //总页数

                currentPage02: 1, //当前页数
                pageSize02: 8, //每页显示数量
                pageNumber02: 0, //总条数
                totalPage02: 1, //总页数

                currentPage03: 1, //当前页数
                pageSize03: 8, //每页显示数量
                pageNumber03: 0, //总条数
                totalPage03: 1, //总页数

                currentPage04: 1, //当前页数
                pageSize04: 5, //每页显示数量
                pageNumber04: 0, //总条数
                totalPage04: 1, //总页数

                currentPage05: 1, //当前页数
                pageSize05: 8, //每页显示数量
                pageNumber05: 0, //总条数
                totalPage05: 1, //总页数

                currentPage06: 1, //当前页数
                pageSize06: 8, //每页显示数量
                pageNumber06: 0, //总条数
                totalPage06: 1, //总页数
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 1 // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                },
                otherInfo1: {
                    isCheck: true, //是否显示多选框
                    style: 1, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                    goToNextFn: 'goToEquDetail' //跳转方法设置字段
                },
                otherInfo2: {
                    isCheck: true, //是否显示多选框
                    style: 1, // 列表共有三种样式，1 搜索模块的样式, 2预警信息列表的样式，3其它
                    goToNextFn: 'goToFaultSheet' //跳转方法设置字段
                },
                subOther: true, //其它子菜单二选一
                count: {},
                equLabel: [{
                    'label': '序号',
                    'width': 8,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 11,
                    'value': 'line'
                }, {
                    'label': '车站',
                    'width': 11,
                    'value': 'station'
                }, {
                    'label': '设备编号',
                    'width': 11,
                    'value': 'equNum'
                }, {
                    'label': '设备名称',
                    'width': 11,
                    'value': 'equName'
                }, {
                    'label': '设备系统',
                    'width': 11,
                    'value': 'equSystem'
                }, {
                    'label': '生产厂家',
                    'width': 11,
                    'value': 'factory'
                }, {
                    'label': '安装地点',
                    'width': 11,
                    'value': 'address'
                }, {
                    'label': '规格型号',
                    'width': 11,
                    'value': 'standard'
                }],
                equLabe2: [{
                    'label': '序号',
                    'width': 5,
                    'value': 'index'
                }, {
                    'label': '车站',
                    'width': 15,
                    'value': 'station'
                }, {
                    'label': '设备名称',
                    'width': 21,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 15,
                    'value': 'time'
                }, {
                    'label': '预警事件',
                    'width': 15,
                    'value': 'alarmEvent'
                }, {
                    'label': '状态',
                    'width': 10,
                    'value': 'statusValue'
                }],
                equLabe3: [{
                    'label': '序号',
                    'width': 8,
                    'value': 'index'
                }, {
                    'label': '故障单号',
                    'width': 9,
                    'value': 'faultNum'
                }, {
                    'label': '线路',
                    'width': 8,
                    'value': 'line'
                }, {
                    'label': '车站',
                    'width': 8,
                    'value': 'station'
                }, {
                    'label': '设备安装位置',
                    'width': 9,
                    'value': 'address'
                }, {
                    'label': '设备编号',
                    'width': 9,
                    'value': 'equNum'
                }, {
                    'label': '故障系统',
                    'width': 9,
                    'value': 'faultSys'
                }, {
                    'label': '故障现象',
                    'width': 9,
                    'value': 'faultAppear'
                }, {
                    'label': '修复时间',
                    'width': 9,
                    'value': 'repairTime'
                }, {
                    'label': '维修人员',
                    'width': 9,
                    'value': 'repairMember'
                }, {
                    'label': '修复确认',
                    'width': 9,
                    'value': 'repairConfirm',
                    'showPic': '签名'
                }],
                equLabe4: [{
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
                }],
                equLabe5: [{
                    'label': '序号',
                    'width': 9,
                    'value': 'index'
                }, {
                    'label': '线路',
                    'width': 13,
                    'value': 'line'
                }, {
                    'label': '安装车站',
                    'width': 13,
                    'value': 'station'
                }, {
                    'label': '设备编号',
                    'width': 13,
                    'value': 'equNum'
                }, {
                    'label': '日期',
                    'width': 13,
                    'value': 'date'
                }, {
                    'label': '到达时间',
                    'width': 13,
                    'value': 'arrivalTime'
                }, {
                    'label': '巡视巡检情况记录',
                    'width': 13,
                    'value': 'record'
                }, {
                    'label': '执行人',
                    'width': 13,
                    'value': 'executor'
                }],
                picList: [],
                queryInfo: '',
                ids: '',
                downloadType: 0, //下载的type
                exportApi: ''//导出的api
            };
        },
        computed: {
            ...mapState(['itemObj', 'searchVal', 'isPowerShown'])
        },
        watch: {
            searchVal() {
                if(this.searchVal) {
                    this.currentPage = 1;
                    this.queryInfo = this.searchVal;
                    this.queryCountFn(this.searchVal);
                    if(!this.subOther) {
                        this.currentPage06 = 1;
                        this.queryFaultlibraryFn(this.searchVal);
                    } else {
                        this['currentPage0' + this.indexed] = 1;
                        this['queryFn' + this.indexed](this.searchVal);
                    }
                }
            }
        },
        created() {
            if(this.searchVal) {
                this.queryInfo = this.searchVal;
                this.queryCountFn(this.searchVal);
                if(!this.subOther) {
                    this.queryFaultlibraryFn(this.searchVal);
                } else {
                    this['queryFn' + this.indexed](this.searchVal);
                }
            }
        },
        methods: {
            ...mapActions(['_getList', '_getInfo']),
            ...mapMutations(['_equInfo', '_currentIndex']),
            //图片的多选框
            singleCheckFn(item) {
                item.isCheck = true;
            },
            //获取多选框选中的ids
            getIdsFn(id) {
                this.ids = id.substr(0, id.length - 1);
            },
            //下载按钮
            downloadFn() {
                if(this.indexed == 1) {
                    this.downloadType = 1;
                } else if(this.indexed == 2) {
                    //预警信息
                    this.downloadType = 10;
                } else if(this.indexed == 3) {
                    this.downloadType = 9;
                } else if(this.indexed == 4) {
                    this.picList.forEach(item => {
                        if(item.isCheck) {
                            this.ids += item.id + ',';
                        }
                    });
                    this.ids = this.ids.substr(0, this.ids.length - 1);
                    //图片不需要type，制空
                    this.downloadType = '';
                } else if(this.indexed == 5 && this.subOther) {
                    //巡视巡检
                    this.downloadType = 7;
                } else {
                    //故障库
                    this.downloadType = 5;
                }
                if(this.ids) {
                    if(this.indexed == 4) {
                        this.exportApi = "downloadPic";
                    } else {
                        this.exportApi = "exportApi";
                    }
                    this._getList({
                        ops: {
                            type: this.downloadType,
                            ids: this.ids
                        },
                        api: this.exportApi,
                        callback: res => {
                            if(this.indexed == 4) {
                                window.location.href = res;
                            } else if(res.url) {
                                window.location.href = res.url;
                            } else {
                                this.$message.error(res.message);
                            }
                        }
                    });
                } else {
                    this.$message.error('请至少选择一列数据！');
                }
            },
            clickFn(val) {
                this[val]();
            },
            goToFaultSheet() {
                if(this.isPowerShow && this.isPowerShow.length > 3) {
                    this.powerControl = eval(this.isPowerShow)[3];
                    //编辑
                    if(!this.powerControl[3].flag) {
                        this.isPop = false;
                    } else {
                        this.isPop = true;
                    }
                } else {
                    this.isPop = true;
                }
            },
            //点击列表进入设备详情页
            goToEquDetail() {
                this._getList({
                    ops: { 'id': this.itemObj.id.toString() },
                    api: 'infoDetail',
                    callback: res => {
                        this._equInfo(res);
                        if(this.itemObj.equSystem == "站台门" || this.itemObj.equSystem == "风机") {
                            this.$router.push({ path: '/equInfoOther', query: { 'id': this.itemObj.id, 'isShow': true } });
                        } else {
                            this.$router.push({ path: '/equInfo', query: { 'id': this.itemObj.id, 'isShow': true } });
                        }
                    }
                });
            },
            currentList(index) {
                this.indexed = index;
                this.ids = "";
                if(this.queryInfo) {
                    this['queryFn' + index](this.queryInfo);
                }
            },
            //子菜单栏的点击
            otherFn(value) {
                this.subOther = value;
                if(value && this.queryInfo) {
                    this.queryFn5(this.queryInfo);
                } else if(this.queryInfo) {
                    this.queryFaultlibraryFn(this.queryInfo);
                }
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                this['queryFn' + this.indexed](this.queryInfo);
            },
            //改变当前页数-设备档案
            changePages01(val) {
                this.currentPage01 = val;
                this.queryFn1(this.queryInfo);
            },
            //改变当前页数-预警信息
            changePages02(val) {
                this.currentPage02 = val;
                this.queryFn2(this.queryInfo);
            },
            //改变当前页数-故障报修单
            changePages03(val) {
                this.currentPage03 = val;
                this.queryFn3(this.queryInfo);
            },
            //改变当前页数-图片
            changePages04(val) {
                this.currentPage04 = val;
                this.queryFn4(this.queryInfo);
            },
            //改变当前页数-其它-巡视巡检
            changePages05(val) {
                this.currentPage05 = val;
                this.queryFn5(this.queryInfo);
            },
            //改变当前页数-图片-故障库
            changePages06(val) {
                this.currentPage06 = val;
                this.queryFaultlibraryFn(this.queryInfo);
            },
            isPopFn(value) {
                this.isPop = value;
            },
            queryCountFn(value) {
                this._getInfo({
                    ops: { 'queryInfo': value },
                    api: 'queryCount',
                    callback: res => {
                        this.count = res;
                    }
                });
            },
            //设备档案
            queryFn1(value) {
                const ops = {
                    curPage: this.currentPage01,
                    pageSize: this.pageSize01
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryDevice',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.list = res.rows;
                        this.totalPage01 = res.total;
                        this.pageNumber01 = res.records;
                    }
                });
            },
            //预警信息
            queryFn2(value) {
                const ops = {
                    curPage: this.currentPage02,
                    pageSize: this.pageSize02
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryAlarm',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.list = res.rows;
                        this.totalPage02 = res.total;
                        this.pageNumber02 = res.records;
                    }
                });
            },
            //故障报修
            queryFn3(value) {
                const ops = {
                    curPage: this.currentPage03,
                    pageSize: this.pageSize03
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryFault',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.list = res.rows;
                        this.totalPage03 = res.total;
                        this.pageNumber03 = res.records;
                    }
                });
            },
            //图片
            queryFn4(value) {
                const ops = {
                    curPage: this.currentPage04,
                    pageSize: this.pageSize04
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryPic',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.picList = res.rows;
                        this.totalPage04 = res.total;
                        this.pageNumber04 = res.records;
                    }
                });
            },
            //其他--巡视巡检
            queryFn5(value) {
                const ops = {
                    curPage: this.currentPage05,
                    pageSize: this.pageSize05
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryInspect',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.list = res.rows;
                        this.totalPage05 = res.total;
                        this.pageNumber05 = res.records;
                    }
                });
            },
            //其他--故障库
            queryFaultlibraryFn(value) {
                const ops = {
                    curPage: this.currentPage06,
                    pageSize: this.pageSize06
                };

                this._currentIndex(ops);
                if(value) {
                    Object.assign(ops, { "queryInfo": value });
                }

                this._getList({
                    ops: ops,
                    api: 'queryFaultlibrary',
                    callback: res => {
                        res.rows.forEach(item => {
                            item.isCheck = false;
                        });
                        this.list = res.rows;
                        this.totalPage06 = res.total;
                        this.pageNumber06 = res.records;
                    }
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .minHeight {
        min-height: 4.88rem;
    }
    .showPic {
        position: relative;
        .border-bg {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        ul {
            padding: 0.82rem 0.48rem 0.2rem 0.48rem;
            background: #4d505f;
            li {
                flex: 1;
                margin: 0 0.22rem;
                img {
                    width: 3.1rem;
                    height: 3.1rem;
                }
                p {
                    font-size: 0.2rem;
                    height: 0.78rem;
                    line-height: 0.32rem;
                    color: #fff;
                    text-align: center;
                    padding-top: 0.1rem;
                }
            }
        }
    }
    .others {
        .title {
            padding-top: 0.03rem;
            background: #414455;
            overflow: hidden;
            padding-left: 1.8rem;
            li {
                width: 2.22rem;
                height: 0.39rem;
                line-height: 0.39rem;
                font-size: 0.2rem;
                float: left;
                text-align: center;
                background: #4a4d5e;
                color: #ffffff;
                border-radius: 8px 8px 0px 0px;
                margin-left: 0.04rem;
                cursor: pointer;
            }
            li.active {
                background: #7c8298;
            }
        }
    }
    .middleSort {
        font-size: 0.24rem;
        width: 16.5rem;
        margin: 0.37rem auto 0.5rem auto;
        dd {
            width: 2.18rem;
            height: 2.2rem;
            background: rgba(0, 0, 0, 0.28);
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            text-align: center;
            float: left;
            margin-right: 1.4rem;
            box-shadow: 2px 10px 30px rgba(0, 0, 0, 0.18);
            cursor: pointer;
            p {
                height: 0.68rem;
                line-height: 0.68rem;
                color: #3c3f46;
            }
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        dd.active {
            p {
                color: #fff;
                span {
                    color: #ffba00;
                }
            }
        }
        dd:last-child {
            margin-right: 0;
        }
    }
    .pagination {
        background: #414455;
        height: 1.08rem;
        text-align: center;
        margin-top: 0.05rem;
        .el-pagination {
            padding-top: 0.3rem;
            color: #fff;
        }
    }
    .pagination5 {
        background: #414455;
        height: 1.05rem;
        text-align: center;
        margin-top: 0.05rem;
        .el-pagination {
            padding-top: 0.35rem;
            color: #fff;
        }
    }
</style>