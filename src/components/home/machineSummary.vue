<template>
    <div class="machine-summary">
        <div class="line1">
            <div class="title flex">
                <span class="text">当月设备运行时间</span>
                <span class="line"></span>
            </div>
            <div class="chart flex currentChart">
                <div v-on:click="goRunList(7)">
                    <v-running-time v-if="escalator.max" id="running1" title="自动扶梯" :max="escalator.max" :current="escalator.current"></v-running-time>
                    <span class="noneDate" v-if="!escalator.max">0<i>自动扶梯</i></span>
                </div>
                <div v-on:click="goRunList(8)">
                    <v-running-time v-if="fan.max" id="running2" title="风机" :max="fan.max" :current="fan.current"></v-running-time>
                    <span class="noneDate" v-if="!fan.max">0<i>风机</i></span>
                </div>
                <div v-on:click="goRunList(0)">
                    <v-running-time v-if="door.max" id="running3" title="站台门" :max="door.max" :current="door.current"></v-running-time>
                    <span class="noneDate" v-if="!door.max">0<i>站台门</i></span>
                </div>
            </div>
        </div>
        <div class="line2">
            <div class="title flex">
                <span class="text">今日故障待办事项</span>
                <span class="line"></span>
            </div>
            <div class="chart flex">
                <div v-on:click="goBacklog(7)">
                    <v-failure-count title="自动扶梯" :count="failure.escalator"></v-failure-count>
                </div>
                <div v-on:click="goBacklog(8)">
                    <v-failure-count title="风机" :count="failure.fan"></v-failure-count>
                </div>
                <div v-on:click="goBacklog(0)">
                    <v-failure-count title="站台门" :count="failure.door"></v-failure-count>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return {
                failure: {
                    // 'escalator': '5', //扶梯
                    // 'fan': '3', //风机
                    // 'door': '5' //站台门
                },
                escalator: {}, //扶梯
                fan: {}, //风机
                door: {}, //站台门
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
            //当月设备运行时间
            this.getMonthRunningTimeFn();
            //今日故障待办事项
            this.getBacklogCountFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            ...mapMutations(['_itemObj']),
            goRunList(key) {
                // this.$router.push('equRunTimeList');
                this.$router.push({ path: 'equRunTimeList', query: { 'equKey': key } });
            },
            goBacklog(key) {
                this._itemObj('');
                this.$router.push({ path: 'backlog', query: { 'equKey': key } });
            },
            //今日故障待办事项
            getBacklogCountFn() {
                this._getInfo({
                    ops: {},
                    api: 'backlogCount',
                    callback: res => {
                        this.failure = res;
                        if(this.isTimeOut) {
                            this.timeOut = setTimeout(() => {
                                this.getBacklogCountFn();
                            }, 2000);
                        } else {
                            clearTimeout(this.timeOut);
                        }

                    }
                });
            },
            //当月设备运行时间
            getMonthRunningTimeFn() {
                this._getInfo({
                    ops: {},
                    api: 'monthRunningTime',
                    callback: res => {
                        let data = res;

                        this.escalator = data[0]; //扶梯
                        this.fan = data[1]; //风机
                        this.door = data[2];//站台门
                    }
                });
            }
        }
    };

</script>
<style lang="less" scoped>
    .title {
        color: #fff;
        font-size: 0.22rem;
        text-align: center;
        padding: 0 0.2rem;
        padding-top: 0.1rem;
        justify-content: center;

        .text {
            background-color: #1f2129;
            position: relative;
            z-index: 1;
            padding: 0 0.02rem;
        }
        .line {
            position: absolute;
            z-index: inherit;
            height: 1px;
            background-color: #fff;
            display: block;
            padding: 0 0.2rem;
            left: 0.2rem;
            right: 0.2rem;
            &:before {
                content: '';
                position: absolute;
                height: 1px;
                background-color: #fff;
                width: 0.2rem;
                left: -0.2rem;
                transform: translateY(50%) rotate(-45deg);
                transform-origin: right top;
            }
            &:after {
                content: '';
                position: absolute;
                height: 1px;
                background-color: #fff;
                width: 0.2rem;
                right: -0.2rem;
                transform: translateY(50%) rotate(45deg);
                transform-origin: left top;
            }
        }
    }
    .chart {
        padding: 0 0.2rem;
        justify-content: space-around;
        cursor: pointer;
    }
    .line1 {
        .chart {
            min-height: 1.22rem;
        }
    }
    .line2 {
        padding-top: 0.2rem;
    }

    span.noneDate {
        color: #fff;
        width: 1.1rem;
        text-align: center;
        line-height: 1.1rem;
        display: block;
        height: 1.1rem;
        position: relative;
        font-size: 0.24rem;
        i {
            height: 0.24rem;
            line-height: 0.24rem;
            font-style: normal;
            font-size: 0.18rem;
            position: absolute;
            bottom: -0.12rem;
            left: 0;
            right: 0;
        }
    }
</style>

