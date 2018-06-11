<template>
    <div class="wholeWrap">
        <div class="flex infoWrap">
            <div class="tab">
                <ul class="title">
                    <li class="active">{{info.deviceName}}设备档案</li>
                    <button class="saveBtn" v-on:click="saveInfoFn" v-if="!isShow">保存</button>
                </ul>
                <dl class="leftShow" v-bind:class="isShow?'editCss':''">
                    <div class="mask" v-if="isShow"></div>
                    <dt>基本信息</dt>
                    <dd class="gray">
                        <span>运营公司</span>
                        <span><input v-model="info.deviceCompanyName" placeholder=""/></span>
                        <span>安装地点</span>
                        <span><input v-model="info.devicePosition" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>线路</span>
                        <span><input v-model="info.deviceInLineName" placeholder=""/></span>
                        <span>车站</span>
                        <span><input v-model="info.deviceInStationName" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>设备系统</span>
                        <span><input v-model="info.deviceSys" placeholder=""/></span>
                        <span>设备编号</span>
                        <span><input v-model="info.deviceCode" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>设备名称</span>
                        <span><input v-model="info.deviceName" placeholder=""/></span>
                        <span>规格型号</span>
                        <span><input v-model="info.deviceEleRegSpe" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>外形尺寸</span>
                        <span><input v-model="info.deviceOthSize" placeholder=""/></span>
                        <span>重量</span>
                        <span><input v-model="info.deviceOthWeight" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>制造厂</span>
                        <span><input v-model="info.deviceEleRegFactory" placeholder=""/></span>
                        <span>出厂日期</span>
                        <span><input v-model="info.deviceOthProductionDate" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>出厂编号</span>
                        <span><input v-model="info.deviceOthProductionCode" placeholder=""/></span>
                        <span><!-- 暂时占位 --></span>
                        <span><input readonly style="background: none;"  v-model="info.test" placeholder=""/></span>
                    </dd>
                    <dt>出厂技术资料</dt>
                    <dd class="gray">
                        <span>开始使用日期</span>
                        <span><input v-model="info.deviceOthUseDate" placeholder=""/></span>
                        <span>所属中心</span>
                        <span><input v-model="info.deviceOthCenter" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>额定电压</span>
                        <span><input v-model="info.deviceOthRatedVoltage" placeholder=""/></span>
                        <span>额定频率</span>
                        <span><input v-model="info.deviceEleRegBrand" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>额定工作电流</span>
                        <span><input v-model="info.deviceOthRatedWorkCurrent" placeholder=""/></span>
                        <span>防护等级</span>
                        <span><input v-model="info.deviceOthProtectionLevel" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>额定绝缘电压</span>
                        <span><input v-model="info.deviceOthRatedInsulationVoltage" placeholder=""/></span>
                        <span>标准代号</span>
                        <span><input v-model="info.deviceOthStandardCode" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>技术性能</span>
                        <span><input v-model="info.deviceEleRegInspectionDate" placeholder=""/></span>
                        <span><!--暂时占位--></span>
                        <span><input readonly style="background: none;" v-model="info.test" placeholder=""/></span>
                    </dd>
                </dl>
                <div class="leftListShow">
                    <h3>附属设备及主要附件
                        <button class="add" v-if="!isShow" v-on:click="addFn">增加</button>
                    </h3>
                    <dl class="list">
                        <dt class="listTitle flex">
                            <span>名称</span>
                            <span>型号</span>
                            <span>单位</span>
                            <span>数量</span>
                            <span>制造厂</span>
                            <span>备注</span>
                            <span>操作</span>
                        </dt>
                        <dd class="flex" v-if="info.deviceParts" v-for="(item,index) in info.deviceParts">
                            <!--名称-->
                            <span>{{item.devicePartName}}</span>
                            <!--型号-->
                            <span>{{item.devicePartSpe}}</span>
                            <!--单位-->
                            <span>{{item.devicePartUnit}}</span>
                            <!--数量-->
                            <span>{{item.devicePartCount}}</span>
                            <!--制造厂-->
                            <span>{{item.devicePartFactory}}</span>
                            <!--备注-->
                            <span>{{item.remark}}</span>
                            <span v-if="!isShow">
                                <a href="javascript:;" v-on:click="editFn(item,index)">编辑</a>
                                <a href="javascript:;" v-on:click="deletelFn(index)">删除</a>
                            </span>
                        </dd>
                        <dd v-if="!info.deviceParts" style=" text-align: center; min-height: 0.32rem; line-height: 0.32rem;">暂无数据</dd>
                    </dl>
                </div>
            </div>
            <div class="tab">
                <ul class="title">
                    <li v-on:click="tabShowFn(1)" v-bind:class="tabShow==1?'active':''">运行指标</li>
                    <li v-on:click="tabShowFn(2)" v-bind:class="tabShow==2?'active':''">巡视巡检</li>
                    <li v-on:click="tabShowFn(3)" v-bind:class="tabShow==3?'active':''">故障维修</li>
                </ul>
                <div class="rightShow">
                    <!-- 运行指标 -->
                    <v-operation-index v-if="tabShow==1"></v-operation-index>
                    <!-- 巡视巡检 -->
                    <v-patrol-inspection v-if="tabShow==2"></v-patrol-inspection>
                    <!-- 故障维修 -->
                    <v-trouble-shoot v-if="tabShow==3"></v-trouble-shoot>
                </div>
            </div>
        </div>
        <v-goback></v-goback>
        <!--增加的弹出框-->
        <v-pop-box v-on:save="saveFn" v-on:receive="cancleFn" v-if="isShowPop" v-bind:popData="popData1"></v-pop-box>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    export default {
        data() {
            return {
                equId: '', //设备id
                isShow: false,//true 是展示页面，非true是编辑页面
                tabShow: 1,
                isShowPop: false, //是否显示增加的弹出框
                popData1: { //弹出框配置的内容
                    'titleTotal': '新增附件',
                    'options': [{
                        'status': 1,
                        'title': '名称',
                        'placeholder': '请输入内容',
                        'val': 'devicePartName'
                    }, {
                        'status': 1,
                        'title': '型号',
                        'placeholder': '请输入内容',
                        'val': 'devicePartSpe'
                    }, {
                        'status': 1,
                        'title': '单位',
                        'placeholder': '请输入内容',
                        'val': 'devicePartUnit'
                    }, {
                        'status': 1,
                        'title': '数量',
                        'placeholder': '请输入内容',
                        'val': 'devicePartCount'
                    }, {
                        'status': 1,
                        'title': '制造厂',
                        'placeholder': '请输入内容',
                        'val': 'devicePartFactory'
                    }, {
                        'status': 1,
                        'title': '备注',
                        'placeholder': '请输入内容',
                        'val': 'remark'
                    }]
                },
                info: {
                    deviceCompanyName: '',
                    deviceProjectDepartmentName: '',
                    deviceInLineName: '',
                    deviceInStationName: '',
                    deviceSys: '',
                    deviceName: '',
                    deviceContractCode: '',
                    devicePosition: '',
                    deviceEleRegRegcode: '',
                    deviceEleRegCounty: '',
                    deviceEleRegCode: '',
                    deviceEleRegBrand: '',
                    deviceEleRegFactory: '',
                    deviceEleRegSpe: '',
                    deviceEleRegIscscode: '',
                    deviceEleRegInitiallyDate: '',
                    deviceEleRegInspectionDate: '',
                    deviceEleRegInspectionCompany: '',
                    deviceEleTecLadderType: '',
                    deviceEleTecRise: '',
                    deviceEleTecRatedSpeed: '',
                    deviceEleTecHostPower: '',
                    deviceEleTecMotorModel: '',
                    deviceEleTecDriver: '',
                    deviceEleTecReducerModel: '',
                    deviceEleTecReducerFactory: '',
                    deviceEleTecDrivingMode: '',
                    deviceEleTecMainArresterModel: '',
                    deviceEleTecAdditionalArresterModel: '',
                    deviceEleTecAdditionalArresterMode: '',
                    deviceEleTecInverterModel: '',
                    deviceEleTecInverterPower: '',
                    deviceEleTecInverterStyle: '',
                    deviceEleTecHandrailModel: '',
                    deviceEleTecHandrailLength: '',
                    deviceEleTecStepModel: '',
                    deviceEleTecStepCounts: '',
                    deviceEleTecChainModel: '',
                    deviceEleTecSubsection: '',
                    deviceEleTecConveyingCapacity: '',
                    deviceEleTecOwnerCompany: '',
                    deviceEleTecContractCode: '',
                    deviceEleTecOverhaulDate: '',
                    deviceEleTecOverhaulLastdate: '',
                    deviceEleTecIsGear: '',
                    remark: '',
                    deviceParts: []
                },
                resInfo: {
                    deviceParts: []
                },
                indexMark: -1
            };
        },
        computed: {
            ...mapState(['equInfo'])
        },
        created() {
            this.equId = this.$route.query.id;
            this.isShow = this.$route.query.isShow;
            this.getInfoFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_equInfo', '_itemObj']),
            //设备档案列表
            getInfoFn() {
                this.resInfo = JSON.parse(JSON.stringify(this.equInfo));
                this.info = this.resInfo;
            },
            currentList(index) {
                this.indexed = index;
            },
            tabShowFn(index) {
                this.tabShow = index;
            },
            saveInfoFn() {
                this._getInfo({
                    ops: this.resInfo,
                    api: 'deviceUpdate',
                    callback: () => {
                        this._equInfo(this.resInfo);
                        this.$message.success('保存成功');
                    }
                });
            },
            //关闭弹出框并保存数据
            saveFn(req) {
                if(this.indexMark != -1) {
                    this.resInfo.deviceParts.splice(this.indexMark, 1, req);
                    this.$message.success('编辑成功,请保存！');
                } else {
                    this.resInfo.deviceParts.push(req);
                    this.$message.success('新增成功,请保存！');
                }
                this.isShowPop = false;
            },
            //关闭弹出框
            cancleFn(value) {
                this.isShowPop = value;
            },
            //删除列表
            deletelFn(index) {
                this.resInfo.deviceParts.splice(index, 1);
                this.$message.success('删除成功,请保存！');
            },
            //新增
            addFn() {
                this.indexMark = -1;
                this._itemObj('');
                this.isShowPop = true;
            },
            editFn(item, index) {
                this.indexMark = index;
                this._itemObj(item);
                this.isShowPop = true;
            }
        }
    };
