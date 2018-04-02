<template>
    <div class="wholeWrap">
        <div class="flex infoWrap">
            <div class="tab">
                <ul class="title">
                    <li class="active">设备档案</li>
                </ul>
                <dl class="leftShow">
                    <dt>位置信息</dt>
                    <dd class="gray">
                        <span>运营公司</span>
                        <span></span>
                        <span>项目部</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>线路</span>
                        <span>6号线</span>
                        <span>车站</span>
                        <span>田站村</span>
                    </dd>
                    <dd class="gray">
                        <span>设备系统</span>
                        <span>电梯系统</span>
                        <span>设备名称</span>
                        <span>自动扶梯</span>
                    </dd>
                    <dd class="white">
                        <span>安装合同编号</span>
                        <span></span>
                        <span>位置</span>
                        <span>A出口</span>
                    </dd>
                    <dt>注册信息</dt>
                    <dd class="gray">
                        <span>注册代码</span>
                        <span></span>
                        <span>所属区县</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>内部编号</span>
                        <span></span>
                        <span>品牌</span>
                        <span>蒂森克虏伯</span>
                    </dd>
                    <dd class="gray">
                        <span>生产厂</span>
                        <span></span>
                        <span>规模型号</span>
                        <span>FT845</span>
                    </dd>
                    <dd class="white">
                        <span>ISCS编号</span>
                        <span></span>
                        <span>初检日期</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>下次定检日期</span>
                        <span></span>
                        <span>检验单位</span>
                        <span></span>
                    </dd>
                    <dt>技术参数</dt>
                    <dd class="gray">
                        <span>梯形</span>
                        <span></span>
                        <span>提升高度</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>额定速度</span>
                        <span></span>
                        <span>主机功率</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>电机型号</span>
                        <span></span>
                        <span>单/双驱动机</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>减速机型号</span>
                        <span></span>
                        <span>减速机厂家</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>驱动方式</span>
                        <span></span>
                        <span>工作制动器型号</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>附加制动器型号</span>
                        <span></span>
                        <span>附加制动器工作方式</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>变频器型号</span>
                        <span></span>
                        <span>变频器功率</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>变频器工作形式</span>
                        <span></span>
                        <span>扶手带型号</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>扶手带长度</span>
                        <span></span>
                        <span>梯级型号</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>梯级数（块）</span>
                        <span></span>
                        <span>驱动链型号</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>桁架分段</span>
                        <span></span>
                        <span>输送能力（人/h）</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>产权单位</span>
                        <span></span>
                        <span>维保合同编号</span>
                        <span></span>
                    </dd>
                    <dd class="gray">
                        <span>大修年限</span>
                        <span></span>
                        <span>上次大修时间</span>
                        <span></span>
                    </dd>
                    <dd class="white">
                        <span>下头部是否有齿轮</span>
                        <span></span>
                        <span>备注</span>
                        <span></span>
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
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                tabShow: 1
            };
        },
        props: ['list', 'label', 'checked'],
        created() {
            this.getInfoListFn();
            this.getInfoDetailFn();
        },
        methods: {
            ...mapActions(['_getList']),
            //设备档案列表
            getInfoListFn() {
                this._getList({
                    ops: {},
                    api: 'infoList',
                    callback: () => {

                    }
                });
            },
            //设备档案详情
            getInfoDetailFn() {
                this._getList({
                    ops: {},
                    api: 'infoDetail',
                    callback: () => {

                    }
                });
            },
            currentList(index) {
                this.indexed = index;
            },
            tabShowFn(index) {
                this.tabShow = index;
            }
        }
    };
</script>

<style scoped lang="less">
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
        }
        .leftShow {
            padding: 0 0.1rem;
            background: #d5d9dc;
            border-radius: 5px;
            padding-bottom: 0.08rem;
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