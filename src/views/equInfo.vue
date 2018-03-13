<template>
    <div>
        <div class="flex infoWrap">
            <div class="tab">
                <ul class="title">
                    <li class="active">实时报警信息</li>
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
    export default {
        data() {
            return {
                tabShow: 1,
                currentPage: 1, //当前页数
                pageSize: 9, //每页显示数量
                searchData: {
                    'options': [{
                        'status': 2,
                        'title': '线路',
                        'placeholder': '请选择内容',
                        'val': 'lines',
                        'list': [{
                            value: '1',
                            label: '6号线'
                        }]
                    }, {
                        'status': 2,
                        'title': '车站',
                        'placeholder': '请选择内容',
                        'val': 'stations',
                        'list': [{
                            value: '1',
                            label: '金安桥站'
                        }, {
                            value: '2',
                            label: '苹果园站'
                        }, {
                            value: '3',
                            label: '苹果园南路站'
                        }, {
                            value: '4',
                            label: '西黄村站'
                        }, {
                            value: '5',
                            label: '唐宫庄站'
                        }, {
                            value: '6',
                            label: '田村站'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备系统',
                        'placeholder': '请选择内容',
                        'val': 'equSys',
                        'list': [{
                            value: '1',
                            label: '设备系统一'
                        }, {
                            value: '2',
                            label: '设备系统二'
                        }]
                    }, {
                        'status': 2,
                        'title': '设备类型',
                        'placeholder': '请选择内容',
                        'val': 'equSort',
                        'list': [{
                            value: '1',
                            label: '设备类型一'
                        }, {
                            value: '2',
                            label: '测试类型二'
                        }]
                    }, {
                        'status': 3,
                        'title': '时间',
                        'placeholderS': '选择开始日期',
                        'placeholderE': '选择结束日期',
                        'val1': 'startTime',
                        'val2': 'endTime'
                    }],
                    popSave() { }
                },
                otherInfo: {
                    isCheck: true, //是否显示多选框
                    style: 2 // 列表共有三种样式，1 搜索模块的样式, 2报警信息列表的样式，3其它,4站点列表,5屏蔽门的列表
                },
                info1: [{
                    'label': '序号',
                    'width': 10,
                    'value': 'num'
                }, {
                    'label': '设备名称',
                    'width': 15,
                    'value': 'equName'
                }, {
                    'label': '时间',
                    'width': 13,
                    'value': 'time'
                }, {
                    'label': '车站',
                    'width': 13,
                    'value': 'station'
                }, {
                    'label': '报警事件',
                    'width': 15,
                    'value': 'alarmEvent'
                }, {
                    'label': '状态',
                    'width': 15,
                    'value': 'status'
                }, {
                    'label': '操作',
                    'width': 15,
                    'value': 'operationInfo'
                }],
                equList: {
                    total: 9,
                    data: [{
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        station: '车站',
                        alarmEvent: '报警事件',
                        status: '状态',
                        operationInfo: '操作'
                    }]
                }
            };
        },
        props: ['list', 'label', 'checked'],
        methods: {
            currentList(index) {
                this.indexed = index;
            },
            //改变当前页数
            changePages(val) {
                this.currentPage = val;
                // this.list();
            },
            tabShowFn(index) {
                this.tabShow = index;
            }
        }
    };
</script>

<style scoped lang="less">
    .infoWrap {
        width: 98%;
        margin: 0.14rem auto;
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