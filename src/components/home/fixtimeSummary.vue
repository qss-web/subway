<template>
    <div class="fixtime-summary flex">
        <img class="light1" src="~assets/home/img_light_color.png" />
        <img class="light2" src="~assets/home/img_light_color2.png" />
        <div class="charts flex">
            <v-monthly-reliability v-if="ringInfo.value" v-bind:ringInfo="ringInfo"></v-monthly-reliability>
            <!-- <v-health-indicators v-if="max1" id="dailyFixingTime" title="平均每日修复时间" :percent="current1"></v-health-indicators> -->
            <v-fixing-time id="dailyFixingTime" v-if="max1" title="平均每日修复时间" :max="max1" :current="current1" :bg="bg1" :curBg="curBg1" :str="str1"></v-fixing-time>
            <v-fixing-time id="fixOuttime" v-if="max2" title="报修超时率" :max="max2" :current="current2" :bg="bg2" :curBg="curBg2" :str="str2"></v-fixing-time>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                max1: 0,
                max2: 0,
                current1: 0,
                current2: 0,
                bg1: '#eeeeee',
                bg2: '#79c72f',
                curBg1: '#32f4fb',
                curBg2: '#32f4fb',
                str1: '',
                str2: '',
                totalData: {},
                ringInfo: {
                    showInfo: {
                        title: '月可靠度',
                        color: '#567db4',
                        fontSize: '18px'
                    },
                    value: '',
                    size: {
                        width: '3rem',
                        height: '3rem'
                    },
                    id: 'monthlyReliability'
                }
            };
        },
        created() {
            this.getRunCountFn();
        },
        methods: {
            ...mapActions(['_getInfo']),
            getRunCountFn() {
                this._getInfo({
                    ops: {},
                    api: 'runCount',
                    callback: res => {
                        this.totalData = res;
                        // 月可靠度
                        if(this.totalData.monthlyOnReliability == 100) {
                            this.totalData.monthlyOnReliability = parseInt(this.totalData.monthlyOnReliability);
                        } else {
                            this.totalData.monthlyOnReliability = parseFloat(this.totalData.monthlyOnReliability);
                        }
                        this.ringInfo.value = this.totalData.monthlyOnReliability;
                        if(this.totalData.monthlyOnReliability < 99.93) {
                            this.ringInfo.showInfo.color = "#d22323";
                        }
                        //平均每日修复时间
                        this.max1 = res.averageDailyRepairTime.max;
                        this.current1 = res.averageDailyRepairTime.current;
                        if(this.current1 > this.max1) {
                            this.current1 = res.averageDailyRepairTime.max;
                            this.max1 = res.averageDailyRepairTime.current;
                            this.bg1 = '#d22323';
                            this.curBg1 = "#f45b5b";
                            this.str1 = '<b>平均每日修复时间</b><br/>临界值为：<b>' + this.current1 + '</b><br/>当前值为：<b>' + this.max1 + '</b> 超过临界值！';
                        } else {
                            this.str1 = '<b>平均每日修复时间</b><br/>临界值为：<b>' + this.max1 + '</b><br/>当前值为:<b>' + this.current1 + '</b>';
                        }
                        //报修超时率
                        this.max2 = res.repairTimeoutRate.max;
                        this.current2 = res.repairTimeoutRate.current;
                        if(this.current2 > this.max2) {
                            this.current2 = res.repairTimeoutRate.max;
                            this.max2 = res.repairTimeoutRate.current;
                            this.bg2 = '#d22323';
                            this.curBg2 = "#f45b5b";
                            this.str2 = '<b>平均每日修复时间</b><br/>临界值为：<b>' + this.current2 + '</b><br/>当前值为：<b>' + this.max2 + '</b> 超过临界值！';
                        } else {
                            this.str2 = '<b>平均每日修复时间</b><br/>临界值为：<b>' + this.max2 + '</b><br/>当前值为:<b>' + this.current2 + '</b>';
                        }
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .fixtime-summary {
        justify-content: space-around;
        z-index: 1;
        .light1 {
            position: absolute;
            top: -0.3rem;
            left: 0;
            z-index: 1;
            width: 100%;
        }
        .light2 {
            position: absolute;
            top: -0.5rem;
            left: 0;
            z-index: 1;
            width: 100%;
        }
        .charts {
            height: 100%;
            border-radius: 0.3rem 0.3rem 0 0;
            background-color: #1f2129;
            z-index: 2;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            justify-content: space-around;
            padding-bottom: 0.3rem;
            padding-right: 0.2rem;
        }
    }
</style>

