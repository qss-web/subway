<template>
    <div>
        <div class="mask"></div>
        <div class="popContent">
            <h3>{{popData.titleTotal}}</h3>
            <div class="content">
                <div class="subContent clearfix">
                    <ul v-for="(item,index) in popData.options" :key="index">
                        <li v-if="item.status == 1" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-input v-model="popReq[item.val]" size="mini" v-bind:placeholder="item.placeholder"></el-input>
                        </li>
                        <li v-if="item.status == 2">
                            <span>{{item.title}}：</span>
                            <!-- 判断是不是车站的列表，如果是车站列表，数据直接在子组件请求 -->
                            <el-select class="popBox" v-if="item.val == 'stationId' || item.val == 'deviceInStationId' || item.val == 'stationId'" v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                                <!-- <el-option key="" label="全部" value=""></el-option> -->
                                <el-option v-for="itemSel in setStations" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                                </el-option>
                            </el-select>
                            <!-- 判断是不是线路列表，如果是线路列表，数据直接在子组件请求 -->
                            <el-select class="popBox" v-else-if="item.val == 'lineId' || item.val == 'deviceInLineId'" v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                                <!-- <el-option key="" label="全部" value=""></el-option> -->
                                <el-option v-for="itemSel in setLines" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                                </el-option>
                            </el-select>
                            <!-- 判断是不是设备系统的列表，如果是设备系统列表，数据直接在子组件请求 -->
                            <el-select class="popBox" v-else-if="item.val == 'equSys' || item.val=='deviceTypeCode'" v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                                <!-- <el-option key="" label="全部" value=""></el-option> -->
                                <el-option v-for="itemSel in setDeviceType" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                                </el-option>
                            </el-select>

                            <el-select class="popBox" v-else v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                                <el-option v-for="itemSel in item.list" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li v-if="item.status == 3" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-date-picker v-model="popReq[item.val1]" type="date" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                            <i>至</i>
                            <el-date-picker v-model="popReq[item.val2]" type="date" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                        </li>
                        <li v-if="item.status == 4" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-date-picker v-model="popReq[item.val1]" type="month" v-bind:placeholder="item.placeholderS" size="mini"></el-date-picker>
                            <i>至</i>
                            <el-date-picker v-model="popReq[item.val2]" type="month" v-bind:placeholder="item.placeholderE" size="mini"></el-date-picker>
                        </li>
                        <li v-if="item.status == 5" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-date-picker v-model="popReq[item.val]" value-format="yyyy-MM-dd HH:mm:ss" type="date" v-bind:placeholder="item.placeholder" size="mini"></el-date-picker>
                        </li>
                        <li v-if="item.status == 6" class="popBox">
                            <span>{{item.title}}：</span>
                            <el-select filterable remote :remote-method="remoteMethod" :loading="loading" v-model="popReq[item.val]" v-bind:placeholder="item.placeholder" size="mini" v-on:change="changeOps">
                                <el-option key="" label="全部" value=""></el-option>
                                <el-option v-for="itemSel in optionsShow" :key="itemSel.value" :label="itemSel.label" :value="itemSel.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li v-if="item.status == 7" class="popBox">
                            <span>{{item.title}}：</span>
                            <div style="line-height: 0.42rem">
                                <el-radio v-model="popReq[item.val]" label="1">是</el-radio>
                                <el-radio v-model="popReq[item.val]" label="0">否</el-radio>
                            </div>
                        </li>
                    </ul>
                </div>
                <dl class="setPower" v-if="popData.isSetPower">
                    <dt>权限设置：</dt>
                    <dd>
                        <span>设备信息：</span>
                        <div class="wrap">
                            <el-checkbox-group v-model="checkedList1">
                                <el-checkbox v-for="(item,index) in showList[0]" :label="item.name" :key="index" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </dd>
                    <dd>
                        <span>故障库：</span>
                        <div class="wrap">
                            <el-checkbox-group v-model="checkedList2">
                                <el-checkbox v-for="(item,index) in showList[1]" :label="item.name" :key="index" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </dd>
                    <dd>
                        <span>今日巡检：</span>
                        <div class="wrap">
                            <el-checkbox-group v-model="checkedList3">
                                <el-checkbox v-for="(item,index) in showList[2]" :label="item.name" :key="index" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </dd>
                    <dd>
                        <span>故障待办：</span>
                        <div class="wrap">
                            <el-checkbox-group v-model="checkedList4">
                                <el-checkbox v-for="(item,index) in showList[3]" :label="item.name" :key="index" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </dd>
                    <dd>
                        <span>主按钮：</span>
                        <div class="wrap">
                            <el-checkbox-group v-model="checkedList5">
                                <el-checkbox v-for="(item,index) in showList[4]" :label="item.name" :key="index" @change="handleCheckedChange(item)">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </dd>
                </dl>
                <div class="btn">
                    <a href="javascript:;" v-on:click="onSubmit">确定</a>
                    <a href="javascript:;" v-on:click="onCancle">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {

        data() {
            return {
                //设备信息 / 故障库  / 今日巡检比例   /故障待办
                showList: [
                    [{ 'name': '查询', 'flag': false, 'code': '1-0' }, { 'name': '导出', 'flag': false, 'code': '1-1' }, { 'name': '增加', 'flag': false, 'code': '1-2' }, { 'name': '删除', 'flag': false, 'code': '1-3' }, { 'name': '编辑', 'flag': false, 'code': '1-4' }, { 'name': '导入', 'flag': false, 'code': '1-5' }],
                    [{ 'name': '查询', 'flag': false, 'code': '2-0' }, { 'name': '导出', 'flag': false, 'code': '2-1' }, { 'name': '增加', 'flag': false, 'code': '2-2' }, { 'name': '删除', 'flag': false, 'code': '2-3' }, { 'name': '编辑', 'flag': false, 'code': '2-4' }, { 'name': '导入', 'flag': false, 'code': '2-5' }],
                    [{ 'name': '查询', 'flag': false, 'code': '3-0' }, { 'name': '导出', 'flag': false, 'code': '3-1' }, { 'name': '删除', 'flag': false, 'code': '3-2' }],
                    [{ 'name': '查询', 'flag': false, 'code': '4-0' }, { 'name': '导出', 'flag': false, 'code': '4-1' }, { 'name': '删除', 'flag': false, 'code': '4-2' }, { 'name': '编辑', 'flag': false, 'code': '4-3' }],
                    [{ 'name': '首页', 'flag': false, 'code': '5-0' }, { 'name': '我的', 'flag': false, 'code': '5-1' }, { 'name': '搜索', 'flag': false, 'code': '5-2' }, { 'name': '设置', 'flag': false, 'code': '5-3' }, { 'name': '监测', 'flag': false, 'code': '5-4' }]
                ],
                checkedList1: [],
                checkedList2: [],
                checkedList3: [],
                checkedList4: [],
                checkedList5: [],
                middleArr: [],
                popReq: {},
                // staionsList: [],
                // lineList: [],
                // sysList: [{
                //     value: '',
                //     label: '全部'
                // }, {
                //     value: '0',
                //     label: '站台门'
                // }, {
                //     value: '7',
                //     label: '自动扶梯'
                // }, {
                //     value: '8',
                //     label: '风机'
                // }],
                loading: false,
                getEquNameList: [],
                optionsShow: []
            };
        },
        props: ['popData'],
        computed: {
            ...mapState(['itemObj', 'equNameList', 'setStations', 'setLines', 'setDeviceType'])
        },
        watch: {
            equNameList() {
                this.getEquNameList = JSON.parse(JSON.stringify(this.equNameList));
                this.optionsShow = JSON.parse(JSON.stringify(this.equNameList));
            }
        },
        created() {
            if(this.itemObj) {
                this.popReq = JSON.parse(JSON.stringify(this.itemObj));
                if(this.popReq.messageFlag || this.popReq.messageFlag == 0) {
                    this.popReq.messageFlag = this.popReq.messageFlag.toString();
                }
            }
            //获取车站列表
            // this.getStationsFn();
            //获取线路列表
            // this.getLinesFn();
            if(this.popData.isSetPower) {
                if(this.itemObj) {
                    this.showList = JSON.parse(JSON.stringify(eval(this.itemObj.roleCode)));
                    this.showList[0].forEach(item => {
                        if(item.flag) {
                            this.checkedList1.push(item.name);
                        }
                    });
                    this.showList[1].forEach(item => {
                        if(item.flag) {
                            this.checkedList2.push(item.name);
                        }
                    });
                    this.showList[2].forEach(item => {
                        if(item.flag) {
                            this.checkedList3.push(item.name);
                        }
                    });
                    this.showList[3].forEach(item => {
                        if(item.flag) {
                            this.checkedList4.push(item.name);
                        }
                    });
                    this.showList[4].forEach(item => {
                        if(item.flag) {
                            this.checkedList5.push(item.name);
                        }
                    });
                } else {
                    this.showList = JSON.parse(JSON.stringify(this.showList));
                }
            }
        },
        methods: {
            ...mapActions(['_getList']),
            onSubmit() {
                if(this.popData.isSetPower) {
                    this.middleArr.push(this.showList[0]);
                    this.middleArr.push(this.showList[1]);
                    this.middleArr.push(this.showList[2]);
                    this.middleArr.push(this.showList[3]);
                    this.middleArr.push(this.showList[4]);
                    this.popReq[this.popData.isSetPower] = this.middleArr;
                }
                this.$emit('save', this.popReq);
            },
            onCancle() {
                this.$emit('receive', false);
            },
            changeOps() {
                this.$emit('getEquName', this.popReq);
            },
            // //获取车站列表
            // getStationsFn() {
            //     this._getList({
            //         ops: {},
            //         api: 'getStation',
            //         callback: res => {
            //             this.staionsList = res;
            //         }
            //     });
            // },
            // //获取线路列表
            // getLinesFn() {
            //     this._getList({
            //         ops: {},
            //         api: 'getLines',
            //         callback: res => {
            //             this.lineList = res;
            //         }
            //     });
            // },
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
            },
            handleCheckedChange(items) {
                this.showList[0].forEach(item => {
                    if(items.code == item.code) {
                        item.flag = !items.flag;
                    }
                });
                this.showList[1].forEach(item => {
                    if(items.code == item.code) {
                        item.flag = !items.flag;
                    }
                });
                this.showList[2].forEach(item => {
                    if(items.code == item.code) {
                        item.flag = !items.flag;
                    }
                });
                this.showList[3].forEach(item => {
                    if(items.code == item.code) {
                        item.flag = !items.flag;
                    }
                });
                this.showList[4].forEach(item => {
                    if(items.code == item.code) {
                        item.flag = !items.flag;
                    }
                });
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
        width: 8.6rem;
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
            padding: 0.3rem 0;
            background: #cfd6f3;
            .subContent {
                overflow: hidden;
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
                            width: 1.4rem;
                        }
                    }
                }
            }
            .btn {
                text-align: center;
                margin-top: 0.1rem;
                a {
                    display: inline-block;
                    width: 1.2rem;
                    height: 0.38rem;
                    line-height: 0.38rem;
                    background: #2f4553;
                    color: #fff;
                    text-align: center;
                    border-radius: 5px;
                    box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.3);
                }
                a:hover {
                    text-decoration: none;
                }
                a:nth-child(1) {
                    margin-right: 0.8rem;
                }
            }
        }
    }
    .setPower {
        padding: 0 0.26rem;
        dt {
            margin-bottom: 0.2rem;
            font-size: 0.2rem;
            color: #2f4553;
        }
        dd {
            margin-bottom: 0.2rem;
            border-bottom: 1px solid #ccc;
            overflow: hidden;
            span {
                float: left;
                color: #606266;
                padding: 0.1rem 0rem;
                min-width: 0.8rem;
            }
            div.wrap {
                float: left;
                width: 80%;
            }
        }
        dd:last-child {
            border-bottom: none;
        }
    }
    // // 分割线
    .el-checkbox {
        min-width: 0.5rem !important;
    }
    .el-input--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 0em;
    }
    .el-select--mini {
        width: 2.4rem;
        background: #fff;
        border-radius: 5px;
        text-indent: 0em;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 2.4rem;
        vertical-align: top;
        border-radius: 5px;
    }
</style>
