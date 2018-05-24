<template>
    <div class="home">
        <v-card-container class="timely-alarm" goKey="timely" v-bind:title="warningTotal">
            <v-timely-alarm :data=" timelyAlarm "></v-timely-alarm>
        </v-card-container>
        <v-card-container class="today-alarm" goKey="alarm" title="今日预警统计">
            <v-today-alarm></v-today-alarm>
        </v-card-container>
        <v-card-container class="failure-analysis" goKey="failure" title="故障频次分析">
            <v-failure-analysis></v-failure-analysis>
        </v-card-container>
        <v-card-container class="today-patrol" goKey="patrol" title="今日巡检比例">
            <v-today-patrol></v-today-patrol>
        </v-card-container>
        <v-subway-line class="subway-line"></v-subway-line>
        <div class="panel ">
            <v-machine-summary class="machine-summary"></v-machine-summary>
            <v-fixtime-summary class="fixtime-summary"></v-fixtime-summary>
            <v-counter-summary class="counter-summary"></v-counter-summary>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1, //当前页数
                pageSize: 4, //每页显示数量
                timelyAlarm: [],
                warningTotal: '实时预警信息（0次）', //实时预警信息总数
                timeOut: ''
            };
        },
        created() {
            if(this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.getTimelyAlarmTopFn();
        },
        destroyed() {
            clearTimeout(this.timeOut);
        },
        methods: {
            ...mapActions(['_getInfo']),
            getTimelyAlarmTopFn() {
                const ops = {
                    'curPage': this.currentPage,
                    'pageSize': this.pageSize
                };

                this._getInfo({
                    ops: ops,
                    api: 'timelyAlarmTop',
                    callback: res => {
                        this.timelyAlarm = res.list;
                        this.warningTotal = "实时预警信息（" + res.records + "次）";
                        this.timeOut = setTimeout(() => {
                            this.getTimelyAlarmTopFn();
                        }, 2000);
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .home {
        background-color: #7c8298;
        .timely-alarm {
            left: 0.05rem;
            top: 0.1rem;
            width: 4.3rem;
            height: 3rem;
        }
        .today-alarm {
            left: 0.05rem;
            top: 3.1rem;
            width: 4.3rem;
            height: 3rem;
        }
        .failure-analysis {
            right: 0.05rem;
            top: 0.1rem;
            width: 4.3rem;
            height: 3rem;
        }
        .today-patrol {
            right: 0.05rem;
            top: 3.1rem;
            width: 4.3rem;
            height: 3rem;
        }
        .subway-line {
            position: absolute;
            top: 0.1rem;
            left: 4.35rem;
            right: 4.35rem;
            height: 5.55rem;
        }
        .panel {
            position: absolute;
            bottom: 0;
            height: 3.73rem;
            width: 100%;
            background-color: #1f2129;
            .machine-summary {
                width: 3.83rem;
                height: 3.73rem;
                position: absolute;
                left: 0.2rem;
                bottom: 0;
            }
            .fixtime-summary {
                left: 4.35rem;
                right: 4.35rem;
                height: 3.93rem;
                position: absolute;
                bottom: 0;
            }
            .counter-summary {
                width: 4.3rem;
                height: 3.73rem;
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
    }
</style>


