<template>
    <div>
        <div>
            <div class="device-3d">
                <v-tag type="error" x="2.1" y="2.6">1#屏蔽门</v-tag>
                <v-tag type="error" x="3" y="4">1#屏蔽门</v-tag>
                <v-tag type="error" x="2.9" y="4.82">2#屏蔽门</v-tag>
                <v-tag type="error" x="1" y="2">3#屏蔽门</v-tag>
                <v-tag type="error" x="1" y="2">A2屏蔽门</v-tag>
                <v-tag type="error" x="1" y="2">A3屏蔽门</v-tag>
                <v-tag type="error" x="1" y="2">4#屏蔽门</v-tag>
                <v-tag type="normal" x="1" y="2">A2扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">B1扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">B2扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">B3扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">B4扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">B5扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">C1扶梯</v-tag>
                <v-tag type="normal" x="1" y="2">C2扶梯</v-tag>
            </div>
            <div class="device-healthy">
                <button class="device-healthy-title">今日车站健康监测指标</button>
                <div class="device-healthy-body">
                    <div class="healthy-charts flex">
                        <v-health-indicators class="healthy-chart" id="health1" title="自动扶梯" :percent="68"></v-health-indicators>
                        <v-health-indicators class="healthy-chart" id="health2" title="风机" :percent="68"></v-health-indicators>
                        <v-health-indicators class="healthy-chart" id="health3" title="站台门" :percent="68"></v-health-indicators>
                    </div>
                    <div class="healthy-table">1122</div>
                </div>
            </div>
            <div class="fans flex">
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error" @click="gotoFan">F01风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name warn" @click="gotoFan">F02风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name normal" @click="gotoFan">F03风机</button>
                </div>
                <div class="fan flex">
                    <img class="fan-icon" src="~assets/siteInfo/icon_fan.png" />
                    <button class="fan-name error" @click="gotoFan">F04风机</button>
                </div>
            </div>
            <v-train :select="true"></v-train>
        </div>
        <v-goback></v-goback>
    </div>
</template>

<script>
    export default {
        methods: {
            gotoFan() {
                this.$router.push('faninfo');
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
                    background-color: #deff00;
                }
                &.normal {
                    background-color: #36ff00;
                }
            }
        }
    }
</style>