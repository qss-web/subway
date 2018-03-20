<template>
    <div>
        <div>
            <div class="device-3d">
                <v-tag name="triangle" status="error" x="2.1" y="2.6" @onclick="goToDevice(2)">1#屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="2.8" y="4" @onclick="goToDevice(2)">1#屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="2.9" y="4.82" @onclick="goToDevice(2)">2#屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="8.42" y="2.3" @onclick="goToDevice(2)">3#屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="3.63" y="2.11" @onclick="goToDevice(2)">A2屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="3.6" y="3.0" @onclick="goToDevice(2)">A3屏蔽门</v-tag>
                <v-tag name="triangle" status="error" x="5.5" y="3.2" @onclick="goToDevice(2)">4#屏蔽门</v-tag>
                <v-tag name="triangle" status="normal" x="3.43" y="2.68" @onclick="goToDevice(3)">A2扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="6.1" y="2.53" @onclick="goToDevice(3)">B1扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="5.33" y="2.36" @onclick="goToDevice(3)">B2扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="4.8" y="2.1" @onclick="goToDevice(3)">B3扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="2.2" y="3" @onclick="goToDevice(3)">B4扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="2.72" y="3.2" @onclick="goToDevice(3)">B5扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="7.3" y="1.5" @onclick="goToDevice(3)">C1扶梯</v-tag>
                <v-tag name="triangle" status="normal" x="8.2" y="1.7" @onclick="goToDevice(3)">C2扶梯</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日车站健康监测指标</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-monthly-reliability v-bind:ringInfo="ringInfo1"></v-monthly-reliability>
                        <v-monthly-reliability v-bind:ringInfo="ringInfo2"></v-monthly-reliability>
                        <v-monthly-reliability v-bind:ringInfo="ringInfo3"></v-monthly-reliability>
                        <!-- <v-health-indicators class="healthy-chart" id="health1" title="自动扶梯" :percent="68"></v-health-indicators> -->
                        <!-- <v-health-indicators class="healthy-chart" id="health2" title="风机" :percent="68"></v-health-indicators> -->
                        <!-- <v-health-indicators class="healthy-chart" id="health3" title="站台门" :percent="68"></v-health-indicators> -->
                    </div>
                    <div class="healthy-table">
                        <v-search-list :other="other" :label="label" :list="list"></v-search-list>
                    </div>
                </div>
            </div>
            <div class="fans flex">
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error" @click="goToDevice(1)">F01风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name warn" @click="goToDevice(1)">F02风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name normal" @click="goToDevice(1)">F03风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error" @click="goToDevice(1)">F04风机</button>
                </div>
            </div>
            <v-train :select="true" @click="alert(2)"></v-train>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ringInfo1: {
                    showInfo: {
                        title: '自动扶梯',
                        color: '#32b16c',
                        fontSize: '0.18rem'
                    },
                    value: '99.3',
                    size: {
                        width: '1.8rem',
                        height: '1.8rem'
                    },
                    id: 'health1'
                },
                ringInfo2: {
                    showInfo: {
                        title: '风机',
                        color: '#63869e',
                        fontSize: '0.18rem'
                    },
                    value: '99.8',
                    size: {
                        width: '1.8rem',
                        height: '1.8rem'
                    },
                    id: 'health2'
                },
                ringInfo3: {
                    showInfo: {
                        title: '站台门',
                        color: '#13b5b1',
                        fontSize: '0.18rem'
                    },
                    value: '99.5',
                    size: {
                        width: '1.8rem',
                        height: '1.8rem'
                    },
                    id: 'health3'
                },
                label: [{
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
                    'label': '事件描述',
                    'width': 18,
                    'value': 'eventDesc'
                }, {
                    'label': '当前状态',
                    'width': 10,
                    'value': 'statusValue',
                    'status': 'status'
                }, {
                    'label': '操作',
                    'width': 15,
                    'value': 'operate'
                }],
                list: [{
                    num: '序号',
                    equName: '设备名称',
                    time: '时间',
                    eventDesc: '报警事件',
                    status: '1',
                    operate: '操作',
                    statusValue: '状态'
                },
                {
                    num: '序号',
                    equName: '设备名称',
                    time: '时间',
                    eventDesc: '报警事件',
                    status: '2',
                    operate: '操作',
                    statusValue: '状态'
                }, {
                    num: '序号',
                    equName: '设备名称',
                    time: '时间',
                    eventDesc: '报警事件',
                    status: '1',
                    operate: '操作',
                    statusValue: '状态'
                }, {
                    num: '序号',
                    equName: '设备名称',
                    time: '时间',
                    eventDesc: '报警事件',
                    status: '2',
                    operate: '操作',
                    statusValue: '状态'
                }],
                other: {
                    style: 4,
                    isSubShowColor: true
                }
            };
        },
        methods: {
            goToDevice(deviceType) {
                if(deviceType == 1) {
                    this.$router.push('faninfo');
                } else if(deviceType == 2) {
                    this.$router.push('shielddoorinfo');
                } else {
                    this.$router.push('escalatorinfo');
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .device-3d {
        position: absolute;
        left: -0.1rem;
        top: 0.75rem;
        width: 10.88rem;
        height: 7.08rem;
        background: url('~assets/siteInfo/bg_station.png') no-repeat;
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
            border-radius: 0.2rem;
            background-color: #404455;
            position: absolute;
            left: 0.31rem;
            top: 0.6rem;
            .healthy-charts {
                height: 2.68rem;
                justify-content: space-around;
                padding: 0 0.3rem;
            }
            .healthy-table {
                background-color: #000;
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
                    background-color: #a7bb1e;
                }
                &.normal {
                    background-color: #13c613;
                }
            }
        }
    }
</style>