<template>
    <div class="search clearfix">
        <div class="searchWidth left">
            <ul v-for="(item,index) in searchData.options" :key="index">
                <li v-if="item.status == 1">
                    <span>{{item.title}}：</span>
                    <el-input v-model="req[item.val]" size="mini" v-bind:placeholder="item.placeholder"></el-input>
                </li>
                <li v-if="item.status == 2">
                    <span>{{item.title}}：</span>
                    <!-- 判断是不是车站的列表，如果是车站列表，数据直接在子组件请求 -->
                    <el-select v-if="item.val == 'station' || item.val == 'deviceInStationId' || item.val == 'stationId'" v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                        <el-option key="" label="全部" value="">
                        </el-option>
                        <el-option v-for="itemSel in staionsList" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                    <!-- 判断是不是设备系统的列表，如果是设备系统列表，数据直接在子组件请求 -->
                    <el-select v-else-if="item.val == 'equSys' || item.val=='deviceTypeCode'" v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                        <el-option v-for="itemSel in sysList" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                    <!-- 判断是不是线路列表，如果是线路列表，数据直接在子组件请求 -->
                    <el-select v-else-if="item.val == 'line' || item.val == 'deviceInLineId' || item.val == 'lineId'" v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option v-for="itemSel in lineList" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                    <el-select v-else v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini">
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                </li>
                <li v-if="item.status == 3">
                    <span>{{item.title}}：</span>
                    <el-date-picker v-model="req[item.val1]" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                    <i>至</i>
                    <el-date-picker v-model="req[item.val2]" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                </li>
                <li v-if="item.status == 4">
                    <span>{{item.title}}：</span>
                    <el-date-picker v-model="req[item.val1]" type="month" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                    <i>至</i>
                    <el-date-picker v-model="req[item.val2]" type="month" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                </li>
                <li v-if="item.status == 5">
                    <span>{{item.title}}：</span>
                    <el-date-picker v-model="req[item.val1]" format="yyyy-MM" type="month" value-format="yyyy-MM" v-bind:placeholder="item.placeholder" size="mini"></el-date-picker>
                </li>
                <li v-if="item.status == 6">
                    <span>{{item.title}}：</span>
                    <el-select filterable remote :remote-method="remoteMethod" :loading="loading" v-model="req[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                        <el-option key="" label="全部" value=""></el-option>

                        <el-option v-for="itemSel in optionsShow" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
        </div>
        <a class="exportBtn" href="javascript:;" v-on:click="filterBtn">查询</a>
        <div class="exportBtn" v-for="(item,index) in searchData.btnShow">
            <el-upload v-if="item.fn == 'importFn'" class="upload-demo" action="http://bhxz.net:48092/bjdt/webapi/import/excel" :show-file-list="false">
                <a href="javascript:;">{{item.title}}</a>
            </el-upload>
            <el-upload v-else-if="item.fn == 'importFn2'" class="upload-demo" action="http://bhxz.net:48092/bjdt/webapi/import/excel2" :show-file-list="false">
                <a href="javascript:;">{{item.title}}</a>
            </el-upload>
            <a v-else href="javascript:;" v-on:click="btnFn(item.fn)">{{item.title}}</a>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                req: {

                },
                staionsList: [],
                sysList: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '0',
                    label: '站台门'
                }, {
                    value: '7',
                    label: '自动扶梯'
                }, {
                    value: '8',
                    label: '风机'
                }],
                lineList: [],
                loading: false,
                getEquNameList: [],
                optionsShow: [],
                importValue: ''
            };
        },
        computed: {
            ...mapState(['equNameList'])
        },
        watch: {
            equNameList() {
                this.getEquNameList = JSON.parse(JSON.stringify(this.equNameList));
                this.optionsShow = JSON.parse(JSON.stringify(this.equNameList));
            }
        },
        props: ['searchData'],
        created() {
            this.optionsShow = JSON.parse(JSON.stringify(this.equNameList));
            //设置默认值
            if(this.searchData.defaultReq) {
                this.req = this.searchData.defaultReq;
            }
            //获取车站列表
            this.getStationsFn();
            //获取线路列表
            this.getLinesFn();
        },
        methods: {
            ...mapActions(['_getList']),
            btnFn(val) {
                this.$emit('receiveBtnFn', val);
            },
            //查询
            filterBtn() {
                this.$emit('filter', this.req);
            },
            //获取车站列表
            getStationsFn() {
                this._getList({
                    ops: {},
                    api: 'getStation',
                    callback: res => {
                        this.staionsList = res;
                    }
                });
            },
            //获取线路列表
            getLinesFn() {
                this._getList({
                    ops: {},
                    api: 'getLines',
                    callback: res => {
                        this.lineList = res;
                    }
                });
            },
            changeOps() {
                this.$emit('getEquName', this.req);
            },
            remoteMethod(query) {
                if(query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.optionsShow = this.getEquNameList.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.optionsShow = [];
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .el-input--mini {
        width: 1.2rem;
        background: none;
    }
    .el-select--mini {
        width: 1.2rem;
        background: none;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 2rem;
        vertical-align: top;
    }
    .searchWidth {
        overflow: hidden;
        padding-left: 0.33rem;
        padding-right: 0.2rem;
        border-radius: 10px;
        background: url('~assets/other/title_bg.png') repeat;
        position: relative;
        ul {
            float: left;
            li {
                overflow: hidden;
                color: #fff;
                padding: 0.015rem 0;
                span {
                    float: left;
                    font-size: 0.2rem;
                    height: 0.46rem;
                    line-height: 0.46rem;
                }
                i {
                    font-size: 0.2rem;
                    height: 0.46rem;
                    line-height: 0.46rem;
                    font-style: normal;
                }
            }
        }
    }
    .exportBtn {
        float: left;
        margin-left: 0.1rem;
        width: 0.8rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        background: #54596e;
        font-size: 0.2rem;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 0.04rem;
        box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
        text-decoration: none;
        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
        }
    }
</style>
