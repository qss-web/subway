<template>
    <div class="subway-line">
        <div class="alarm-info">
            <div class="line1 flex">
                <img src="~assets/home/icon_line6.png" />
                <div class="infos flex">
                    <label>车站预警</label>
                    <span class="light bg-error"></span>
                    <span class="name">二级预警 {{total[0]}}座</span>
                    <span class="light bg-warn"></span>
                    <span class="name">一级预警 {{total[1]}}座</span>
                    <span class="light bg-normal"></span>
                    <span class="name">正常 {{total[2]}}座</span>
                    <span class="light bg-offline"></span>
                    <span class="name">断网 {{total[3]}}座</span>
                    <span class="light bg-stop"></span>
                    <span class="name">停机 {{total[4]}}座</span>
                </div>
            </div>
            <div class="line2 flex">
                <div class="infos flex">
                    <img src="~assets/home/icon_escalator.png" />
                    <span>二级预警 <span class="error">{{escalator[0]}}</span> 部</span>
                    <span>一级预警 <span class="warn">{{escalator[1]}}</span> 部</span>
                    <span>正常 <span class="normal">{{escalator[2]}}</span> 部</span>
                    <span>断网 <span class="offline">{{escalator[3]}}</span> 部</span>
                    <span>停机 <span class="stop">{{escalator[4]}}</span> 部</span>
                </div>
                <div class="infos flex">
                    <img src="~assets/home/icon_fan.png" />
                    <span>二级预警 <span class="error">{{fan[0]}}</span> 台</span>
                    <span>一级预警 <span class="warn">{{fan[1]}}</span> 台</span>
                    <span>正常 <span class="normal">{{fan[2]}}</span> 台</span>
                    <span>断网 <span class="offline">{{fan[3]}}</span> 台</span>
                    <span>停机 <span class="stop">{{fan[4]}}</span> 台</span>
                </div>
                <div class="infos flex">
                    <img src="~assets/home/icon_door.png" />
                    <span>二级预警 <span class="error">{{door[0]}}</span> 组</span>
                    <span>一级预警 <span class="warn">{{door[1]}}</span> 组</span>
                    <span>正常 <span class="normal">{{door[2]}}</span> 组</span>
                    <span>断网 <span class="offline">{{door[3]}}</span> 组</span>
                    <span>停机 <span class="stop">{{door[4]}}</span> 组</span>
                </div>
            </div>
        </div>
        <div class="map">
            <v-flashing x="0.94" y="3.17" v-if="station.length!=0" :status="station[0]"></v-flashing>
            <v-flashing x="1.83" y="2.86" v-if="station.length!=0" :status="station[1]"></v-flashing>
            <v-flashing x="3.16" y="2.39" v-if="station.length!=0" :status="station[2]"></v-flashing>
            <v-flashing x="4.73" y="2.47" v-if="station.length!=0" :status="station[3]"></v-flashing>
            <v-flashing x="6.71" y="2.78" v-if="station.length!=0" :status="station[4]"></v-flashing>
            <v-flashing x="8.58" y="2.51" v-if="station.length!=0" :status="station[5]"></v-flashing>
            <div class="button-group flex">
                <div class="button-wrapper">
                    <button class="btn" v-on:click="goStateFn">设备实时状态</button>
                </div>
                <div class="button-wrapper">
                    <button class="btn" v-on:click="goSiteFn">测点实时状态</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                total: [], //车站预警
                escalator: [],//扶梯预警
                fan: [],//风机预警
                door: [],//站台门预警
                station: [], //车站
                timeOut: ''
            };
        },
        computed: {
            ...mapState(['isTimeOut'])
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getStationAlarmStatisticalFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            //设备实时状态
            goStateFn() {
                this.$router.push('equStateList');
            },
            //测点实时状态
            goSiteFn() {
                this.$router.push('siteList');
            },
            getStationAlarmStatisticalFn() {
                this._getInfo({
                    ops: {},
                    api: 'stationAlarmStatistical',
                    callback: res => {
                        const data = res;

                        this.total = data.total; //车站预警
                        this.escalator = data.escalator;//扶梯预警
                        this.fan = data.fan;//风机预警
                        this.door = data.door;//站台门预警
                        this.station = data.station; //车站
                        if(this.isTimeOut) {
                            this.timeOut = setTimeout(() => {
                                this.getStationAlarmStatisticalFn();
                            }, 2000);
                        } else {
                            clearTimeout(this.timeOut);
                        }

                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .subway-line {
        // padding: 0 0.2rem;
        .alarm-info {
            .line1 {
                height: 0.7rem;
                img {
                    margin: 0 0.4rem;
                    width: 1.37rem;
                    height: 0.47rem;
                }
                .light {
                    width: 0.12rem;
                    height: 0.12rem;
                    // background-color: #cc0000;
                    border-radius: 50%;
                    box-shadow: 0 0 10px 4px #fff;
                    margin-right: 0.1rem;
                    margin-left: 0.3rem;
                }
                .infos {
                    border-radius: 0.5rem;
                    background-color: #000;
                    color: #fff;
                    height: 0.4rem;
                    padding: 0 0.2rem;
                    font-size: 0.16rem;
                }
            }
            .line2 {
                padding-right: 0.05rem;
                .infos {
                    border-radius: 0.5rem;
                    background-color: #000;
                    color: #fff;
                    height: 0.36rem;
                    padding: 0 0.08rem;
                    font-size: 0.12rem;
                    flex: auto;
                    margin-left: 0.05rem;
                    img {
                        margin-right: 0.05rem;
                        width: 0.16rem;
                        height: 0.16rem;
                    }
                }
            }
        }
        .map {
            background: url('~assets/home/bg_subway_line.png') no-repeat;
            background-size: 100%;
            position: absolute;
            width: 9.4rem;
            height: 4.82rem;
            left: 50%;
            margin-left: -4.7rem;
            bottom: 0;
            .button-group {
                position: absolute;
                bottom: 0.5rem;
                right: 0rem;
                .button-wrapper {
                    background: url('~assets/home/bg_btn.png') no-repeat;
                    background-size: 100%;
                    height: 0.62rem;
                    width: 2.44rem;
                    &:first-child {
                        margin-right: 0.5rem;
                    }
                    .btn {
                        height: 0.46rem;
                        background: transparent;
                        color: #fff;
                        font-size: 0.22rem;
                        width: 100%;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
