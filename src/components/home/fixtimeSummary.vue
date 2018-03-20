<template>
    <div class="fixtime-summary flex" v-on:click="goInfoFn">
        <img class="light1" src="~assets/home/img_light_color.png" />
        <img class="light2" src="~assets/home/img_light_color2.png" />
        <div class="charts flex">
            <v-monthly-reliability v-bind:ringInfo="ringInfo"></v-monthly-reliability>
            <v-fixing-time id="dailyFixingTime" title="平均每日修复时间" :max="10" :current="2.3" bg="#e61e1f"></v-fixing-time>
            <v-fixing-time id="fixOuttime" title="报修超时率" :max="0.3" :current="0.2" bg="#79c72f"></v-fixing-time>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ringInfo: {
                    showInfo: {
                        title: '月可靠度',
                        color: '#0ed4eb',
                        fontSize: '0.24rem'
                    },
                    value: '99.3',
                    size: {
                        width: '3rem',
                        height: '3rem'
                    },
                    id: 'monthlyReliability'
                }
            };
        },
        methods: {
            goInfoFn() {
                this.$router.push('commonDetail');
            }
        }
    };
</script>
<style lang="less" scoped>
    .fixtime-summary {
        justify-content: space-around;
        z-index: 1;
        cursor: pointer;
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

