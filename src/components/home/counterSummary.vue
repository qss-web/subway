<template>
    <div class="counter-summary">
        <div class="tabs flex">
            <p class="tab" :class="{active: !activeIndex}" @click="activeIndex = 0">车站运行情况</p>
        </div>
        <div class="tables">
            <v-table-small v-show="!activeIndex" :title="['综合排名','线路','车站','状态']" :list="failureCount" :widths="[20,30,30,20]"></v-table-small>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                failureCount: [{
                    sequence: 1,
                    name: '6号线',
                    str: '金安桥站',
                    state: '优'
                },
                {
                    sequence: 2,
                    name: '6号线',
                    str: '苹果园站',
                    state: '良'
                },
                {
                    sequence: 3,
                    name: '6号线',
                    str: '西黄村站',
                    state: '良'
                }]
            };
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
                background-color: #7b8399;
                color: #fff;
                height: 0.28rem;
                border-radius: 0.1rem 0.1rem 0 0;
                padding: 0 0.1rem;
                margin: 0 0.02rem;
                line-height: 0.28rem;
                &.active {
                    background-color: #525667;
                }
            }
        }
        .tables {
            width: 100%;
            height: 3.4rem;
        }
    }
</style>


