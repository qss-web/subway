<template>
    <div class="machine-summary">
        <div class="line1">
            <div class="title flex">
                <span class="text">当月设备运行时间</span>
                <span class="line"></span>
            </div>
            <div class="chart flex" v-on:click="goRunList">
                <v-running-time v-if="escalator.max" id="running1" title="自动扶梯" :max="escalator.max" :current="escalator.current"></v-running-time>
                <v-running-time v-if="fan.max" id="running2" title="风机" :max="fan.max" :current="fan.current"></v-running-time>
                <v-running-time v-if="door.max" id="running3" title="站台门" :max="door.max" :current="door.current"></v-running-time>
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
    import { mapActions } from 'vuex';
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
                door: {} //站台门
            };
        },
        created() {
            //当月设备运行时间
            this.getMonthRunningTimeFn();
            //今日故障待办事项
            this.getBacklogCountFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            goRunList() {
                this.$router.push('equRunTimeList');
            },
            goBacklog(key) {
                this.$router.push({ path: 'backlog', query: { 'equKey': key } });
            },
            //今日故障待办事项
            getBacklogCountFn() {
                this._getInfo({
                    ops: {},
                    api: 'backlogCount',
                    callback: res => {
                        this.failure = res;
                        setTimeout(() => {
                            this.getBacklogCountFn();
                        }, 2000);
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

    .line2 {
        padding-top: 0.2rem;
    }
</style>

