<template>
    <div class="box">
        <div class="layer" v-on:click="closeFn"></div>
        <div class="sheet">
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
                    <li>
                        <select v-model="info.faultType">
                            <option value="0">设备本身</option>
                            <option value="1">外界因素</option>
                        </select>
                    </li>
                    <li>处理方式</li>
                    <li>
                        <select v-model="info.handleType">
                            <option value="0">立即完成</option>
                            <option value="1">延时处理</option>
                        </select>
                    </li>
                </ul>
                <dl class="textareaShow specialPic">
                    <dt>故障现象及车站先期处理内容（车站人员填写）：</dt>
                    <dd>
                        <textarea v-model="info.reportPretreatment" placeholder="请输入内容"></textarea>
                    </dd>
                    <img v-if="info.image1 && info.image1.search('.jpg') != -1" v-bind:src="info.image1" />
                </dl>
                <dl class="textareaShow specialPic">
                    <dt>故障处理（维修人员填写，如不能现场修复说明情况）：</dt>
                    <dd>
                        <textarea v-model="info.reportProcessContent" placeholder="请输入内容"></textarea>
                    </dd>
                    <img v-if="info.image2 && info.image2.search('.jpg') != -1" v-bind:src="info.image2" />
                </dl>
                <dl class="sign flex">
                    <dd>更换零配件情况（维修人员填写）：
                        <input type="radio" v-model="info.isReplacePart" value="1" /> 是 &nbsp;&nbsp;
                        <input type="radio" v-model="info.isReplacePart" value="0" /> 否
                    </dd>
                </dl>
                <dl class="sign flex" style="padding: 0.04rem 0;">
                    <dd>修复时间：<input type="text" value="" v-model="info.repairTime" /></dd>
                    <dd>维修人员签字：<input type="text" value="" v-model="info.repairUserName" /></dd>
                    <dd class="showPic">修复确认签字：
                        <img v-if="info.confirmUserName && info.confirmUserName.search('.jpg') != -1" v-bind:src="info.confirmUserName" />
                        <span v-else>暂无图片</span>
                    </dd>
                </dl>
                <dl class="textareaShow">
                    <dt>备注：</dt>
                    <dd>
                        <textarea v-model="info.remark" placeholder="请输入备注内容"></textarea>
                    </dd>
                </dl>
                <dl class="textareaShow">
                    <dt>注：</dt>
                    <dd style="line-height: 0.26rem;">
                        1、此表格一式三联，第一联（白色）本站保存、第二联（蓝色）维修单位保存、第三联（粉色）运营三分公司机关保存。<br/> 2、遇设备保障涉及两方以上（含两方）处理时，需要本报修单上一同填写各自维修情况。
                    </dd>
                </dl>
            </div>
            <div class="btnPrint">
                <button v-on:click="onSubmit">保存</button>
                <button>打印</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                info: {},
                bigPicShow: ''
            };
        },
        created() {
            debugger;
            this.goDetail();
        },
        computed: {
            ...mapState(['itemObj'])
        },
        methods: {
            ...mapActions(['_getInfo']),
            closeFn() {
                this.$emit('isPop', false);
            },
            onSubmit() {
                this._getInfo({
                    ops: this.info,
                    api: 'faultUpdate',
                    callback: () => {
                        this.$message.success('保存成功！');
                        this.$emit('isPop', false);
                    }
                });
            },
            goDetail() {
                this._getInfo({
                    ops: { 'id': this.itemObj.id.toString() },
                    api: 'faultDetail',
                    callback: res => {
                        this.info = res;
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
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
    .layer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 2;
    }
    .sheet {
        width: 12rem;
        height: 10rem;
        position: fixed;
        background: #e4e8f7;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 3;
        color: #363232;
        overflow-y: auto;
        h3 {
            font-size: 0.2rem;
            font-weight: normal;
            text-align: center;
            height: 0.56rem;
            line-height: 0.56rem;
        }
        .sheetBox {
            width: 86%;
            margin: 0 auto;
            border-left: 1px solid #54596e;
            border-bottom: 1px solid #54596e;
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
        .btnPrint {
            text-align: center;
            margin: 0.2rem 0;
            button {
                width: 0.8rem;
                height: 0.38rem;
                line-height: 0.38rem;
                border-radius: 4px;
                background: #3e414f;
                color: #fff;
            }
        }
    }
</style>