</script>

<style scoped lang="less">
    .editCss {
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }
        input {
            border: none;
            background: none;
        }
    }
    .wholeWrap {
        padding: 0.14rem 0;
    }
    .infoWrap {
        width: 98%;
        margin: 0 auto;
        align-items: flex-start;
        div.tab:nth-child(1) {
            margin-right: 0.14rem;
        }
    }
    .tab {
        flex: 1;
        .title {
            overflow: hidden;
            padding-left: 0.13rem;
            position: relative;
            li {
                width: 2rem;
                height: 0.39rem;
                line-height: 0.39rem;
                font-size: 0.2rem;
                float: left;
                text-align: center;
                background: #4a4d5e;
                color: #ffffff;
                border-radius: 8px 8px 0px 0px;
                margin-left: 0.05rem;
                cursor: pointer;
            }
            li.active {
                background: #d7d9db;
                color: #1f1e1e;
            }
            .saveBtn {
                float: right;
                width: 0.8rem;
                height: 0.32rem;
                line-height: 0.32rem;
                border-radius: 5px;
            }
        }
        .leftShow {
            padding: 0 0.1rem;
            background: #d5d9dc;
            border-radius: 5px 5px 0 0;
            padding-bottom: 0.08rem;
            position: relative;
            dt {
                background: #bcc2da;
                height: 0.32rem;
                line-height: 0.32rem;
                text-indent: 1em;
                font-size: 0.18rem;
                color: #2f4554;
                font-weight: normal;
            }
            dd {
                display: flex;
                align-items: center;
                flex-direction: row;
                align-items: flex-start;
                span {
                    height: 0.32rem;
                    line-height: 0.32rem;
                    border-right: 1px solid #b0b4c1;
                    text-indent: 1em;
                    font-size: 0.16rem;
                    color: #2f4554;
                }
                span:nth-child(2n-1) {
                    flex: 1.2;
                }
                span:nth-child(2n) {
                    flex: 1;
                }
                span:last-child {
                    border-right: none;
                }
            }
            dd.gray {
                background: #d7dae9;
            }
            dd.white {
                background: #e4e8f7;
            }
        }
        .leftListShow {
            border-radius: 0 0 5px 5px;
            background: #d5d9dc;
            min-height: 3.8rem;
            overflow: hidden;
            h3 {
                font-size: 0.18rem;
                font-weight: normal;
                line-height: 0.32rem;
                background: #bcc2da;
                color: #2f4554;
                text-align: center;
                position: relative;
                .add {
                    position: absolute;
                    width: 0.5rem;
                    height: 0.24rem;
                    top: 0.04rem;
                    right: 0.2rem;
                    line-height: 0.24rem;
                    border-radius: 3px;
                    background: #7c8298;
                    color: #fff;
                    font-size: 0.16rem;
                }
            }
            dt,
            dd {
                span {
                    flex: 1;
                    text-align: center;
                    height: 0.32rem;
                    line-height: 0.32rem;
                }
            }
            dt {
                font-weight: bold;
            }
            dd:nth-child(2n-1) {
                background: #d7dae9;
            }
            dd:nth-child(2n) {
                background: #e4e8f7;
            }
            dd {
                a {
                    min-width: 0.28rem;
                    line-height: 0.22rem;
                    display: inline-block;
                    background: #7c8298;
                    color: #fff;
                    font-size: 0.14rem;
                    padding: 0 0.1rem;
                }
            }
        }
        .rightShow {
            padding: 0 0.1rem;
            background: #d5d9dc;
            border-radius: 5px;
            padding-bottom: 0.08rem;
        }
    }
    .listTitle {
        li {
            flex: 1;
            text-align: center;
            font-weight: bold;
            height: 0.32rem;
            line-height: 0.32rem;
        }
    }
</style>