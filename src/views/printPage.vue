<template>
    <div class="printContent">
        <div class="print" v-on:click="goBackFn">返回</div>
        <h3>
            北京市地铁运营有限公司 分公司设备设施故障报修单
        </h3>
        <div class="sheetBox">
            <ul class="flex">
                <li>日期</li>
                <li>{{info.faultOrderDate}}</li>
                <li>故障系统</li>
                <li>{{info.deviceSys}}</li>
            </ul>
            <ul class="flex">
                <li>报修单位</li>
                <li>{{info.reportCompany}}</li>
                <li>故障时间</li>
                <li>{{info.faultTime}}</li>
            </ul>
            <ul class="flex">
                <li>报修时间</li>
                <li>{{info.reportTime}}</li>
                <li>到达时间</li>
                <li>{{info.arriveTime}}</li>
            </ul>
            <ul class="flex">
                <li>报修内容</li>
                <li>{{info.reportContent}}</li>
                <li>报修人</li>
                <li>{{info.reportUserName}}</li>
            </ul>
            <ul class="flex">
                <li>接报单位</li>
                <li>{{info.receiveCompany}}</li>
                <li>接报人</li>
                <li>{{info.receiveUserName}}</li>
            </ul>
            <ul class="flex">
                <li>故障类型</li>
                <li>{{faultTypeArr[info.faultType]}}
                </li>
                <li>处理方式</li>
                <li>{{handleTypeArr[info.handleType]}}
                </li>
            </ul>
            <dl class="textareaShow specialPic">
                <dt>故障现象及车站先期处理内容（车站人员填写）：</dt>
                <dd style="min-height: 0.86rem;">{{info.reportPretreatment}}</dd>
                <img v-if="info.image1 && info.image1.search('.jpg') != -1" v-bind:src="info.image1" />
            </dl>
            <dl class="textareaShow specialPic">
                <dt>故障处理（维修人员填写，如不能现场修复说明情况）：</dt>
                <dd style="min-height: 0.86rem;" v-html="info.reportProcessContent"></dd>
                <img v-if="info.image2 && info.image2.search('.jpg') != -1" v-bind:src="info.image2" />
            </dl>
            <dl class="sign flex">
                <dd>更换零配件情况（维修人员填写）：
                    <input type="radio" v-model="info.isReplacePart" value="1" disabled /> 是 &nbsp;&nbsp;
                    <input type="radio" v-model="info.isReplacePart" value="0" disabled /> 否
                </dd>
            </dl>
            <dl class="sign flex" style="padding: 0.04rem 0;">
                <dd>修复时间：{{info.repairTime}}</dd>
                <dd>维修人员签字： {{info.repairUserName}}</dd>
                <dd class="showPic">修复确认签字：
                    <img v-if="info.confirmUserName && info.confirmUserName.search('.jpg') != -1" v-bind:src="info.confirmUserName" />
                    <span v-else>暂无图片</span>
                </dd>
            </dl>
            <dl class="textareaShow">
                <dt>备注：</dt>
                <dd v-html="info.remark"></dd>
            </dl>
            <dl class="textareaShow">
                <dt>注：</dt>
                <dd style="line-height: 0.26rem;">
                    1、此表格一式三联，第一联（白色）本站保存、第二联（蓝色）维修单位保存、第三联（粉色）运营三分公司机关保存。<br/> 2、遇设备保障涉及两方以上（含两方）处理时，需要本报修单上一同填写各自维修情况。
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                info: {},
                bigPicShow: '',
                handleTypeArr: ['立即完成', '延时处理'],
                faultTypeArr: ['设备本身', '外界因素'],
                id: ''
            };
        },
        created() {
            this.id = this.$route.query.id;
            this.goDetail(this.id);
        },
        computed: {
            ...mapState(['itemObj'])
        },
        methods: {
            ...mapActions(['_getInfo']),
            goDetail(id) {
                this._getInfo({
                    ops: { 'id': id },
                    api: 'faultDetail',
                    callback: res => {
                        this.info = res;
                        setTimeout(() => {
                            this.printFn();
                        }, 0);
                    }
                });
            },
            printFn() {
                window.print();
            },
            goBackFn() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style lang="less" scoped>
    html,
    body {
        background-color: #fff !important;
    }
    @media print {
        .print {
            display: none;
        }
        .printContent {
            width: 100% !important;
            size: A4 landscape;
            // font-size: 16px !important;
        }
        // .sheetBox ul li {
        //     font-size: 16px !important;
        // }
    }
    .print {
        text-align: right;
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        line-height: 0.34rem;
    }
    .specialPic {
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        padding-right: 1.6rem;
        position: relative;
        img {
            position: absolute;
            width: 0.9rem;
            height: 1.2rem;
            top: 0.1rem;
            right: 0.2rem;
            z-index: 1;
        }
    }
    textarea {
        resize: none;
    }
    .printContent {
        width: 56%;
        margin: 0 auto;
        h3 {
            font-size: 0.2rem;
            font-weight: normal;
            text-align: center;
            height: 0.56rem;
            line-height: 0.56rem;
            margin-top: -0.2rem;
        }
        .sheetBox {
            border-left: 1px solid #54596e;
            border-bottom: 1px solid #54596e;
            background: #fff;
            ul {
                li {
                    border-top: 1px solid #54596e;
                    border-right: 1px solid #54596e;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    font-size: 0.18rem;
                }
                li:nth-child(2n-1) {
                    flex: 1;
                    text-align: center;
                }
                li:nth-child(2n) {
                    flex: 2;
                    text-indent: 0.2rem;
                }
            }
            .textareaShow {
                border-top: 1px solid #54596e;
                border-right: 1px solid #54596e;
                dt {
                    text-indent: 1em;
                    line-height: 0.36rem;
                }
                dd {
                    padding: 0 0.2rem 0.2rem 0.2rem;
                    textarea {
                        background: #e4e8f7;
                        width: 100%;
                        line-height: 0.36rem;
                        height: 0.6rem;
                    }
                }
            }
            .sign {
                border-top: 1px solid #54596e;
                border-right: 1px solid #54596e;
                dd {
                    flex: 1;
                    line-height: 0.48rem;
                    text-indent: 1em;
                    input[type='text'] {
                        width: 1.8rem;
                    }
                }
                dd.showPic {
                    img {
                        width: 0.56rem;
                        height: 0.72rem;
                    }
                }
            }
        }
    }
</style>
