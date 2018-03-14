<template>
    <div>
        <div>
            <div class="button-group flex">
                <button class="btn-name">A-1</button>
                <button class="btn-name">上行</button>
                <button class="btn-alarm" @click="isShowPopup = true">报警</button>
            </div>
            <div class="alarm-reason">
                <div class="alarm-reason-title">报警原因</div>
                <ul class="alarm-reason-body">
                    <li>1、苹果园南路站 A出入口下段PGN-FT-A-1 扶手带断裂</li>
                    <li>2、廖公庄站B端风道LGZ-FT-D-4数据中断</li>
                </ul>
            </div>
            <div class="device-3d">
                <v-tag name="line" type="1" status="warn" x="1.8" y="1.4">右扶手带</v-tag>
                <v-tag name="line" type="1" status="normal" x="2" y="2.5">左扶手带</v-tag>
                <v-tag name="line" type="1" status="error" x="1" y="3.5">从驱动轮</v-tag>
                <v-tag name="line" type="3" status="warn" x="8.6" y="1.4">主驱动轮</v-tag>
                <v-tag name="line" type="2" status="normal" x="5.4" y="4.7">扶梯衍架</v-tag>
                <v-tag name="line" type="2" status="error" x="4.3" y="4.9">牵引键条</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日车站健康监测指标</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-health-indicators class="healthy-chart" id="health1" title="运行时间" :percent="68"></v-health-indicators>
                        <v-health-indicators class="healthy-chart" id="health2" title="健康指数" :percent="68"></v-health-indicators>
                        <v-health-indicators class="healthy-chart" id="health3" title="报警事件" :percent="68"></v-health-indicators>
                    </div>
                    <div class="healthy-table">
                        <div class="tabs flex">
                            <button class="tab" :class="{active: !activeIndex}" @click="activeIndex = 0">报警数据</button>
                            <button class="tab" :class="{active: activeIndex}" @click="activeIndex = 1">测点状态</button>
                        </div>
                        <div class="tables">
                            <v-search-list v-show="!activeIndex" :other="alarmTable.other" :label="alarmTable.label" :list="alarmTable.list"></v-search-list>
                            <v-search-list v-show="activeIndex" :other="testTable.other" :label="testTable.label" :list="testTable.list"></v-search-list>
                        </div>
                    </div>
                </div>
            </div>
            <v-train></v-train>
        </div>
        <v-goback></v-goback>
        <!-- <el-dialog title="收货地址" :visible.sync="isShowPopup">
            <v-alarm-popup></v-alarm-popup>
        </el-dialog> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowPopup: false,
                activeIndex: '',
                alarmTable: {
                    label: [{
                        'label': '序号',
                        'width': 20,
                        'value': 'num'
                    }, {
                        'label': '设备名称',
                        'width': 25,
                        'value': 'equName'
                    }, {
                        'label': '时间',
                        'width': 20,
                        'value': 'time'
                    }, {
                        'label': '事件描述',
                        'width': 20,
                        'value': 'eventDesc'
                    }, {
                        'label': '当前状态',
                        'width': 20,
                        'value': 'status'
                    }],
                    list: [{
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        eventDesc: '报警事件',
                        status: '状态'
                    },
                    {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        eventDesc: '报警事件',
                        status: '状态'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        eventDesc: '报警事件',
                        status: '状态'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        time: '时间',
                        eventDesc: '报警事件',
                        status: '状态'
                    }],
                    other: {
                        style: 5
                    }
                },
                testTable: {
                    label: [{
                        'label': '序号',
                        'width': 9,
                        'value': 'num'
                    }, {
                        'label': '设备名称',
                        'width': 9,
                        'value': 'equName'
                    }, {
                        'label': '测点名称',
                        'width': 9,
                        'value': 'testName'
                    }, {
                        'label': '当前值',
                        'width': 9,
                        'value': 'currentValue'
                    }, {
                        'label': '高限',
                        'width': 9,
                        'value': 'highLimit'
                    }, {
                        'label': '高高限',
                        'width': 9,
                        'value': 'highestLimit'
                    }, {
                        'label': '下限',
                        'width': 9,
                        'value': 'lowLimit'
                    }, {
                        'label': '下下限',
                        'width': 9,
                        'value': 'lowestLimit'
                    }, {
                        'label': '报警方式',
                        'width': 9,
                        'value': 'alarmWay'
                    }, {
                        'label': '报警类型',
                        'width': 9,
                        'value': 'alarmType'
                    }, {
                        'label': '更新时间',
                        'width': 10,
                        'value': 'updateTime'
                    }],
                    list: [{
                        num: '序号',
                        equName: '设备名称',
                        testName: '测点名称',
                        currentValue: '当前值',
                        highLimit: '高限',
                        highestLimit: '高高限',
                        lowLimit: '下限',
                        lowestLimit: '下下限',
                        alarmWay: '报警方式',
                        alarmType: '报警类型',
                        updateTime: '更新时间'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        testName: '测点名称',
                        currentValue: '当前值',
                        highLimit: '高限',
                        highestLimit: '高高限',
                        lowLimit: '下限',
                        lowestLimit: '下下限',
                        alarmWay: '报警方式',
                        alarmType: '报警类型',
                        updateTime: '更新时间'
                    }, {
                        num: '序号',
                        equName: '设备名称',
                        testName: '测点名称',
                        currentValue: '当前值',
                        highLimit: '高限',
                        highestLimit: '高高限',
                        lowLimit: '下限',
                        lowestLimit: '下下限',
                        alarmWay: '报警方式',
                        alarmType: '报警类型',
                        updateTime: '更新时间'
                    }],
                    other: {
                        style: 5
                    }
                }
            };
        },
        methods: {
            gotoFan() {
                this.$router.push('faninfo');
            }
        }
    };
