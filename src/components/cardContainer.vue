<template>
    <div class="card-container" :class="{light: light}">
        <div class="card-header">
            <button class="title" v-on:click="goAlarmFn(goKey)">{{title}}</button>
        </div>
        <div class="card-content">
            <div class="relative">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    // goKey    timely实时报警信息  alarm今日报警统计  failure故障原因分析   patrol今日巡检比例
    //qualification 技术指标    alarmEvent 报警事件      alarmReason 报警原因   unfinished 待办事项
    export default {
        props: ['title', 'goKey', 'light'],
        methods: {
            goAlarmFn(key) {
                if(key == 'timely') {
                    this.$router.push('alarmList');
                } else if(key == 'failure') {
                    this.$router.push('faultAnalysisList');
                } else if(key == 'alarm') {
                    this.$router.push('alarmStatistics');
                } else if(key == 'patrol') {
                    this.$router.push('inspect');
                } else if(key == 'qualification') {
                    this.$router.push('technicalIndex');
                } else if(key == 'alarmEvent') {
                    this.$router.push('alarmEvent');
                } else if(key == 'alarmReason') {
                    this.$router.push('alarmCauseList');
                } else if(key == 'unfinished') {
                    this.$router.push('backlog');
                }
            }
        }
    };
</script>


<style lang="less" scoped>
    .card-container {
        border-radius: 4px;
        position: absolute;
        overflow: hidden;
        color: #303133;
        background: url('~assets/card/bg_card.png') no-repeat;
        background-size: 100% 100%;
        .card-header {
            font-size: 0.2rem;
            color: #fff;
            height: 0.3rem;
            position: absolute;
            width: 100%;
            .title {
                color: #000;
                height: 0.3rem;
                font-weight: bold;
                border-radius: 0.08rem;
                padding: 0 0.2rem;
                background: url('~assets/card/bg_title.png') no-repeat;
                background-size: 100% 100%;
                margin-left: 0.05rem;
            }
        }
        .card-content {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) inset;
            height: 100%;
            padding-top: 0.3rem;
            & > div {
                border-radius: 0.05rem;
                overflow: hidden;
                border-top: 1px solid #383737;
                height: 100%;
                width: 100%;
            }
        }
        &.light {
            background: url('~assets/card/bg_card_light.png') no-repeat;
            background-size: 100% 100%;
            box-shadow: 0 0.1rem 0.5rem 0.01rem rgba(0, 0, 0, 0.4);
            .card-header {
                height: 0.4rem;
                .title {
                    background: url('~assets/card/bg_title_light.png') no-repeat;
                    background-size: 100% 100%;
                    margin-top: 0.05rem;
                    margin-left: 0.2rem;
                }
            }
            .card-content {
                padding-top: 0.4rem;
                & > div {
                    border-top: none;
                }
            }
        }
    }
</style>
