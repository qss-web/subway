<template>
    <div class="counter-summary">
        <div class="tabs flex">
            <p class="tab" v-on:click="goListFn">车站运行情况</p>
        </div>
        <div class="tables">
            <v-table-small :title="['综合排名','线路','车站','状态']" :list="failureCount" :widths="[20,30,30,20]"></v-table-small>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                failureCount: [{
                    sequence: 1,
                    name: '6号线',
                    station: '金安桥站',
                    state: '优'
                },
                {
                    sequence: 2,
                    name: '6号线',
                    station: '苹果园站',
                    state: '良'
                },
                {
                    sequence: 3,
                    name: '6号线',
                    station: '苹果园南路站',
                    state: '良'
                }, {
                    sequence: 4,
                    name: '6号线',
                    station: '西黄村站',
                    state: '优'
                },
                {
                    sequence: 5,
                    name: '6号线',
                    station: '廖公庄站',
                    state: '良'
                },
                {
                    sequence: 6,
                    name: '6号线',
                    station: '田村站',
                    state: '良'
                }]
            };
        },
        methods: {
            goListFn() {
                this.$router.push('/stationStaffList');
            }
        }
    };
</script>

<style lang="less" scoped>
    .counter-summary {
        width: 4.3rem;
        height: 100%;
        flex-direction: column;
        .tabs {
            height: 0.3rem;
            width: 100%;
            align-items: flex-end;
            padding-left: 0.2rem;
            .tab {
                background-color: #525667;
                color: #fff;
                height: 0.28rem;
                border-radius: 0.1rem 0.1rem 0 0;
                padding: 0 0.1rem;
                margin: 0 0.02rem;
                line-height: 0.28rem;
                cursor: pointer;
            }
        }
        .tables {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>