</script>

<style lang="less" scoped>
    .button-group {
        position: absolute;
        left: 0.6rem;
        top: 0.6rem;
        .btn-name {
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.3rem;
            background-color: #373f5b;
            padding: 0.08rem 0.4rem;
            margin-left: 0.2rem;
        }
        .btn-alarm {
            margin-left: 0.2rem;
            color: #fff;
            border-radius: 0.12rem;
            font-size: 0.24rem;
            background-color: #fa0000;
            padding: 0.08rem 0.2rem;
            box-shadow: 0 1px 0.1rem 0.01rem #fff;
        }
    }

    .alarm-reason {
        width: 4.68rem;
        background-color: #6d7389;
        color: #fff;
        font-size: 0.16rem;
        position: absolute;
        left: 5.2rem;
        top: 0.26rem;
        &-title {
            background-color: #64697f;
            height: 0.35rem;
            line-height: 0.35rem;
            padding: 0 0.14rem;
        }
        &-body {
            height: 1.32rem;
            overflow: auto;
            padding: 0.14rem;
            li {
                padding: 0.02rem 0;
            }
        }
    }

    .device-3d {
        position: absolute;
        left: 0.4rem;
        bottom: 0.05rem;
        width: 10.88rem;
        height: 7.08rem;
        background: url('~assets/siteInfo/bg_escalator.png') no-repeat;
        background-size: 100% 100%;
    }

    .device-healthy {
        position: absolute;
        top: 0.26rem;
        right: 0.26rem;
        width: 8.9rem;
        height: 8.95rem;
        background: url('~assets/siteInfo/bg_healthy.png') no-repeat;
        background-size: 100% 100%;
        &-title {
            background: url('~assets/siteInfo/bg_title.png') no-repeat;
            background-size: 100%;
            width: 2.7rem;
            height: 0.44rem;
            color: #cfd6f0;
            font-size: 0.22rem;
            position: absolute;
            left: 0.34rem;
            top: 0.12rem;
            padding-bottom: 0.04rem;
        }
        &-body {
            width: 8.24rem;
            height: 7.9rem;
            position: absolute;
            left: 0.31rem;
            top: 0.6rem;
            .healthy-charts {
                height: 2.68rem;
                justify-content: space-around;
                padding: 0 0.3rem;
            }
            .healthy-table {
                width: 100%;
                height: 5.26rem;
                flex-direction: column;
                .tabs {
                    height: 0.4rem;
                    width: 100%;
                    align-items: flex-end;
                    padding-left: 0.2rem;
                    .tab {
                        background-color: #7b8398;
                        color: #fff;
                        height: 0.4rem;
                        border-radius: 0.1rem 0.1rem 0 0;
                        padding: 0 0.1rem;
                        margin: 0 0.04rem;
                        line-height: 0.4rem;
                        width: 2rem;
                        text-align: center;
                        font-size: 0.16rem;
                        &.active {
                            background-color: #414455;
                        }
                    }
                }
                .tables {
                    width: 100%;
                    height: 4.86rem;
                    background-color: #414455;
                    border-radius: 0.2rem;
                    box-shadow: 0px 2px 4px 2px #333;
                }
            }
        }
    }

    .fans {
        position: absolute;
        flex-wrap: wrap;
        width: 6rem;
        height: 2rem;
        bottom: 1.6rem;
        left: 4.8rem;
        .fan {
            padding: 0 0.4rem;
            &-icon {
                width: 0.52rem;
                height: 0.52rem;
                margin-right: 0.2rem;
            }
            &-name {
                color: #fff;
                font-size: 0.16rem;
                box-shadow: 0 0 0.1rem 0.01rem #000;
                width: 0.94rem;
                height: 0.45rem;
                &.error {
                    background-color: #ff0000;
                }
                &.warn {
                    background-color: #deff00;
                }
                &.normal {
                    background-color: #36ff00;
                }
            }
        }
    }
</style>