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
                    <dt>位置信息</dt>
                    <dd class="gray">
                        <span>运营公司</span>
                        <span><input v-model="info.deviceCompanyName" placeholder=""/></span>
                        <span>项目部</span>
                        <span><input v-model="info.deviceProjectDepartmentName" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>线路</span>
                        <span><input readonly v-model="info.deviceInLineName" placeholder=""/></span>
                        <span>车站</span>
                        <span><input readonly v-model="info.deviceInStationName" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>设备系统</span>
                        <span><input readonly v-model="info.deviceSys" placeholder=""/></span>
                        <span>设备名称</span>
                        <span><input readonly v-model="info.deviceName" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>安装合同编号</span>
                        <span><input v-model="info.deviceContractCode" placeholder=""/></span>
                        <span>位置</span>
                        <span><input v-model="info.devicePosition" placeholder=""/></span>
                    </dd>
                    <dt>注册信息</dt>
                    <dd class="gray">
                        <span>注册代码</span>
                        <span><input v-model="info.deviceEleRegRegcode" placeholder=""/></span>
                        <span>所属区县</span>
                        <span><input v-model="info.deviceEleRegCounty" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>内部编号</span>
                        <span><input v-model="info.deviceEleRegCode" placeholder=""/></span>
                        <span>品牌</span>
                        <span><input v-model="info.deviceEleRegBrand" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>生产厂</span>
                        <span><input v-model="info.deviceEleRegFactory" placeholder=""/></span>
                        <span>规模型号</span>
                        <span><input v-model="info.deviceEleRegSpe" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>ISCS编号</span>
                        <span><input v-model="info.deviceEleRegIscscode" placeholder=""/></span>
                        <span>初检日期</span>
                        <span><input v-model="info.deviceEleRegInitiallyDate" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>下次定检日期</span>
                        <span><input v-model="info.deviceEleRegInspectionDate" placeholder=""/></span>
                        <span>检验单位</span>
                        <span><input v-model="info.deviceEleRegInspectionCompany" placeholder=""/></span>
                    </dd>
                    <dt>技术参数</dt>
                    <dd class="gray">
                        <span>梯形</span>
                        <span><input v-model="info.deviceEleTecLadderType" placeholder=""/></span>
                        <span>提升高度</span>
                        <span><input v-model="info.deviceEleTecRise" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>额定速度</span>
                        <span><input v-model="info.deviceEleTecRatedSpeed" placeholder=""/></span>
                        <span>主机功率</span>
                        <span><input v-model="info.deviceEleTecHostPower" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>电机型号</span>
                        <span><input v-model="info.deviceEleTecMotorModel" placeholder=""/></span>
                        <span>单/双驱动机</span>
                        <span><input v-model="info.deviceEleTecDriver" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>减速机型号</span>
                        <span><input v-model="info.deviceEleTecReducerModel" placeholder=""/></span>
                        <span>减速机厂家</span>
                        <span><input v-model="info.deviceEleTecReducerFactory" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>驱动方式</span>
                        <span><input v-model="info.deviceEleTecDrivingMode" placeholder=""/></span>
                        <span>工作制动器型号</span>
                        <span><input v-model="info.deviceEleTecMainArresterModel" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>附加制动器型号</span>
                        <span><input v-model="info.deviceEleTecAdditionalArresterModel" placeholder=""/></span>
                        <span>附加制动器工作方式</span>
                        <span><input v-model="info.deviceEleTecAdditionalArresterMode" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>变频器型号</span>
                        <span><input v-model="info.deviceEleTecInverterModel" placeholder=""/></span>
                        <span>变频器功率</span>
                        <span><input v-model="info.deviceEleTecInverterPower" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>变频器工作形式</span>
                        <span><input v-model="info.deviceEleTecInverterStyle" placeholder=""/></span>
                        <span>扶手带型号</span>
                        <span><input v-model="info.deviceEleTecHandrailModel" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>扶手带长度</span>
                        <span><input v-model="info.deviceEleTecHandrailLength" placeholder=""/></span>
                        <span>梯级型号</span>
                        <span><input v-model="info.deviceEleTecStepModel" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>梯级数（块）</span>
                        <span><input v-model="info.deviceEleTecStepCounts" placeholder=""/></span>
                        <span>驱动链型号</span>
                        <span><input v-model="info.deviceEleTecChainModel" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>桁架分段</span>
                        <span><input v-model="info.deviceEleTecSubsection" placeholder=""/></span>
                        <span>输送能力（人/h）</span>
                        <span><input v-model="info.deviceEleTecConveyingCapacity" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>产权单位</span>
                        <span><input v-model="info.deviceEleTecOwnerCompany" placeholder=""/></span>
                        <span>维保合同编号</span>
                        <span><input v-model="info.deviceEleTecContractCode" placeholder=""/></span>
                    </dd>
                    <dd class="gray">
                        <span>大修年限</span>
                        <span><input v-model="info.deviceEleTecOverhaulDate" placeholder=""/></span>
                        <span>上次大修时间</span>
                        <span><input v-model="info.deviceEleTecOverhaulLastdate" placeholder=""/></span>
                    </dd>
                    <dd class="white">
                        <span>下头部是否有齿轮</span>
                        <span><input v-model="info.deviceEleTecIsGear" placeholder=""/></span>
                        <span>备注</span>
                        <span><input v-model="info.remark" placeholder=""/></span>
                    </dd>
                </dl>
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
                    remark: ''
                },
                resInfo: {}
            };
        },
        computed: {
            ...mapState(['equInfo'])
        },
        created() {
            this.equId = this.$route.query.id.toString();
            this.isShow = this.$route.query.isShow;
            this.getInfoFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_equInfo']),
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
            border-radius: 5px;
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
        .rightShow {
            padding: 0 0.1rem;
            background: #d5d9dc;
            border-radius: 5px;
            padding-bottom: 0.08rem;
        }
    }
</style>